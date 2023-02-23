import { Controller } from 'egg';

export default class BugController extends Controller {
  public async index() {
    const { ctx } = this;
    const { query } = ctx;
    const { _timestamp, ...otherQuery } = query;

    ctx.body = await ctx.service.bugs.list(otherQuery);
  }

  async show() {
    const { ctx } = this;
    ctx.body = await ctx.service.bugs.show();
  }

  async create() {
    const { ctx } = this;
    const { name, priority, state, creator, assign } = ctx.request.body;

    ctx.body = await ctx.service.bugs.create({
      name,
      priority,
      state,
      creator,
      assign,
    });
  }

  async update() {
    const { ctx } = this;
    const { id, name, priority, state, creator, assign } = ctx.request.body;
    ctx.body = await ctx.service.bugs.update({
      id,
      name,
      priority,
      state,
      creator,
      assign,
    });
  }

  async destroy() {
    const { ctx } = this;
    const { params } = ctx;
    const { id } = params;
    ctx.body = await ctx.service.bugs.delete({ id });
  }
}
