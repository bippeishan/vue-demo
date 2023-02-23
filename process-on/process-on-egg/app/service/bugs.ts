import { Service } from 'egg';

export interface ShowParams {
  id?: number;
}

export interface CreateParams {
  name: string;
  priority: number;
  state: 'TODO' | 'DOING' | 'DONE';
  creator: number;
  assign: number;
}

export interface UpdateParams {
  id: number;
  name: string;
  priority: number;
  state: 'TODO' | 'DOING' | 'DONE';
  creator: number;
  assign: number;
}

export interface DeleteParams {
  id: string;
}

export default class Bugs extends Service {
  async list(params: ShowParams) {
    const infos = await this.app.mysql.select('bugs', { where: params });
    return infos;
  }

  async show() {
    const info = await this.app.mysql.get('bugs');
    // console.log('fileInfo:', info);
    return info;
  }

  async create(params: CreateParams) {
    const { name, priority, state, creator, assign } = params;

    const result = await this.app.mysql.insert('bugs', {
      name,
      priority,
      state,
      creator,
      assign,
    });
    console.log('create-result:', result);
    return true;
  }

  async update(params: UpdateParams) {
    const { id, name, priority, state, creator, assign } = params;
    const rows: any = {};

    if (name) {
      rows.name = name;
    }
    if (priority) {
      rows.priority = priority;
    }
    if (state) {
      rows.state = state;
    }
    if (creator) {
      rows.creator = creator;
    }
    if (assign) {
      rows.assign = assign;
    }

    const result = await this.app.mysql.update('bugs', rows, { where: { id } });
    return result.affectedRows === 1;
  }

  async delete(params: DeleteParams) {
    const result = await this.app.mysql.delete('bugs', {
      id: params.id,
    });
    console.log('delete-result:', result);
    return true;
  }
}
