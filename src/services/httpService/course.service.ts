import {HttpRequestService} from "../httpService/httpRequest.service"
import {Injectable} from "@angular/core";

@Injectable()
export class CourseService {

  constructor(private httpRequestService: HttpRequestService) {

  }

  listValidCourse() {
    let url: string = this.httpRequestService.listValidCourse;
    return this.httpRequestService.get(url);
  }

  courseDetail(paramObj) {
    let url: string = this.httpRequestService.courseDetail + "?" + this.httpRequestService.serialize(paramObj);
    return this.httpRequestService.get(url);
  }

  listDiscuss(paramObj) {
    let url: string = this.httpRequestService.listDiscuss + "?" + this.httpRequestService.serialize(paramObj);
    return this.httpRequestService.get(url);
  }

  listSHomework(paramObj) {
    let url: string = this.httpRequestService.listSHomework + "?" + this.httpRequestService.serialize(paramObj);
    return this.httpRequestService.get(url);
  }

  listMessage(paramObj) {
    let url: string = this.httpRequestService.listMessage + "?" + this.httpRequestService.serialize(paramObj);
    return this.httpRequestService.get(url);
  }

  courseResource(paramObj, type) {
    if (type == "student") {
      let url: string = this.httpRequestService.listStudentResource + "?" + this.httpRequestService.serialize(paramObj);
      return this.httpRequestService.get(url);
    } else {
      let url: string = this.httpRequestService.listTeacherResource + "?" + this.httpRequestService.serialize(paramObj);
      return this.httpRequestService.get(url);
    }

  }

  getCourseWare(paramObj) {
    let url: string = this.httpRequestService.getCourseWare + "?" + this.httpRequestService.serialize(paramObj);
    return this.httpRequestService.get(url);
  }

  buildVideoUrl(id, lmsSessionId, weblibSessionId) {
    let paramsObj = '';
    if (id.indexOf(".") == -1) {
      if (typeof(weblibSessionId) != 'undefined' && weblibSessionId != '') {
        paramsObj = "/weblib/group/downloadResource.action?id=" + id + "&isInline=1" + "&sessionId=" + weblibSessionId;
      } else {
        paramsObj = "/weblib/group/downloadResource.action?id=" + id + "&isInline=1";
      }
    } else {
      if (typeof(lmsSessionId) != 'undefined' || lmsSessionId != '') {
        paramsObj = "/lms/json/learning/download;jsessionid=" + lmsSessionId + "?id=" + id;
      } else {
        paramsObj = "/lms/json/learning/download?id=" + id;
      }
    }
    return paramsObj;
  }

  openCourseResource(paramObj) {
    let url: string = this.httpRequestService.listOpenResource + "?" + this.httpRequestService.serialize(paramObj);
    return this.httpRequestService.get(url);
  }


  getDownloadPDFUrl(paramObj) {
    let url: string = this.httpRequestService.downloadResource + "?" + this.httpRequestService.serialize(paramObj);
    return this.httpRequestService.host+url;
  }

  doUpvote(paramObj) {
    let url: string = this.httpRequestService.doUpvote;
    return this.httpRequestService.post(url, this.httpRequestService.serialize(paramObj));
  }

  listQuiz(paramObj) {
    let url: string = this.httpRequestService.listQuiz + "?" + this.httpRequestService.serialize(paramObj);
    return this.httpRequestService.get(url);
  }

  listQuizResult(paramObj) {
    let url: string = this.httpRequestService.listQuizResult + "?" + this.httpRequestService.serialize(paramObj);
    return this.httpRequestService.get(url);
  }

  joinOpenCourse(paramObj) {
    let url: string = this.httpRequestService.joinOpenCourse + "?" + this.httpRequestService.serialize(paramObj);
    return this.httpRequestService.get(url);
  }

  quitOpenCourse(paramObj) {
    let url: string = this.httpRequestService.quitOpenCourse + "?" + this.httpRequestService.serialize(paramObj);
    return this.httpRequestService.get(url);
  }

  submitQuiz(paramObj) {
    let url: string = this.httpRequestService.submitQuiz;
    return this.httpRequestService.post(url, paramObj);
  }

  submitHomework(paramObj) {
    let url: string = this.httpRequestService.submitHomework;
    return this.httpRequestService.post(url, paramObj);
  }

  uploadResourse(paramObj) {
    let url: string = this.httpRequestService.uploadResourse;
    return this.httpRequestService.resourcePost(url, paramObj);
  }

  deleteCourse(model) {
    let url:string = this.httpRequestService.deleteCourse;
    let param = this.httpRequestService.serialize(model);
    return this.httpRequestService.post(url, param);
  }


}
