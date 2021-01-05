import { HttpStatus } from '../constants';

interface IMessage {
  data?: Record<string, any>;
  msg?: string;
  code: HttpStatus;
  /** 额外的错误信息 */
  extra?: Record<string, any>;
}

class Message {
  data: Record<string, any>;
  msg: string;
  code: HttpStatus;
  success: boolean;
  /** 额外的错误信息 */
  extra?: Record<string, any>;
  constructor({ code, msg, data, extra }: IMessage) {
    this.data = data;
    this.msg = msg;
    this.code = code;
    this.success = code === HttpStatus.Ok;
    this.extra = extra;
  }
}

function json(code: HttpStatus, msg: string, data?: any) {
  this.set('Content-Type', 'application/json');
  this.body = new Message({ code, msg, data });
}

export = {
  json,
  success(data: any) {
    return json.call(this, HttpStatus.Ok, '', data);
  },
  fail(msg = '请求失败') {
    return json.call(this, HttpStatus.Fail, msg);
  },
};
