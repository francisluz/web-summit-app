import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

// Services
import { SpeakerService } from '../services/speaker.service';

@Component({
  templateUrl: 'app.html'
})
export class WebSummit {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, param?: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Conferences', component: HomePage },
      { title: 'Attendees', component: HomePage },
      { title: 'Speakers', component: ListPage, param: SpeakerService },
      { title: 'Statups', component: HomePage },
      { title: 'Investors', component: HomePage },
      { title: 'Hotels', component: HomePage },
      { title: 'Reviews', component: HomePage },
      { title: 'News', component: HomePage },
    ];

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
    this.nav.setRoot(page.component, {pageType: page.param} );
  }
}
