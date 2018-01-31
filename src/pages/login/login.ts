import { Component } from '@angular/core';
import { ToastController,ModalController ,String} from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { BackButtonService } from "../../services/uiService/backButton.service";
import { AccountService} from "../../services/httpService/account.service"

import {TabsPage} from "../tabs/tabs";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  savePassword:boolean;
  username:string;
  password:string;

  constructor(public modalCtrl: ModalController,   private backButtonService: BackButtonService,
              public platform: Platform, public toastCtrl: ToastController,private accountService:AccountService,
              ) {
    platform.ready().then(() => {
      this.backButtonService.registerBackButtonAction(null);
    });
  }

  ngOnInit() {
      this.username=localStorage.getItem("username");
      this.password=localStorage.getItem("password");
      if(localStorage.getItem("isSavePasssword")==null){
        this.savePassword=true;
      }else{
        this.savePassword=localStorage.getItem("isSavePasssword");
      }
  }


  logIn() {
    if (this.username.length == 0) {
      this.toastCtrl.create({
        message: '请输入账号',
        duration: 1000,
        position: 'top'
      }).present();
    } else if (this.password.length == 0) {
      this.toastCtrl.create({
        message: '请输入密码',
        duration: 1000,
        position: 'top'
      }).present();
    } else {
      this.accountService.login(this.username,this.password).subscribe(res => {
        let result:string=res.result;

        if(result=='success'){
          localStorage.setItem("username",this.username);
          if(this.savePassword){
            localStorage.setItem("password",this.password);
            localStorage.setItem("isSavePasssword",true);
          }else{
            localStorage.setItem("password","");
            localStorage.setItem("isSavePasssword",false);
          }
          let modal = this.modalCtrl.create(TabsPage);
          modal.present();
        }else{
          this.toastCtrl.create({
            message: '账号或密码错误',
            duration: 2000,
            position: 'middle'
          }).present();
        }

      }, error => {
        this.toastCtrl.create({
          message: '网络请求出错',
          duration: 2000,
          position: 'bottom'
        }).present();
        console.log(error);
      });
    }
  }
}
