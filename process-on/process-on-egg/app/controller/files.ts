import { Controller } from 'egg';

export default class FileController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.files.list();
  }

  async show() {
    const { ctx } = this;
    ctx.body = await ctx.service.files.show();
  }

  async create() {
    const { ctx } = this;
    ctx.body = await ctx.service.files.create({});
  }

  async update() {
    const { ctx } = this;
    ctx.body = await ctx.service.files.update({});
  }

  async delete() {
    const { ctx } = this;
    ctx.body = await ctx.service.files.delete({});
  }
}
