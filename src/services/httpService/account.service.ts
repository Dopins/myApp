import {HttpRequestService} from "../httpService/httpRequest.service"
import {Injectable} from "@angular/core";
import { NativeStorage } from '@ionic-native/native-storage';

@Injectable()
export class AccountService {
  timer;
  constructor(public nativeStorage: NativeStorage,private httpRequestService: HttpRequestService) {

  }

  loginWeblib(paramObj) {
    let url: string = this.httpRequestService.loginWeblib;
    return this.httpRequestService.post(url, paramObj);
  }

  weblibSelectMember(paramObj) {
    let url: string = this.httpRequestService.selectMember;
    return this.httpRequestService.post(url, paramObj);
  }

  weblibLoginStatus(paramObj) {
    let url: string = this.httpRequestService.weblibLoginStatus + '?' + this.httpRequestService.serialize(paramObj);
    return this.httpRequestService.get(url);
  }

  initStoreType(paramObj) {
    let url: string = this.httpRequestService.initParam;
    return this.httpRequestService.post(url, paramObj);
  }

  getUserInfo(){
    let url: string = this.httpRequestService.getUser;
    return this.httpRequestService.get(url);
  }

  getAccountInfo(paramObj){
    let url: string = this.httpRequestService.getAccountInfo+ '?' + this.httpRequestService.serialize(paramObj);
    return this.httpRequestService.get(url);
  }

  login(paramObj) {
    let url: string = this.httpRequestService.login + '?' + this.httpRequestService.serialize(paramObj);
    return this.httpRequestService.get(url);
  }

  logout() {
    let url: string = this.httpRequestService.logout;
    return this.httpRequestService.get(url);
  }

  ifLogin(){
    let url: string = this.httpRequestService.ifLogin;
    return this.httpRequestService.get(url);
  }

  saveAccount(paramObj){
    let url: string = this.httpRequestService.saveAccount;
    return this.httpRequestService.post(url,paramObj);
  }

  checkLoginStatus(){
    let paramObj = {
        };
    this.weblibLoginStatus(paramObj).subscribe(res=>{
            if(res.status=="login"){
              }else{
                this.autoLogin();
              }
          },error=>{
              this.autoLogin();
          })
  }

  keepConnection(){
    this.timer=setInterval(()=>{
      console.log("keepConnection");
        let paramObj = {
        };
        this.weblibLoginStatus(paramObj).subscribe(res=>{
            if(res.status=="login"){
              }else{
                this.autoLogin();
              }
          },error=>{
              this.autoLogin();
          })
    },6000)
  }
  autoLogin(){
    let username;
    let password;
     this.nativeStorage.getItem('username')
      .then(
        data => {
          username=data;
          this.nativeStorage.getItem('password')
          .then(
            data => {
              password=data;
              this.autoLoginWithParam(username,password);
            },
            error => console.error(error)
          );
        },
        error => console.error(error)
      );
      
  }
  autoLoginWithParam(username,password){
      if(username!=null&&password!=null){
        let paramObj = {
        username: username,
        password:password
      };
      this.login(paramObj).subscribe(res => {
        let result:string=res.result;
        if(result=='success'){
              this.initStoreType(paramObj).subscribe(res=>{
              if(res.resule="success"){
                this.autoLoginWeblib(res.weblibUsername,res.weblibPasswd);
              }
            },error=>{
              console.log("error: "+error);
            })
            }else{
            }
          },error=>{
          });
        }else{
        }
  }
   autoLoginWeblib(username,password){

    let weblibLoginParam = "account="+username+"&password="+password;
    this.loginWeblib(weblibLoginParam).subscribe(res=>{
      let result=res.members;
      if(result==null){
      }else{
        let weblibSelectMemParam = "memberId="+result[0].id;
        this.weblibSelectMember(weblibSelectMemParam).subscribe(res=>{
        },error => {
          console.log("error: "+error);
        })
      }
    },error =>{
      console.log("error: "+error);
    });
  }

  closeConnection(){
    clearInterval(this.timer);
  }

  upload(file) {
    let url:string = this.httpRequestService.upload;
    let formData:FormData = new FormData();
    formData.append('filedata',file,file.name);
    return this.httpRequestService.postFile(url,formData);
  }

}

