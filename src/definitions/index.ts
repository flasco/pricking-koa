import { HttpStatus } from '../constants';
import { Context, Request } from 'koa';

interface IReq extends Request {
  body: any;
}
export interface PrickingCtx extends Context {
  json(code: HttpStatus, msg: string, data: any): Promise<void>;
  success(data: any): Promise<void>;
  fail(msg?: string): Promise<void>;
  request: IReq;
}
