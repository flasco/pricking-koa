import { Controller, Description, Get, Index } from '../../src';
import BaseController from '../../src/controllers/BaseController';

@Controller('/test')
class TestController extends BaseController {
  @Index(['say-hello', '', '(.*)'])
  @Description('测试，say hello~')
  helloHomePage() {
    this.ctx.hello();
    this.ctx.success('asdasd');
  }

  @Get('say-hello')
  @Description('测试，say hello~')
  sayHello() {
    this.ctx.hello();
    this.ctx.success('qweqwe');
  }
}

export = TestController;
