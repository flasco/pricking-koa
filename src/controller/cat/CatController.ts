import { Controller, Get } from '@app/utils/decorator';
import BaseController from '../BaseController';

@Controller()
class CatController extends BaseController {
  @Get('/say')
  say() {
    this.ctx.body = 'hello';
  }
}

export = CatController;
