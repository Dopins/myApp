export class CourseInfo {
  courseId: string;
  name: string;
  filename: string;
  textbook: string;
  credit:number;
  classHour:number;
  introduction:string;
  isOpen:string;
  startDate:string;
  endDate:string;
  type:string;
  department:string;
  constructor(id:string, name:string, filename:string, textbook:string, credit:number, classHour:number, introduction:string, isOpen:string, startDare:string, endDate:string, type:string, department:string){
    this.courseId = id;
    this.name = name;
    this.filename = filename;
    this.textbook = textbook;
    this.credit = credit;
    this.classHour = classHour;
    this.introduction = introduction;
    this.isOpen = isOpen;
    this.startDate = startDare;
    this.endDate = endDate;
    this.type = type;
    this.department = department;
  }

}
