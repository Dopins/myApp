import { Option } from "./Option";

export class Quiz {
  sectionId:string;
  quizId:string;
  quizTitle:string;
  orderId:string;
  options:Option[];
  constructor(sectionId:string, quizId:string, quizTitle:string, orderId:string, options:Option[]){
    this.sectionId = sectionId;
    this.quizId = quizId;
    this.quizTitle = quizTitle;
    this.orderId = orderId;
    this.options = options;
  }
}
