import { Context } from 'koa';

class BaseController {
  ctx: Context;
  constructor(ctx: Context) {
    this.ctx = ctx;
  }
}

export = BaseController;
