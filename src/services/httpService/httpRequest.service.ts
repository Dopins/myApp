import {Http, Headers} from "@angular/http";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/toPromise";
import "rxjs/Rx";
import {Observable} from "rxjs";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/throw";

@Injectable()
export class HttpRequestService {

  host: string='http:\/\/lms.ccnl.scut.edu.cn';
  defaultHost:string='http:\/\/lms.ccnl.scut.edu.cn';

  initParam: string='/lms/json/learning/initStoreType';//初始化Common类的三个变量
  loginWeblib:string= '/weblib/login/authenticate.action';
  selectMember:string= '/weblib/login/selectMember.action?temp=' + Math.random();
  weblibLoginStatus:string="/weblib/user/status.action";
  downloadResource:string= '/weblib/group/downloadResource.action';
  uploadResourse:string='/weblib/group/uploadResourceReturnId.action';
  submitHomework:string='/lms/json/learning/submitHomework';
  listStudent:string='/lms/json/learning/listStudent';
  listTeacher:string='/lms/json/creator/listTeacher';
  getAccountInfo:string='/lms/json/account/getAccountInfo';
  addNewTeacher:string='/lms/json/creator/addNewTeacher';
  addSingleStudent:string='/lms/json/learning/addSingleStudent';
  removeTeacher:string='/lms/json/creator/removeTeacher';
  removeStudent:string='/lms/json/learning/deleteStudent';

  downloadlms:string= '/lms/json/learning/download?id=';
  custom: string='/lms/custom/';

  login: string='/lms/htmlLogin';//登录
  logout: string='/lms/htmlLogout';//登出
  ifLogin: string='/lms/htmlIfLogin';//是否登录
  getUser: string='/lms/json/account/getUser';//获取登录者信息
  courseDetail:string= '/lms/json/learning/courseDetail';//课程图片、简介、课时等
  teacherOfCourse: string='/lms/json/learning/getTeacherOfCourse';//授课教师信息
  listStudentResource: string='/lms/json/learning/listStudentResource';//学的课程列表student
  listTeacherResource: string='/lms/json/learning/listTeacherResource';//教的课程列表teacher
  listValidCourse: string='/lms/json/learning/listValidCourse';//课程列表信息
  getCourseWare:string= '/lms/json/learning/getCourseware';//教学元素的课件资源
  listDiscuss:string="/lms/json/learning/listDiscuss";
  listSHomework:string="/lms/json/learning/listSHomework";
  listOpenResource: string = "/lms/json/learning/listOpenResource" //获取某一公开课的详细信息
  joinOpenCourse: string = "/lms/json/learning/joinOpenCourse"  //加入某一门公开课
  quitOpenCourse: string = "/lms/json/learning/quitOpenCourse" //退出某一门公开课
  doUpvote:string = "/lms/json/learning/doUpvote" //点赞处理

  listProgress:string = "/lms/json/learning/listProgress" //列表显示全班学生的学习进度

  listAllCourse:string= '/lms/json/learning/listAllCourse';//课程列表信息
  listQuiz:string= '/lms/json/learning/listQuiz';//小测试试题列表(学生)
  submitQuiz: string='/lms/json/learning/submitQuiz';//提交小测试post
  listQuizResult:string= '/lms/json/learning/listQuizResult';//小测试结果列表
  // listExamResult: '/lms/json/learning/listExamResult',
  listQuizResultStat:string='/lms/json/learning/listQuizResultStat';
  formAccount:string= '/lms/json/account/';
  saveAccount: string='/lms/json/account/save';//修改个人信息
  saveDiscuss: string = '/lms/json/learning/saveDiscuss';
  deleteDiscuss: string = '/lms/json/learning/deleteDiscuss';
  getUnits : string = '/lms/json/course/getUnits';
  listReply:string = '/lms/json/learning/listReply';
  saveReply:string = '/lms/json/learning/saveReply';
  deleteReply:string = '/lms/json/learning/deleteReply';

  courseThumbnail:string='/lms/json/learning/formThumbnail';//获取课程缩略图
  initFileUpload:string = '/lms/json/learning/initFileUpload'; //获取文件上传（weblib） 所需的参数（groupId、parentId、cooliewId）
  upload:string = '/lms/json/learning/upload'; //统一的文件上传接口，负责所有的文件上传操作

