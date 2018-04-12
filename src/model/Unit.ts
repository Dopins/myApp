export class Unit
{
  unitId:string;
  sectionId:string;
  groupId:string;
  parentId:string;
  coolviewId:string;
  startDate:string;
  endDate:string;
  orderId:number;
  name:string;
  introduction:string;
  reference:string;
  referenceFile:string;
  syllabus:string;
  syllabusFile:string;
  slides:string;
  slidesFile:string;
  slidesType:string;

  constructor(unitId:string, sectionId:string, groupId:string, parentId:string, coolviewId:string, startDate:string, endDate:string, orderId:number, name:string, introduction:string,
  reference:string, referenceFile:string, syllabus:string, syllabusFile:string, slides:string, slidesFile:string, slidesType:string )
  {
    this.unitId = unitId;
    this.sectionId = sectionId;
    this.groupId = groupId;
    this.parentId = parentId;
    this.coolviewId = coolviewId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.orderId = orderId;
    this.name = name;
    this.introduction = introduction;
    this.reference = reference;
    this.referenceFile = referenceFile;
    this.syllabus = syllabus;
    this.syllabusFile = syllabusFile;
    this.slides = slides;
    this.slidesFile = slidesFile;
    this.slidesType = slidesType;
  }
}
