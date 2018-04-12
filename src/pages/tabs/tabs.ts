import { Component, ViewChild } from '@angular/core';
import {NavController, NavParams, Platform, Tabs} from 'ionic-angular';

import { CourseCenterPage } from '../course-center/course-center';
import { MinePage } from '../mine/mine';
import { HomePage } from '../home/home';
import { BackButtonService } from "../../services/uiService/backButton.service";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('myTabs') tabRef: Tabs;
  tabRoots: Object[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public backButtonService: BackButtonService,
              public platform: Platform) {

    this.tabRoots = [
      {
        root: HomePage,
        tabTitle: '公开课',
        tabIcon: 'home'
      },
      {
        root: CourseCenterPage,
        tabTitle: '课程中心',
        tabIcon: 'book'
      },
      {
        root: MinePage,
        tabTitle: '我的',
        tabIcon: 'person'
      }
    ];
    platform.ready().then(() => {
      this.backButtonService.registerBackButtonAction(this.tabRef);
    });
  }
  ionViewWillEnter() {
    this.tabRef.select(1);
  }
}
