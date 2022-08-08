import { Controller } from 'egg';

export default class FileController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.file.files();
  }
}
