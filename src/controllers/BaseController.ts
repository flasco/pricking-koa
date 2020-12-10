import { PrickingCtx } from '../definitions';
import Validator from '../lib/validator';

class BaseController<T extends PrickingCtx = PrickingCtx> {
  ctx: T;
  validator = new Validator();

  constructor(ctx: T) {
    this.ctx = ctx;
  }
}

export = BaseController;
