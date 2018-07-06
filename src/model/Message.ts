export class Message
{
  messageId:string;
  content:string;
  creatorName:string;
  photo:string;
  createDate:string;
  expand:boolean;
  constructor(messageId:string, content:string, creatorName:string, photo:string, createDate:string, expand:boolean){
    this.messageId = messageId;
    this.content = content;
    this.creatorName = creatorName;
    this.photo = photo;
    this.createDate = createDate;
    this.expand = expand;
  }

}
