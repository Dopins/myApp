export class HomeworkInfo
{
  name:string;
  sectionId:string;
  homeworkId:string;
  groupId:string;
  parentId:string;
  coolviewId:string;
  introduction:string;
  filename:string;
  chFilename:string;
  answer:string;
  answerName:string;
  startDate:string;
  endDate:string;
  constructor(name:string, sectionId:string, homeworkId:string,  groupId:string, parentId:string, coolviewId:string, introduction:string, filename:string, cnFilename:string, answer:string, answerName:string, startDate:string, endDate:string)
  {
    this.name = name;
    this.sectionId = sectionId;
    this.homeworkId = homeworkId;
    this.groupId = groupId;
    this.parentId = parentId;
    this.coolviewId = coolviewId;
    this.introduction = introduction;
    this.filename = filename;
    this.chFilename = cnFilename;
    this.answer = answer;
    this.answerName = answerName;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
