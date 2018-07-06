import { Component } from '@angular/core';
import {  NavController, NavParams, Platform } from 'ionic-angular';
import { CourseService} from "../../services/httpService/course.service"
import { AccountService} from "../../services/httpService/account.service"
import {HttpRequestService} from "../../services/httpService/httpRequest.service";
/**
 * Generated class for the VideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
})
export class VideoPage {
  title:string;
  host:string;
  videoUrl:string;
  syllabus:string;
  pdfSrc:string;
  btnViewPDF:boolean =true;
  spinner:boolean =false;
  hasPDF:boolean = true;
  hasVideo:boolean = true;
  videoPlay:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpRequestService:HttpRequestService,public accountService:AccountService,public courseService:CourseService,public platform: Platform) {
    platform.ready().then(() => {
      this.host =  httpRequestService.getCurrentHost();
      this.title=this.navParams.data.name;
       this.getCourseware(this.navParams.data.id);
       // this.videoWidth = document.documentElement.clientWidth;
    });
  }
  viewPDF()
  {
    this.btnViewPDF=false;
    this.spinner=true;
    let paramObj = {
      id: this.syllabus
    }

      if (typeof (FileReader) !== 'undefined') {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
     };

    let url=this.courseService.getDownloadPDFUrl(paramObj);

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function(){
      if (xmlHttp.readyState==4){
        if (xmlHttp.status==200) {
           reader.readAsArrayBuffer(xmlHttp.response);
        }
        else{
        }
     }
    }
    xmlHttp.responseType = 'blob';
    xmlHttp.open("get",url,true);
    xmlHttp.send(null);
  }
}

  afterLoadPDF(){
   this.spinner=false;
}

  loadVideo(video:HTMLElement){
    console.log("loading....");
    video.style.display = "block";
    this.videoPlay = true;
  }


  getCourseware(uid){
    let paramObj = {
      unitId: uid
    };
    this.courseService.getCourseWare(paramObj).subscribe(res =>{
      console.log(res);
      if (res.result == 'success') {
        this.syllabus=res.syllabus;
        if(this.syllabus == '')
        {
          this.hasPDF = false;
        }
        if (res.filepath != "" || res.filetype != "") {
          if (res.filetype == 'mp4') {
            let cookies = document.cookie.split(';');
            let lmsSessionId = '';
            let weblibSessionId = '';
            for (let c in cookies) {
              let cookieName = cookies[c].split('=')[0].trim();
              if (cookieName != "JSESSIONID")
                continue;
              let cookieValue = cookies[c].split('=')[1];
              if (cookieValue.indexOf('.') == -1) {
                lmsSessionId = cookieValue;
              } else {
                weblibSessionId = cookieValue;
              }
            }
            this.videoUrl = this.host + this.courseService.buildVideoUrl(res.filepath, lmsSessionId, weblibSessionId);
            console.log(".getCourseWare success"+res.syllabus+' '+res.filepath);
          } else if (res.filetype == 'flv') {
            alert("不支持该视频格式")
          } else if (res.filetype == 'swf') {
            alert("不支持该视频格式")
          }
        } else if (res.filepath == "" || res.filetype == "") {
          // collect.pdfUrl = Account.initPDF(res.data.syllabus);
          // // console.log(res.data.filepath+"wu");
          // console.log(res.data.syllabus);
          //
          // Account.initPDF(res.data.syllabus);
          this.hasVideo = false;
          this.btnViewPDF = false;
          this.viewPDF();
        }
      }
    },error =>{
      console.log("error: "+error);
    });
  }

}
