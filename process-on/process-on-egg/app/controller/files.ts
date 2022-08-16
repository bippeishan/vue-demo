import { Controller } from 'egg';

export default class FileController extends Controller {
  public async index() {
    const { ctx } = this;
    const { query } = ctx;
    const { _timestamp, ...otherQuery } = query;

    ctx.body = await ctx.service.files.list(otherQuery);
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
    const { query } = ctx;
    console.log('query:', query);
    const { file_content, id } = query;
    ctx.body = await ctx.service.files.update({ file_content, id });
  }

  async delete() {
    const { ctx } = this;
    ctx.body = await ctx.service.files.delete({});
  }
}
