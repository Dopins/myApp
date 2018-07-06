import {HttpRequestService} from "../httpService/httpRequest.service"
import {Injectable} from "@angular/core";

@Injectable()
export class TeacherService{

  constructor(private httpRequestService: HttpRequestService) {

  }

  upload(file) {
    let url:string = this.httpRequestService.upload;
    let formData:FormData = new FormData();
    formData.append('filedata',file,file.name);
    return this.httpRequestService.postFile(url,formData);
  }

  listProgress(paramObj) {
    let url: string = this.httpRequestService.listProgress + "?" + this.httpRequestService.serialize(paramObj);
    return this.httpRequestService.get(url);
  }

  formCourse(paramObj) {
    let url:string = this.httpRequestService.formCourse + "?" + this.httpRequestService.serialize(paramObj);
    return this.httpRequestService.get(url);
  }

  createCourse() {
   let url:string = this.httpRequestService.formCourse;
   return this.httpRequestService.get(url);
  }

  saveCourse(model)
  {
    let url: string = this.httpRequestService.saveCourse;
    let param = this.httpRequestService.serialize(model);
    return this.httpRequestService.post(url,param);
  }

  formSection(paramObj) {
    let url: string = this.httpRequestService.formSection + "?" + this.httpRequestService.serialize(paramObj);
    return this.httpRequestService.get(url);
  }

  getCourseStudent(paramObj){
    let url: string = this.httpRequestService.listStudent + "?" + this.httpRequestService.serialize(paramObj);
    return this.httpRequestService.get(url);
  }

  getCourseTeacher(paramObj){
    let url: string = this.httpRequestService.listTeacher + "?" + this.httpRequestService.serialize(paramObj);
    return this.httpRequestService.get(url);
  }

  saveSection(model)
  {
    let url:string = this.httpRequestService.saveSection;
    let param = this.httpRequestService.serialize(model);
    return this.httpRequestService.post(url, param);
  }
  addNewTeacher(paramObj){
    let url: string = this.httpRequestService.addNewTeacher + "?" + this.httpRequestService.serialize(paramObj);
    return this.httpRequestService.get(url);
  }
  addSingleStudent(paramObj){
    let url: string = this.httpRequestService.addSingleStudent + "?" + this.httpRequestService.serialize(paramObj);
    return this.httpRequestService.get(url);
  }

  removeTeacher(paramObj){
    let url: string = this.httpRequestService.removeTeacher + "?" + this.httpRequestService.serialize(paramObj);
    return this.httpRequestService.get(url);
  }
  removeStudent(paramObj){
    let url: string = this.httpRequestService.removeStudent + "?" + this.httpRequestService.serialize(paramObj);
    return this.httpRequestService.get(url);
  }

  formHomework(paramObj)
  {
    let url:string = this.httpRequestService.formHomework + "?" +this.httpRequestService.serialize(paramObj);
    return this.httpRequestService.get(url);
  }

  saveHomework(model)
  {
    let url:string = this.httpRequestService.saveHomework;
    let param = this.httpRequestService.serialize(model);
    return this.httpRequestService.post(url, param);
  }

  saveHomeworkAnswer(model)
  {
    let url:string = this.httpRequestService.saveHomeworkAnswer;
    let param = this.httpRequestService.serialize(model);
    return this.httpRequestService.post(url, param);
  }

  formUnit(param)
  {
    let url:string = this.httpRequestService.formUnit + "?" +this.httpRequestService.serialize(param);
    return this.httpRequestService.get(url);
  }

  saveUnit(model)
  {
    let url:string = this.httpRequestService.saveUnit;
    let param = this.httpRequestService.serialize(model);
    return this.httpRequestService.post(url, param);
  }

  initFileUpload(param)
  {
    let url :string = this.httpRequestService.initFileUpload + "?" + this.httpRequestService.serialize(param);
    return this.httpRequestService.get(url);
  }

  uploadResourse(paramObj) {
    let url: string = this.httpRequestService.uploadResourse;
    return this.httpRequestService.resourcePost(url, paramObj);
  }

  deleteSyllabus(model) {
    let url:string = this.httpRequestService.deleteSyllabus;
    let param = this.httpRequestService.serialize(model);
    return this.httpRequestService.post(url, param);
  }

