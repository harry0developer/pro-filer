import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController } from 'ionic-angular';
import { User } from '../../models/user';
import { DataProvider } from '../../providers/data/data';
import { AuthProvider } from '../../providers/auth/auth';
import { FeedbackProvider } from '../../providers/feedback/feedback';
import { COLLECTION } from '../../utils/const';
import { bounceIn } from '../../utils/animations';
import { ServiceDetailsPage } from '../service-details/service-details';
import { Service } from '../../models/service';

@IonicPage()
@Component({
  selector: 'page-services-list',
  templateUrl: 'services-list.html',
  animations: [bounceIn]
})
export class ServicesListPage {

  profile: User;
  services: Service[] = [];
  tag: '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    private dataProvider: DataProvider,
    private authProvider: AuthProvider,
    private feedbackProvider: FeedbackProvider,
    private viewCtrl: ViewController
  ) { }

  ionViewDidLoad() {
    this.tag = this.navParams.get('tag');
    this.services = this.navParams.get('services');
    console.log(this.services);

    // const allJobs = this.navParams.get('allJobs');
    // this.mappJobsWithUsers(jobsToBeMapped, allJobs);
  }


  mappJobsWithUsers(jobsToBeMapped: any[], allJobs: any[]) {
    this.feedbackProvider.presentLoading();
    let usersArray: any[] = [];
    this.dataProvider.getAllFromCollection(COLLECTION.jobs).subscribe(jobs => {
      jobsToBeMapped.map(mj => {
        jobs.map(job => {
          if (mj.jid === job.jid) {
            usersArray = this.dataProvider.getArrayFromObjectList(this.getUserFromJobs(job, allJobs)[0]);
            usersArray.shift(); // remove key eg. list = ["adadsasd", {}, {}, {}]
            this.services.push(Object.assign(job, { users: usersArray }));
          }
        })
      });
      this.feedbackProvider.dismissLoading();
    }, err => {
      this.feedbackProvider.dismissLoading();
    });
  }

  getUserFromJobs(job: any, allJobs: any[]) {
    return allJobs.filter(j => j.id === job.jid);
  }

  getDateFromNow(date: string): string {
    return this.dataProvider.getDateTimeMoment(date) || '';
  }


  openPostJobPage() {
    // this.navCtrl.push(PostJobPage)
  }

  sortArrayByDate(array: any[]): any[] {
    return array.sort((a, b) => {
      return a.date - b.date;
    });
  }

  viewJobDetails(service) {
    this.navCtrl.push(ServiceDetailsPage, { service, page: 'services' });
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }


}
