import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {LoginPage} from "../pages/login/login";
import {TabsPage} from "../pages/tabs/tabs";
import {AccountService} from "../services/httpService/account.service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = "";


  constructor(platform: Platform,statusBar: StatusBar, splashScreen: SplashScreen,public accountService:AccountService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.accountService.ifLogin().subscribe(res=>{
        if(res.result="success"){
          let paramObj = {
          };
          this.accountService.weblibLoginStatus(paramObj).subscribe(res=>{
            if(res.status=="login"){
                this.rootPage=TabsPage;
              }else{
                this.rootPage=LoginPage;
              }
          },error=>{
              this.rootPage=LoginPage;
          })
        }
      },error=>{
          this.rootPage=LoginPage;
      })
    });
  }
}
