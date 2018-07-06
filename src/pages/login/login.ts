import { Component } from '@angular/core';
import { ToastController,ModalController,NavController} from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { BackButtonService } from "../../services/uiService/backButton.service";
import { AccountService} from "../../services/httpService/account.service"
import { HttpRequestService} from "../../services/httpService/httpRequest.service"
import { ChangeHostPage } from  "../changeHost/changeHost"
import {TabsPage} from "../tabs/tabs";

import { NativeStorage } from '@ionic-native/native-storage';

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
  host:string;

  constructor(public nativeStorage: NativeStorage,public navCtrl: NavController,public modalCtrl: ModalController,private backButtonService: BackButtonService,
              public platform: Platform, public toastCtrl: ToastController,private accountService:AccountService,private httpRequestService:HttpRequestService
  ) {
    platform.ready().then(() => {
      this.backButtonService.registerBackButtonAction(null);
    });
  }
  ionViewWillEnter(){
      this.host=this.httpRequestService.getCurrentHost();
  }

  ngOnInit() {

    // this.username=localStorage.getItem("username");
    // this.password=localStorage.getItem("password");
    let isSavePasssword;
    let currentHost;
     this.nativeStorage.getItem('username')
      .then(
        data => {
          this.username=data;
        },
        error => console.error(error)
      );
    this.nativeStorage.getItem('password')
      .then(
        data => this.password=data,
        error => console.error(error)
      );

      this.nativeStorage.getItem('isSavePasssword')
      .then(
        data => {
          isSavePasssword=data;
          if(isSavePasssword=='Y'){
            this.savePassword=true;
          }else{
            this.savePassword=false;
          }
        },
        error => {
          console.error(error);
          this.savePassword=true;
        }
      );

      this.nativeStorage.getItem('currentHost')
      .then(
        data => {
          currentHost=data;
          this.host=currentHost;
          if(this.host!=null){
            this.httpRequestService.setCurrentHost(this.host);
          }
        },
        error => {
          console.error(error);
          // localStorage.setItem("currentHost",this.host);
            // localStorage.setItem("hostItems",this.httpRequestService.getDefaultHostItems().toString());
           this.host=this.httpRequestService.getDefaultHost();
            this.nativeStorage.setItem('currentHost', this.host).then(
            () => console.log('Stored currentHost!'),
            error => console.error('Error storing item', error)
            );
            this.nativeStorage.setItem('hostItems', this.httpRequestService.getDefaultHostItems()).then(
            () => console.log('Stored hostItems!'),
            error => console.error('Error storing item', error)
            );
        }
      );

  }
  changeHost(){
    this.navCtrl.push(ChangeHostPage);
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
      let paramObj = {
        username: this.username,
        password:this.password
      };
      this.accountService.login(paramObj).subscribe(res => {
        let result:string=res.result;

        if(result=='success'){
          //localStorage.setItem("username",this.username);
           this.nativeStorage.setItem('username', this.username).then(
            () => console.log('Stored username!'),
            error => console.error('Error storing item', error)
            );
          if(this.savePassword){
             this.nativeStorage.setItem('password', this.password).then(
            () => console.log('Stored password!'),
            error => console.error('Error storing item', error)
            );
            this.nativeStorage.setItem('isSavePasssword', 'Y').then(
            () => console.log('Stored isSavePasssword!'),
            error => console.error('Error storing item', error)
            );
            //localStorage.setItem("password",this.password);
            //localStorage.setItem("isSavePasssword",'Y');
          }else{
             this.nativeStorage.setItem('password', '').then(
            () => console.log('Stored item!'),
            error => console.error('Error storing item', error)
            );
            this.nativeStorage.setItem('isSavePasssword', 'N').then(
            () => console.log('Stored item!'),
            error => console.error('Error storing item', error)
            );
            // localStorage.setItem("password","");
            // localStorage.setItem("isSavePasssword",'N');
          }
          this.weblibLoginStatus().subscribe(res=>{
            if(res.status=="login"){
              let modal = this.modalCtrl.create(TabsPage);
              modal.present();
            }else{
              this.initStoreType().subscribe(res=>{
              if(res.resule="success"){
                this.loginWeblib(res.weblibUsername,res.weblibPasswd);
              }
            },error=>{
              console.log("error: "+error);
            })
            }
          },error=>{
            console.log("error: "+error);
          });
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
        console.log("error: "+error);
      });
    }
  }
  loginWeblib(username,password){

    let weblibLoginParam = "account="+username+"&password="+password;
    this.accountService.loginWeblib(weblibLoginParam).subscribe(res=>{
      let result=res.members;
      if(result==null){
      }else{
        let weblibSelectMemParam = "memberId="+result[0].id;
        this.accountService.weblibSelectMember(weblibSelectMemParam).subscribe(res=>{

        },error => {
          console.log("error: "+error);
        })
      }
    },error =>{
      console.log("error: "+error);
    },()=>{
      let modal = this.modalCtrl.create(TabsPage);
      modal.present();
    });
  }
  weblibLoginStatus(){
    let paramObj = {
    };
    return this.accountService.weblibLoginStatus(paramObj);
  }
  initStoreType(){
    let paramObj = {
    };
    return this.accountService.initStoreType(paramObj);
  }
}
