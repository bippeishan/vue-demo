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
    const { name, parent_id, type, file_content } = ctx.request.body;

    ctx.body = await ctx.service.files.create({ name, parent_id, type, file_content });
  }

  async update() {
    const { ctx } = this;
    const { file_content, id } = ctx.request.body;
    ctx.body = await ctx.service.files.update({ file_content, id });
  }

  async destroy() {
    const { ctx } = this;
    const { params } = ctx;
    const { id } = params;
    ctx.body = await ctx.service.files.delete({ id });
  }
}
