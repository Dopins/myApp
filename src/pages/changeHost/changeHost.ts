import { Component } from '@angular/core';
import {HttpRequestService} from "../../services/httpService/httpRequest.service"
import { ToastController,NavController,AlertController} from 'ionic-angular';

import { NativeStorage } from '@ionic-native/native-storage';

/**
 * Generated class for the CreateLessionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-change-host',
  templateUrl: 'changeHost.html',
})
export class ChangeHostPage {
  hostItems;
  currentHost;
  Duesenberg;
  constructor(public nativeStorage: NativeStorage,public alertCtrl: AlertController,public navCtrl: NavController,public toastCtrl: ToastController,public httpRequestService: HttpRequestService) {
  	// this.hostItems=localStorage.getItem("hostItems").split(',');
   //  this.currentHost=localStorage.getItem("currentHost");

      this.nativeStorage.getItem('hostItems')
      .then(
        data => this.hostItems=data,
        error => console.error(error)
      );

      this.nativeStorage.getItem('currentHost')
      .then(
        data => this.currentHost=data,
        error => console.error(error)
      );
  }
  addHost(){
  let alert = this.alertCtrl.create({
    title: '新增服务器',
    inputs: [
      {
        name: 'host',
        placeholder: '服务器地址'
      }
      
    ],
    buttons: [
      {
        text: '取消',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: '确认',
        handler: data => {
          this.hostItems.push(data.host);
          //localStorage.setItem("hostItems",this.hostItems);
           this.nativeStorage.setItem('hostItems', this.hostItems).then(
          () => console.log('Stored item!'),
          error => console.error('Error storing item', error)
          );
        }
      }
    ]
  });
  alert.present();
  }
  saveHost(){
  	this.httpRequestService.setCurrentHost(this.currentHost);
  	//localStorage.setItem("currentHost",this.currentHost);
    this.nativeStorage.setItem('currentHost', this.currentHost).then(
    () => console.log('Stored item!'),
    error => console.error('Error storing item', error)
    );
  	this.toastCtrl.create({
        message: '设置成功',
        duration: 2000,
        position: 'bottom'
      }).present();
    this.navCtrl.pop();
  }
  removeHost(host){
    let alert = this.alertCtrl.create({
    title: '删除该服务器？',
    buttons: [
      {
        text: '取消',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: '确认',
        handler: () => {
          if(this.currentHost==host){
              this.toastCtrl.create({
                message: '不能删除选中服务器',
                duration: 2000,
                position: 'middle'
              }).present();
          }else{
            let index=this.hostItems.indexOf(host);
            this.hostItems.splice(index, 1);
            //localStorage.setItem("hostItems",this.hostItems);
             this.nativeStorage.setItem('hostItems', this.hostItems).then(
            () => console.log('Stored item!'),
            error => console.error('Error storing item', error)
            );
          }
        }
      }
    ]
  });
  alert.present();
  }
}
