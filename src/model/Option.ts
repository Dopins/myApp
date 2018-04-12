export class Option
{
  optionId:string;
  optionTitle:string;
  answer:boolean;
  constructor(optionId:string, optionTitle:string, answer:boolean){
    this.optionId = optionId;
    this.optionTitle = optionTitle;
    this.answer = answer;
  }

}
