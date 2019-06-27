import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { AuthProvider } from '../providers/auth/auth';
import { DataProvider } from '../providers/data/data';
import { MultiLoginPage } from '../pages/multi-login/multi-login';
import { ProfilePage } from '../pages/profile/profile';
import { User } from '../models/user';
import { EVENTS } from '../utils/const';
import { ServicesPage } from '../pages/services/services';
import { ServiceDetailsPage } from '../pages/service-details/service-details';
import { PostServicePage } from '../pages/post-service/post-service';
import { UiPage } from '../pages/ui/ui';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = UiPage;

  pages: any;
  profile: User;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public authProvider: AuthProvider,
    public dataProvider: DataProvider,
    private ionEvents: Events,
  ) {
    this.initializeApp();

    this.pages = {
      servicesPage: ServicesPage,
      dashboardPage: DashboardPage,
      profilePage: ProfilePage
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.ionEvents.subscribe(EVENTS.loggedIn, (user) => {
        this.profile = user;
        console.log(user);
      });
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.profile = this.authProvider.getStoredUser();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  profilePicture(): string {
    return this.dataProvider.getProfilePicture(this.profile);
  }

  logout() {
    this.authProvider.logout().then(() => {
      this.nav.setRoot(MultiLoginPage);
    });
  }


}
