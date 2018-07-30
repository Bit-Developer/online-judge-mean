export class AlertMessage {
  constructor(public type: string, public text: string) {}
}

export interface AlertMessageList extends Array<AlertMessage> {}

/*
export class ResponseResult {
  constructor(public status: number, public message: string) {}
}*/

/*
export interface ValidationError {
  location: string;
  param: string;
  value: string;
  msg: string;
}*/
