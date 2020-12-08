import { PrickingCtx } from '../definitions';

class BaseController {
  ctx: PrickingCtx;
  constructor(ctx: PrickingCtx) {
    this.ctx = ctx;
  }
}

export = BaseController;
