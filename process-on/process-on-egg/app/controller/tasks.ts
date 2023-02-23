import { Controller } from 'egg';

export default class TaskController extends Controller {
  public async index() {
    const { ctx } = this;
    const { query } = ctx;
    const { _timestamp, ...otherQuery } = query;

    ctx.body = await ctx.service.tasks.list(otherQuery);
  }

  async show() {
    const { ctx } = this;
    ctx.body = await ctx.service.tasks.show();
  }

  async create() {
    const { ctx } = this;
    const { name, description, type, assign, start_time, end_time } = ctx.request.body;

    ctx.body = await ctx.service.tasks.create({
      name,
      description,
      type,
      assign,
      start_time,
      end_time,
    });
  }

  async update() {
    const { ctx } = this;
    const { id, name, description, type, assign, start_time, end_time } = ctx.request.body;
    ctx.body = await ctx.service.tasks.update({
      id,
      name,
      description,
      type,
      assign,
      start_time,
      end_time,
    });
  }

  async destroy() {
    const { ctx } = this;
    const { params } = ctx;
    const { id } = params;
    ctx.body = await ctx.service.tasks.delete({ id });
  }
}
