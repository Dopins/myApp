import { Component, ViewChild } from '@angular/core';
import {NavController, NavParams, Platform, Tabs} from 'ionic-angular';

import { CourseCenterPage } from '../course-center/course-center';
import { MinePage } from '../mine/mine';
import { HomePage } from '../home/home';
import { BackButtonService } from "../../services/uiService/backButton.service";
import { AccountService} from "../../services/httpService/account.service"

import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('myTabs') tabRef: Tabs;
  tabRoots: Object[];
  timer;

  constructor(public nativeStorage: NativeStorage,private accountService:AccountService,public navCtrl: NavController, public navParams: NavParams,public backButtonService: BackButtonService,
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
      this.accountService.keepConnection();
      //localStorage.setItem("isLogin",'true');
      this.nativeStorage.setItem('isLogin', 'true').then(
      () => console.log('Stored item!'),
      error => console.error('Error storing item', error)
      );
    });
  }
  ionViewWillEnter() {
    this.tabRef.select(1);
    this.accountService.checkLoginStatus();
  }
}
