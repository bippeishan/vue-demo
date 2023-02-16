import { Controller } from 'egg';

export default class UserController extends Controller {
  public async index() {
    const { ctx } = this;
    const { query } = ctx;
    const { _timestamp, ...otherQuery } = query;

    ctx.body = await ctx.service.users.list(otherQuery);
  }

  async show() {
    const { ctx } = this;
    ctx.body = await ctx.service.users.show();
  }

  async create() {
    const { ctx } = this;
    const { name, user_name, email, position } = ctx.request.body;

    ctx.body = await ctx.service.users.create({ name, user_name, email, position });
  }

  async update() {
    const { ctx } = this;
    const { id, name, user_name, email, position } = ctx.request.body;
    ctx.body = await ctx.service.users.update({ id, name, user_name, email, position });
  }

  async destroy() {
    const { ctx } = this;
    const { params } = ctx;
    const { id } = params;
    ctx.body = await ctx.service.users.delete({ id });
  }
}
