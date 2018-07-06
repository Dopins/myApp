export class Discuss {
  id:string;
  creatorId:string;
  creatorName:string;
  createDate:string;
  content:string;
  photo:string;
  unitId:string;
  unitName:string;
  upvoteCount:number;
  replyCount:number;
  expand:boolean;

  constructor(id:string,creatorId:string, creatorName:string, createDate:string, content:string, photo:string, unitId:string, unitName:string, upvote:number, reply:number,expand:boolean){
    this.id = id;
    this.creatorId = creatorId;
    this.creatorName = creatorName;
    this.createDate = createDate;
    this.content = content;
    this.photo = photo;
    this.unitId = unitId;
    this.unitName = unitName;
    this.upvoteCount = upvote;
    this.replyCount = reply;
    this.expand = expand;
  }
}
