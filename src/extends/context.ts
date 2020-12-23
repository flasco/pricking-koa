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
    this.msg = msg || '';
    this.code = code || HttpStatus.Ok;
    this.success = code === HttpStatus.Ok;
    this.extra = extra;
  }
}

export = {
  json(code = HttpStatus.Ok, msg = '', data: any) {
    this.set('Content-Type', 'application/json');
    this.body = new Message({ code, msg, data });
  },

  success(data: any) {
    this.set('Content-Type', 'application/json');
    this.body = new Message({ code: HttpStatus.Ok, data });
  },

  fail(msg = '请求失败') {
    this.set('Content-Type', 'application/json');
    this.body = new Message({ code: HttpStatus.Fail, msg });
  },
};
