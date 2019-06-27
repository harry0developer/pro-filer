import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, ActionSheetController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { FeedbackProvider } from '../../providers/feedback/feedback';
import { PlacesPage } from '../places/places';
import { itemSlideUp } from '../../utils/animations';
import { AuthProvider } from '../../providers/auth/auth';
import { COLLECTION } from '../../utils/const';
import { Service } from '../../models/service';

@IonicPage()
@Component({
  selector: 'page-post-service',
  templateUrl: 'post-service.html',
  animations: [itemSlideUp]

})
export class PostServicePage {
  data: Service = {
    uid: '',
    title: '',
    description: '',
    category: '',
    dateCreated: '',
    services: [],
    company: '',
    location: {
      address: '',
      geo: {
        lat: 0,
        lng: 0,
      }
    }
  };
  categories: any = [];
  skills: any;
  address;
  profile: any;

  cat: any;
  constructor(
    public navCtrl: NavController,
    private dataProvider: DataProvider,
    private authProvider: AuthProvider,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    private feedbackProvider: FeedbackProvider,
    private actionSheetCtrl: ActionSheetController
  ) { }

  ionViewDidLoad() {
    const action = this.navParams.get('action');
    this.profile = this.authProvider.getStoredUser();
    this.dataProvider.getServices().then(res => {
      this.categories = res;
    })

    // this.dataProvider.getJobServices().then(services => {
    //   console.log(services);
    // });
  }

  getSkills(all, cat) {
    const res = all.filter(c => c.name.toLowerCase() === cat.toLowerCase());
    return res[0].skills;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  selectedCategory(cat) {
    console.log(cat);

    // this.categories.forEach(cate => {
    //   if (cate.name == cat) {
    //     this.skills = cate.skills;
    //   }
    // });
  }


  postJob() {
    this.feedbackProvider.presentLoading("Please wait...");
    this.data.dateCreated = this.dataProvider.getDateTime(),
      this.data.uid = this.profile.uid;

    console.log(this.data);

    // this.dataProvider.addNewItem(COLLECTION.jobs, this.data).then(res => {
    //   console.log('Job added', res);
    // }).catch(err => {
    //   console.log('error', err);

    // })
  }


  showAddressModal() {
    let modal = this.modalCtrl.create(PlacesPage);
    modal.onDidDismiss(data => {
      if (data) {
        this.data.location.address = data.address;
        this.data.location.geo.lat = data.lat;
        this.data.location.geo.lng = data.lng;
      }
    });
    modal.present();
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Your changes will be discarded, are you sure you want to cancel?',
      buttons: [
        {
          text: 'Yes discard',
          role: 'destructive',
          handler: () => {
            this.dismiss();
          }
        },
        {
          text: "Don't discard",
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

}
