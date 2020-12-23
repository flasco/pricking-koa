import { PrickingCtx } from '../definitions';
import { IOptions } from '../definitions/application';
import Validator from '../lib/validator';

class BaseController<T extends PrickingCtx = PrickingCtx> {
  ctx: T;
  options: IOptions;
  validator = new Validator();

  constructor(ctx: T, options: IOptions) {
    this.ctx = ctx;
    this.options = options;
  }
}

export = BaseController;