  deleteReference(model) {
    let url:string = this.httpRequestService.deleteReference;
    let param = this.httpRequestService.serialize(model);
    return this.httpRequestService.post(url, param);
  }

  deleteSlides(model) {
    let url:string = this.httpRequestService.deleteSlides;
    let param = this.httpRequestService.serialize(model);
    return this.httpRequestService.post(url, param);
  }

  deleteUnit(model) {
    let url:string = this.httpRequestService.deleteUnit;
    let param = this.httpRequestService.serialize(model);
    return this.httpRequestService.post(url, param);
  }

  deleteHomework(model) {
    let url:string = this.httpRequestService.deleteHomework;
    let param = this.httpRequestService.serialize(model);
    return this.httpRequestService.post(url, param);
  }

  deleteSection(model) {
    let url:string = this.httpRequestService.deleteSection;
    let param = this.httpRequestService.serialize(model);
    return this.httpRequestService.post(url, param);
  }

  formQuiz(param) {
    let url = this.httpRequestService.formQuiz + "?" + this.httpRequestService.serialize(param);
    return this.httpRequestService.get(url);
  }

  saveQuiz(model) {
    let url = this.httpRequestService.saveQuiz;
    let param = this.httpRequestService.serialize(model);
    return this.httpRequestService.post(url, param);
  }

  publishQuiz(model) {
    let url = this.httpRequestService.publishQuiz;
    let param = this.httpRequestService.serialize(model);
    return this.httpRequestService.post(url, param);
  }

  deleteQuiz(model) {
    let url = this.httpRequestService.deleteQuiz;
    let param = this.httpRequestService.serialize(model);
    return this.httpRequestService.post(url, param);
  }

  formCourseQuiz(param) {
    let url = this.httpRequestService.formCourseQuiz + "?" + this.httpRequestService.serialize(param);
    return this.httpRequestService.get(url);
  }

  setRandomExam(model) {
    let url = this.httpRequestService.setRandomNumOfCourseExam;
    let param = this.httpRequestService.serialize(model);
    return this.httpRequestService.post(url, param);
  }

  getRandomExam(param) {
    let url = this.httpRequestService.getRandomNumOfCourseExam + "?" + this.httpRequestService.serialize(param);
    return this.httpRequestService.get(url);
  }

  listStudentScore(param) {
    let url = this.httpRequestService.listStudentScore + "?" + this.httpRequestService.serialize(param);
    return this.httpRequestService.get(url);
  }

  listCoursRandomExams(param) {
    let url = this.httpRequestService.listCourseRandomExam + "?" + this.httpRequestService.serialize(param);
    return this.httpRequestService.get(url);
  }

  publishCourseExams(model) {
    let url = this.httpRequestService.publishCourseExams;
    let param = this.httpRequestService.serialize(model);
    return this.httpRequestService.post(url, param);
  }

  saveMessage(model) {
    let url = this.httpRequestService.saveMessage;
    let param = this.httpRequestService.serialize(model);
    return this.httpRequestService.post(url, param);
  }

  deleteMessage(model) {
    let url = this.httpRequestService.deleteMessage;
    let param = this.httpRequestService.serialize(model);
    return this.httpRequestService.post(url, param);
  }

  getHomeworkTable(param){
    let url = this.httpRequestService.getHomeworkTable + "?" + this.httpRequestService.serialize(param);
    return this.httpRequestService.get(url);
  }

  saveScore(model){
    let url  = this.httpRequestService.saveScore;
    let param = this.httpRequestService.serialize(model);
    return this.httpRequestService.post(url,param);
  }

  removeHomework(param){
    let url = this.httpRequestService.removeHomework + "?" +this.httpRequestService.serialize(param);
    return this.httpRequestService.get(url);
  }

  tutorSubmit(param,paramObj){
    let url: string = this.httpRequestService.uploadResourse + "?" + this.httpRequestService.serialize(param);
    return this.httpRequestService.resourcePost(url, paramObj);
  }

  submitHomework(model){
    let url: string = this.httpRequestService.submitHomework;
    let param = this.httpRequestService.serialize(model);
    return this.httpRequestService.post(url, param);
  }



}
