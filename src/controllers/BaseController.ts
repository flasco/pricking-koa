import { PrickingCtx } from '../definitions';

class BaseController<T extends PrickingCtx = PrickingCtx> {
  ctx: T;
  constructor(ctx: T) {
    this.ctx = ctx;
  }
}

export = BaseController;
