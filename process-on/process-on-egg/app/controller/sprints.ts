import { Controller } from 'egg';

export default class SprintController extends Controller {
  public async index() {
    const { ctx } = this;
    const { query } = ctx;
    const { _timestamp, ...otherQuery } = query;

    ctx.body = await ctx.service.sprints.list(otherQuery);
  }

  async show() {
    const { ctx } = this;
    ctx.body = await ctx.service.sprints.show();
  }

  async create() {
    const { ctx } = this;
    const { name, state, start_time, end_time } = ctx.request.body;

    ctx.body = await ctx.service.sprints.create({ name, state, start_time, end_time });
  }

  async update() {
    const { ctx } = this;
    const { id, name, state, start_time, end_time } = ctx.request.body;
    ctx.body = await ctx.service.sprints.update({ id, name, state, start_time, end_time });
  }

  async destroy() {
    const { ctx } = this;
    const { params } = ctx;
    const { id } = params;
    ctx.body = await ctx.service.sprints.delete({ id });
  }
}