  //教师调用
  formCourse:string = '/lms/json/creator/formCourse'; //用于显示课程详细信息和编辑或新增课程信息
  saveCourse:string = '/lms/json/creator/saveCourse'; //保存课程基本信息
  deleteCourse:string = '/lms/json/creator/deleteCourse';
  formSection:string = '/lms/json/creator/formSection'; //用于显示章节详细信息和编辑或新增章节信息
  saveSection:string = '/lms/json/creator/saveSection'; //保存章节基本信息
  deleteSection:string = '/lms/json/creator/deleteSection';
  formHomework:string = '/lms/json/learning/formHomework'; //返回作业基本信息，用于作业的新增或编辑
  saveHomework:string = '/lms/json/learning/saveHomework';// 保存作业基本信息
  deleteHomework:string = '/lms/json/learning/deleteHomework';
  saveHomeworkAnswer:string = '/lms/json/learning/saveHomeworkAnswer';
  formUnit:string = '/lms/json/creator/formUnit';
  saveUnit:string = '/lms/json/creator/saveUnit';
  deleteUnit:string = '/lms/json/creator/deleteUnit';
  deleteSyllabus:string = '/lms/json/creator/deleteSyllabus';
  deleteReference:string = '/lms/json/creator/deleteReference';
  deleteSlides:string = '/lms/json/creator/deleteSlides';
  formQuiz:string = '/lms/json/creator/formQuiz';//小测试试题列表(教师)
  saveQuiz:string = '/lms/json/creator/saveQuiz';
  publishQuiz:string = '/lms/json/creator/publishQuiz';
  deleteQuiz:string = '/lms/json/creator/deleteQuiz';
  formCourseQuiz:string = '/lms/json/creator/formCourseQuiz';
  getRandomNumOfCourseExam:string = '/lms/json/creator/getRandomNumOfCourseExam';
  setRandomNumOfCourseExam:string = '/lms/json/creator/setRandomNumOfCourseExam';
  listCourseExams:string = '/lms/json/creator/listCourseExams';
  listCourseRandomExam:string = '/lms/json/learning/listCourseRandomExams';
  publishCourseExams:string = '/lms/json/creator/publishCourseExams';
  listStudentScore:string = '/lms/json/learning/listStudentQuizScoreByCourse';
  listMessage:string = '/lms/json/learning/listMessage';
  saveMessage:string = '/lms/json/learning/saveMessage';
  deleteMessage:string = '/lms/json/learning/deleteMessage';
  getHomeworkTable:string = '/lms/json/learning/checkHomework';
  saveScore:string = '/lms/json/learning/saveHS';
  removeHomework:string = '/lms/json/learning/deleteHomeworkStudent';
  copyCourse:string = '/lms/json/creator/copyCourse';

    constructor(private http: Http) {

    }

    //get请求
    get(url: string): Observable<any> {

        return this.http.get(this.host+url, {
            headers: new Headers({
                 "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            }),
            withCredentials: true
        }).map(res => res.json());
    }


    //post请求
    post(url,body): Observable<any> {
        return this.http.post(this.host+url, body,
          { headers: new Headers({
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            }),
            withCredentials: true}
        ).map(res => res.json());
    }

    postFile(url:string,body:Object): Observable<any> {
      return this.http.post(this.host + url, body).map(res => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    resourcePost(url,body): Observable<any> {
      return this.http.post(this.host + url, body,
        {
          headers: new Headers({}),
          withCredentials: true
        }
      ).map(res => res.json());
    }

    setCurrentHost(host){
      this.host=host;
    }
    getCurrentHost(){
      return this.host;
    }
    getDefaultHost(){
      return this.defaultHost;
    }
    getDefaultHostItems(){
      return [this.defaultHost,'http:\/\/lms.scn.cn']
    }


    //对象参数序列化
    serialize(paramObj){
      let keysArr = Object.keys(paramObj), res = '';
      for (let i = 0; i < keysArr.length; i++) {
        res += keysArr[i] + '=' + paramObj[keysArr[i]] + '&';
      }
      res = res.substring(0, (res.length - 1));
      return res;
    }

}

