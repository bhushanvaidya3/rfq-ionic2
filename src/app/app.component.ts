import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { RFQDashboardPage, RfqSearchPage } from "../pages/pages";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = RFQDashboardPage;

  pages: Array<{ title: string, component: any }>;

  app_title: string;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'RFQ Dashboard', component: RFQDashboardPage },
      { title: 'RFQ Search', component: RfqSearchPage }
    ];

    this.app_title = "SPSX RFQ";

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  goHome() {
    this.nav.popToRoot();
  }

  goToRFQ(rfq_type) {
    this.nav.push(RfqSearchPage, rfq_type);
  }
}
