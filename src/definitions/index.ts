import { HttpStatus } from '../constants';
import { Context } from 'koa';

export interface PrickingCtx extends Context {
  json(code: HttpStatus, msg: string, data: any): Promise<void>;
  success(data: any): Promise<void>;
  fail(msg?: string): Promise<void>;
}
