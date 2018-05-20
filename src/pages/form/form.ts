import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {TeacherService} from "../../services/httpService/teacher.service";
import { CourseInfo } from "../../model/CourseInfo"
import {SectionInfo} from "../../model/SectionInfo";
import {HomeworkInfo} from "../../model/HomeworkInfo";
import {Unit} from "../../model/Unit";
import {FileUploadParam} from "../../model/FileUploadParam";

/**
 * Generated class for the FormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {
  title:string="form";
  showCourse:boolean = false;
  showSection:boolean = false;
  showHomework:boolean = false;
  showUnit:boolean = false;
  file: any;
  fileParam:FileUploadParam;
  imgSrc:string;
  showImg:boolean = false;
  courseInfo:CourseInfo = new CourseInfo('','','','',0.5,1,'','','2018-01-01','2018-03-24', '', '');
  isOpen:boolean = false;
  courseType:Object[];
  department:Object[];
  sectionInfo:SectionInfo = new SectionInfo('','','','',0,'','2018-01-01','2018-01-01');
  homeworkInfo:HomeworkInfo = new HomeworkInfo('', '','','','','','','', '','','','2018-01-01T12:00','2018-01-01T12:00');
  unit:Unit = new Unit('','', '','','','2018-01-01','2018-01-01',0,'','','','','','','','','');

  constructor(public navCtrl: NavController, public teacherService:TeacherService,public toastCtrl: ToastController, public loadingCtrl: LoadingController, public navParams: NavParams) {

    let formType = this.navParams.get('type');
    let courseId = this.navParams.get('id');
    let sectionId = this.navParams.get('sectionId');
    let homeworkId = this.navParams.get('homeworkId');
    let orderId =  this.navParams.get('order');
    let unitId = this.navParams.get('unitId');
    if(formType == "course")
    {
      this.title = "编辑课程";
      this.showSection = false;
      this.showHomework = false;
      this.showUnit = false;
      this.showCourse = true;
      this.formCourse(courseId);
      if(typeof(courseId) == "undefined"){
        this.title = "创建课程";
        this.courseInfo.startDate = this.getCurrentDate('date');
        this.courseInfo.endDate = this.getCurrentDate('date');
      }
    }
    else if(formType == 'section')
    {
      this.title = "编辑章节";
      this.showSection = true;
      this.showCourse = false;
      this.showUnit = false;
      this.showHomework = false;
      if(typeof (sectionId) != "undefined")
      {
        this.formSection(courseId, sectionId);
      }
      else
      {
        this.sectionInfo.courseId = courseId;
        this.sectionInfo.sectionId = '0';
        this.sectionInfo.orderId = orderId;
        this.sectionInfo.startDate = this.navParams.get('startDate');
        this.sectionInfo.endDate = this.navParams.get('endDate');
      }
    }
    else if(formType == 'homework'){
      this.title = '编辑作业';
      this.fileParam = this.navParams.get('fileParam');
      this.showHomework = true;
      this.showSection = false;
      this.showCourse = false;
      this.showUnit = false;
      if(homeworkId == '0')
      {
        this.homeworkInfo.sectionId = sectionId;
        this.homeworkInfo.groupId = this.fileParam.groupId;
        this.homeworkInfo.parentId = this.fileParam.parentId;
        this.homeworkInfo.coolviewId = this.fileParam.coolviewId;
        this.homeworkInfo.startDate = this.getCurrentDate('time');
        this.homeworkInfo.endDate =  this.navParams.get('endDate')+"T12:00";
      }
      else {
        this.formHomework(sectionId, homeworkId);
      }
    }
    else {
      this.title = '教学元素管理';
      this.fileParam = this.navParams.get('fileParam');
      this.showHomework = false;
      this.showSection = false;
      this.showCourse = false;
      this.showUnit = true;
      if(unitId == '0') {
        this.unit.sectionId = sectionId;
        this.unit.groupId = this.fileParam.groupId;
        this.unit.parentId = this.fileParam.parentId;
        this.unit.coolviewId = this.fileParam.coolviewId;
        this.unit.startDate = this.navParams.get('startDate');
        this.unit.endDate =  this.navParams.get('endDate');
      }
      else {
        this.formUnit(sectionId, unitId);
      }
    }
  }

  getCurrentDate(type){
    let now = new Date();
    let month:string;
    let date:string;
    let nowDate:string;
    let trueMonth = now.getMonth()+1;
    if(trueMonth < 10){
      month = '0'+trueMonth;
    }
    else{
      month = trueMonth.toString();
    }
    if(now.getDate()<10){
      date = '0'+now.getDate();
    }
    else{
      date = now.getDate().toString();
    }
    if(type == "time"){
      nowDate = now.getFullYear().toString()+'-'+month+'-'+date+'T'+now.getHours()+":"+now.getMinutes();
    }
    else{
      nowDate = now.getFullYear().toString()+'-'+month+'-'+date;
    }
    console.log(nowDate);
    return nowDate;
  }

  compareDate(start, end){
    let t1 = start.split('-');
    let t2 = end.split('-');
    if(t1[0] < t2[0]){
      return true;
    }
    else if(t1[0] == t2[0]){
      if(t1[1]<t2[1]){
        return true;
      }
      else if(t1[1]==t2[1]){
        if(t1[2]<t2[2]){
          return true;
        }
        else {
          return false;
        }
      }
      else{
        return false;
      }
    }
    else {
      return false;
    }
  }

  pdfUpload(event) {
    this.file = event.target.files[0];
    if(typeof(this.file) == "undefined"){
      return;
    }
    let arr = this.file.name.split('.');
    let type = arr[arr.length-1];
    if(type != 'pdf')
    {
      this.toastCtrl.create({
        message: "请上传pdf文件",
        duration: 2000,
        position: 'top'
      }).present();
      return;
    }
    let loading = this.loadingCtrl.create({
      content: '文件上传中...'
    });
    loading.present();
    let formData:FormData = new FormData();
    formData.append('coolviewId', this.fileParam.coolviewId);
    formData.append('groupId', this.fileParam.groupId);
    formData.append('parentId', this.fileParam.parentId);
    formData.append('filedata', this.file, this.file.name);
    this.teacherService.uploadResourse(formData).subscribe( res => {
      this.unit.syllabusFile = res.file[0].filename;
      this.unit.syllabus = res.file[0].id;
      loading.dismiss();
    } , error => {});
  }

  videoUpload(event) {
    this.file = event.target.files[0];
    if(typeof(this.file) == "undefined"){
      return;
    }
    let arr = this.file.name.split('.');
    let type = arr[arr.length-1];
    if(type != 'mp4' && type != 'avi' && type != 'rmvb')
    {
      this.toastCtrl.create({
        message: "请上传mp4,avi,rmvb格式的视频",
        duration: 2000,
        position: 'top'
      }).present();
      return;
    }
    let loading = this.loadingCtrl.create({
      content: '视频上传中...'
    });
    loading.present();
    let formData:FormData = new FormData();
    formData.append('coolviewId', this.fileParam.coolviewId);
    formData.append('groupId', this.fileParam.groupId);
    formData.append('parentId', this.fileParam.parentId);
    formData.append('filedata', this.file, this.file.name);
    this.teacherService.uploadResourse(formData).subscribe( res => {
      this.unit.slidesFile = res.file[0].filename;
      this.unit.slides = res.file[0].id;
      this.unit.slidesType = res.file[0].ext;
      loading.dismiss();
    } , error => {});
  }

  fileUpload(event)
  {
    this.file = event.target.files[0];
    if(typeof(this.file) == "undefined"){
      return;
    }
    let loading = this.loadingCtrl.create({
      content: '文件上传中...'
    });
    loading.present();
    let formData:FormData = new FormData();
    formData.append('coolviewId', this.fileParam.coolviewId);
    formData.append('groupId', this.fileParam.groupId);
    formData.append('parentId', this.fileParam.parentId);
    formData.append('filedata', this.file, this.file.name);
    this.teacherService.uploadResourse(formData).subscribe( res => {
      this.unit.referenceFile = res.file[0].filename;
      this.unit.reference = res.file[0].id;
      loading.dismiss();
    } , error => {});
  }

  deleteSyllabus()
  {
    if(this.unit.syllabus == '') {
      return;
    }
    this.unit.syllabusFile = '';
    this.unit.syllabus = '';
    let param = {
      id : this.navParams.get('unitId')
    };
    this.teacherService.deleteSyllabus(param).subscribe( res => {

    }, error => {} );
  }

  deleteReference()
  {
    if(this.unit.reference == '') {
      return;
    }
    this.unit.referenceFile = '';
    this.unit.reference = '';
    let param = {
      id : this.navParams.get('unitId')
    };
    this.teacherService.deleteReference(param).subscribe( res => {

    }, error => {} );
  }

  deleteSlides()
  {
    if(this.unit.slides == '') {
      return;
    }
    this.unit.slides = '';
    this.unit.slidesFile = '';
    this.unit.slidesType = '';
    let param = {
      id : this.navParams.get('unitId')
    };
    this.teacherService.deleteSlides(param).subscribe( res => {

    }, error => {} );
  }

  imageUploaded(event) {
    this.file = event.target.files[0];
    if(typeof(this.file) == "undefined"){
      return;
    }
    let arr = this.file.name.split('.');
    let type = arr[arr.length-1];
    if (type !='jpeg' && type != 'jpg' && type != 'png' && type != 'gif') {
      this.toastCtrl.create({
        message: "请上传jpg,jpeg,png或gif格式的图片",
        duration: 2000,
        position: 'top'
      }).present();
      return;
    }
    var reader = new FileReader(); //新建FileReader对象
    reader.readAsDataURL(this.file); //读取为base64
    var that = this;
    reader.onloadend = function (e) {
      that.imgSrc = reader.result;
      that.showImg = true;
      that.teacherService.upload(that.file).subscribe( res => {
        if(res.result == 'success')
        {
          that.courseInfo.filename = res.file[0].id;
        }
      }, error => {
      });
    }
  }

  imageRemoved() {
    this.file = null;
    this.imgSrc = '';
    this.courseInfo.filename = '';
    this.showImg = false;
  }

  homeworkUpload(event) {
    this.file = event.target.files[0];
    if(typeof(this.file) == "undefined"){
      return;
    }
    let arr = this.file.name.split('.');
    let type = arr[arr.length-1];
    if(this.isDoc(type))
    {
      let formData:FormData = new FormData();
      formData.append('coolviewId', this.fileParam.coolviewId);
      formData.append('groupId', this.fileParam.groupId);
      formData.append('parentId', this.fileParam.parentId);
      formData.append('filedata', this.file, this.file.name);
      this.teacherService.uploadResourse(formData).subscribe( res => {
        this.homeworkInfo.chFilename = res.file[0].filename;
        this.homeworkInfo.filename = res.file[0].id;
      } , error => {});
    }
    else {
      this.toastCtrl.create({
        message: "请上传文本类型文件",
        duration: 2000,
        position: 'top'
      }).present();
      return;
    }
  }

  answerUpload(event) {
    this.file = event.target.files[0];
    if(typeof(this.file) == "undefined"){
      return;
    }
    let arr = this.file.name.split('.');
    let type = arr[arr.length-1];
    if(this.isDoc(type))
    {
      let formData:FormData = new FormData();
      formData.append('coolviewId', this.fileParam.coolviewId);
      formData.append('groupId', this.fileParam.groupId);
      formData.append('parentId', this.fileParam.parentId);
      formData.append('filedata', this.file, this.file.name);
      this.teacherService.uploadResourse(formData).subscribe( res => {
        this.homeworkInfo.answerName = res.file[0].filename;
        this.homeworkInfo.answer = res.file[0].id;
      } , error => {});
    }
    else {
      this.toastCtrl.create({
        message: "请上传文本类型文件",
        duration: 2000,
        position: 'top'
      }).present();
      return;
    }
  }

  isDoc(type){
    if(type=='pdf'||type=='doc'||type=='docx'||type=='txt'){
      return true
    }else{
      return false;
    }
  }

  formCourse(courseId)
  {
    if(typeof (courseId) == "undefined"){
      this.teacherService.createCourse().subscribe( res => {
        if(res.result == 'success'){
          this.courseType = res.courseType;
          this.department = res.departmentType;
        }
      } , error => {
      })
    }
    else{
      let param = {
        courseId : courseId
      };
      this.teacherService.formCourse(param).subscribe( res => {
        if(res.result == 'success' )
        {
          this.courseType = res.courseType;
          this.department = res.departmentType;
          if(res.isOpen == '1')
          {
            this.isOpen = false;
          }
          else
          {
            this.isOpen = true;
          }
          if(res.filepath != '')
          {
            this.showImg = true;
            this.imgSrc = "http://lms.ccnl.scut.edu.cn/lms/custom/"+res.filepath;
          }
          else
          {
            this.showImg = false;
          }
          let startDate:string = res.startDate;
          if(startDate != ''){
            startDate = startDate.split(' ')[0];
          }
          let endDate :string = res.endDate;
          if(endDate != ''){
            endDate = endDate.split(' ')[0];
          }
          let credit:number = parseFloat(res.credit);
          let classHour:number = parseInt(res.classHour);

          this.courseInfo = new CourseInfo(courseId, res.name, res.filepath, res.textbook, credit, classHour, res.introduction, res.isOpen, startDate, endDate, res.type, res.department);
        }
      }, error => {

      })
    }

  }

  saveCourse()
  {
    let paramObj:any;
    if(this.courseInfo.name == ''){
      this.toastCtrl.create({
        message: "课程名称不能为空",
        duration: 1000,
        position: 'top'
      }).present();
      return;
    }
    if(this.courseInfo.introduction == ''){
      this.toastCtrl.create({
        message: "课程介绍不能为空",
        duration: 1000,
        position: 'top'
      }).present();
      return;
    }
    if(!(this.compareDate(this.courseInfo.startDate, this.courseInfo.endDate)&&this.compareDate(this.getCurrentDate('date'),this.courseInfo.endDate))){
      this.toastCtrl.create({
        message: "时间输入不合法",
        duration: 1000,
        position: 'top'
      }).present();
      return;
    }
    if(this.isOpen)
    {
      this.courseInfo.isOpen = '2'
    }
    else
    {
      this.courseInfo.isOpen = '1';
    }
    if(!this.showImg)
    {
      this.courseInfo.filename = '';
    }
    if(this.title == "创建课程"){
      paramObj = {
        name : this.courseInfo.name,
        filename : this.courseInfo.filename,
        textbook : this.courseInfo.textbook,
        credit : this.courseInfo.credit,
        classHour : this.courseInfo.classHour,
        introduction : this.courseInfo.introduction,
        isOpen : this.courseInfo.isOpen,
        startDate : this.courseInfo.startDate,
        endDate : this.courseInfo.endDate,
        type : this.courseInfo.type,
        department : this.courseInfo.department
      }
    }
    else{
      paramObj = this.courseInfo;
    }
    this.teacherService.saveCourse(paramObj).subscribe( res => {
      if(res.result == 'success')
      {
        this.toastCtrl.create({
          message: "保存成功",
          duration: 2000,
          position: 'top'
        }).present();
        this.navCtrl.pop();
      }
    } , error => {
      console.log('result:'+error);
    });
  }

  formSection(courseId, sectionId)
  {
    let param =  {
        courseId : courseId,
        sectionId : sectionId
      };

    this.teacherService.formSection(param).subscribe( res => {
      let startDate:string = res.startDate;
      startDate = startDate.split(' ')[0];
      let endDate :string = res.endDate;
      endDate = endDate.split(' ')[0];
      let orderId = parseInt(res.orderId);
      this.sectionInfo = new SectionInfo(courseId, sectionId, res.name, res.introduction, orderId, res.attach, startDate, endDate);
      console.log(this.sectionInfo);
    }, error => {

    })
  }

  saveSection()
  {
    if(this.sectionInfo.name == ''){
      this.toastCtrl.create({
        message: "章节名称不能为空",
        duration: 1000,
        position: 'top'
      }).present();
      return;
    }
    this.teacherService.saveSection(this.sectionInfo).subscribe( res => {
      if(res.result == 'success') {
        this.toastCtrl.create({
          message: "保存成功",
          duration: 2000,
          position: 'top'
        }).present();
        this.navCtrl.pop();
      }
    });
  }

  formHomework(sectionId,homeworkId)
  {
    let param = {
      homeworkId : homeworkId,
      sectionId : sectionId
    };
    this.teacherService.formHomework(param).subscribe( res => {
      let startDate:string = res.startDate;
      if(startDate != '')
      {
        let dates = startDate.split(' ') ;
        startDate = dates[0] + 'T'+ dates[1].substr(0,5);
      }

      let endDate :string = res.endDate;
      if(endDate != '')
      {
        let times = endDate.split(' ') ;
        endDate = times[0] + 'T'+ times[1].substr(0,5);
      }
      this.homeworkInfo = new HomeworkInfo(res.name, sectionId, homeworkId, this.fileParam.groupId, this.fileParam.parentId, this.fileParam.coolviewId, res.introduction, res.attach, res.attachName, res.answer, res.answerName, startDate, endDate);
      console.log(this.homeworkInfo);
    }, error => {

    })
  }

  saveHomework()
  {
    if(this.homeworkInfo.name == ''){
      this.toastCtrl.create({
        message: "作业名称不能为空",
        duration: 1000,
        position: 'top'
      }).present();
      return;
    }
    if(this.homeworkInfo.startDate != '')
    {
      let d1 = this.homeworkInfo.startDate.split('T');
      this.homeworkInfo.startDate = d1[0] + ' '+d1[1].substr(0,8);
    }
    if(this.homeworkInfo.endDate != '')
    {
      let d1 = this.homeworkInfo.endDate.split('T');
      this.homeworkInfo.endDate = d1[0] + ' '+d1[1].substr(0,8);
    }
    console.log(this.homeworkInfo);
    this.teacherService.saveHomework(this.homeworkInfo).subscribe( res => {
      if(res.result == 'success'){
        let hId = this.navParams.get('homeworkId');
        if(hId == '0'){
          hId = res.homeworkId;
        };
        let formData = {
          homeworkId: hId,
          answer: this.homeworkInfo.answer,
          answerName: this.homeworkInfo.answerName
        };
        this.teacherService.saveHomeworkAnswer(formData).subscribe( result => {
          if(result.result == 'success'){
            this.toastCtrl.create({
              message: "保存成功",
              duration: 2000,
              position: 'top'
            }).present();
            this.navCtrl.pop();
          }
        }, error => {} );

      }
    }, error => {
    } );

  }

  formUnit(sectionId, unitId)
  {
    let param = {
      unitId : unitId,
      sectionId : sectionId
    };
    this.teacherService.formUnit(param).subscribe( res => {
      console.log(res);
      if(res.result == 'success')
      {
        let startDate:string = res.startDate;
        startDate = startDate.split(' ')[0];
        let endDate :string = res.endDate;
        endDate = endDate.split(' ')[0];
        this.unit = new Unit(unitId, sectionId, this.fileParam.groupId, this.fileParam.parentId, this.fileParam.coolviewId, startDate, endDate, res.orderId, res.name, res.introduction,
                              res.reference, res.referenceFile, res.syllabus, res.syllabusFile, res.slides, res.slidesFile, res.slidesType);
        console.log(this.unit);
      }

    }, error => {
      console.log("form unit error");
    } )
  }

  saveUnit()
  {
    if(this.unit.name == ''){
      this.toastCtrl.create({
        message: "名称不能为空",
        duration: 1000,
        position: 'top'
      }).present();
      return;
    }
    this.teacherService.saveUnit(this.unit).subscribe( res => {
      if(res.result == 'success'){
        this.toastCtrl.create({
          message: "保存成功",
          duration: 2000,
          position: 'top'
        }).present();
        this.navCtrl.pop();
      }
    }, error => {} );
  }

}
