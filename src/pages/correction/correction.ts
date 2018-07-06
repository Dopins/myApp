import { Component } from '@angular/core';
import {  NavController, NavParams,ToastController,LoadingController } from 'ionic-angular';
import { TeacherService } from "../../services/httpService/teacher.service";
import { CorrectionDetailPage } from "../correctionDetail/correctionDetail";
import { CorrectionPersonPage } from "../correctionPerson/correctionPerson";
import { HttpRequestService } from "../../services/httpService/httpRequest.service";

@Component({
  selector: 'page-correction',
  templateUrl: 'correction.html',
})

export class CorrectionPage{
    students;
    courseId;
    submit;
    notSubmit;
    correction;
    notCorrection;
    flags;
    host;
    constructor(public navCtrl: NavController,private httpRequestService:HttpRequestService,public teacherService:TeacherService, public navParams: NavParams,public toastCtrl: ToastController,public loadingCtrl: LoadingController){
        let homeworkId = this.navParams.get('id');
        this.courseId = this.navParams.get('courseId');
        this.getHomework(homeworkId);
        this.host = httpRequestService.getCurrentHost();
    }
    
    openDetail(index){
        this.navCtrl.push(CorrectionDetailPage,{student:this.students[index],courseId:this.courseId});
    }

    openPerson(index){
        this.navCtrl.push(CorrectionPersonPage,{student:this.students[index],index:index});
    }

    getHomework(homeworkId){
        let paramObj = {
            id:homeworkId
        };
        this.teacherService.getHomeworkTable(paramObj).subscribe( res =>{
            if(res.result == "success"){
                //console.log("homework");
                //console.log(res);
                this.students = res.homework;
                this.initStatistics();
            }
        })
    }

    initStatistics(){
        this.submit = 0;
        this.notSubmit = 0;
        this.correction = 0;
        this.notCorrection = 0;
        for(let i = 0;i<this.students.length;i++){
            this.students[i].flag = true;
            if(this.students[i].createDate != ""){
                this.submit++;
                let submitDate:string = this.students[i].createDate;
                this.students[i].createDate = submitDate.substring(0,submitDate.length-2);
                //this.students[i].createDate = this.students[i].createDate.subString(0,this.students[i].createDate.length-2);
                if(this.students[i].score == ""){
                    this.notCorrection++;
                }else{
                    this.correction++;
                }
            }else{
                this.notSubmit++;
            }
        }
    }

    modifyScore(index){
        this.students[index].flag = false;
    }

    submitScore(index){
        this.students[index].flag = true;
        let paramObj = {
            hsId:this.students[index].id,
            attach:this.students[index].attach,
            score:this.students[index].score,
            comment:this.students[index].comment
        }
        this.teacherService.saveScore(paramObj).subscribe( res => {
            if(res.result == "success"){
                this.toastCtrl.create({
                    message: '分数修改成功',
                    duration: 2000,
                    position: 'top'
                }).present();
            }
        })
    }
}