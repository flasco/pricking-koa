import { HttpStatus } from '../constants';
import { Context } from 'koa';

export interface PrickingCtx extends Context {
  json(code: HttpStatus, msg: string, data: Record<string, any>): Promise<void>;
  success(data: Record<string, any>): Promise<void>;
  fail(msg?: string): Promise<void>;
}
