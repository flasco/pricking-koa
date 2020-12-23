import { Controller, Description, Get } from '../../src';
import BaseController from '../../src/controllers/BaseController';

@Controller('/test')
class TestController extends BaseController {
  @Get('say-hello')
  @Description('测试，say hello~')
  sayHello() {
    this.ctx.hello();
    this.ctx.success('asdasd');
  }
}

export = TestController;
