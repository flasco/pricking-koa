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
    this.data = data || null;
    this.msg = msg || '';
    this.code = code || HttpStatus.Ok;
    this.success = code == HttpStatus.Ok;
    this.extra = extra || null;
  }
}

export = () => {
  function renderJson(code = HttpStatus.Ok, msg = '', data = null) {
    this.set('Content-Type', 'application/json');
    this.body = new Message({ code, msg, data });
  }

  function renderSuccess(data = null) {
    this.set('Content-Type', 'application/json');
    this.body = new Message({ code: HttpStatus.Ok, data });
  }

  function rednerFail(msg = '请求失败') {
    this.set('Content-Type', 'application/json');
    this.body = new Message({ code: HttpStatus.Fail, msg });
  }

  return async (ctx, next) => {
    ctx.json = renderJson.bind(ctx);
    ctx.success = renderSuccess.bind(ctx);
    ctx.fail = rednerFail.bind(ctx);
    await next();
  };
};
