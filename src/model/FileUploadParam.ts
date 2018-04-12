export class FileUploadParam
{
  coolviewId:string;
  groupId:string;
  parentId:string;

  constructor(coolviewId:string, groupId:string, parentId:string)
 {
    this.coolviewId = coolviewId;
    this.groupId = groupId;
    this.parentId = parentId;
 }

}
