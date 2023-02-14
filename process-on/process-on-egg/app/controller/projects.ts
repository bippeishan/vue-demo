import { Controller } from 'egg';

export default class ProjectController extends Controller {
  public async index() {
    const { ctx } = this;
    const { query } = ctx;
    const { _timestamp, ...otherQuery } = query;

    ctx.body = await ctx.service.projects.list(otherQuery);
  }

  async show() {
    const { ctx } = this;
    ctx.body = await ctx.service.projects.show();
  }

  async create() {
    const { ctx } = this;
    const { name } = ctx.request.body;

    ctx.body = await ctx.service.projects.create({ name });
  }

  async update() {
    const { ctx } = this;
    const { id, name } = ctx.request.body;
    ctx.body = await ctx.service.projects.update({ id, name });
  }

  async destroy() {
    const { ctx } = this;
    const { params } = ctx;
    const { id } = params;
    ctx.body = await ctx.service.projects.delete({ id });
  }
}
