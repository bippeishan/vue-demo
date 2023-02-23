import { Service } from 'egg';

export interface ShowParams {
  id?: number;
}

export interface CreateParams {
  name: string;
  description: string;
  type: 'TODO' | 'DOING' | 'DONE';
  assign: number;
  start_time: number;
  end_time: number;
}

export interface UpdateParams {
  id: number;
  name: string;
  description: string;
  type: 'TODO' | 'DOING' | 'DONE';
  assign: number;
  start_time: number;
  end_time: number;
}

export interface DeleteParams {
  id: string;
}

export default class Tasks extends Service {
  async list(params: ShowParams) {
    const infos = await this.app.mysql.select('tasks', { where: params });
    return infos;
  }

  async show() {
    const info = await this.app.mysql.get('tasks');
    // console.log('fileInfo:', info);
    return info;
  }

  async create(params: CreateParams) {
    const { name, description, type, assign, start_time, end_time } = params;
    const create_time = new Date().getTime();

    const result = await this.app.mysql.insert('tasks', {
      name,
      description,
      type,
      assign,
      start_time,
      end_time,
      create_time,
    });
    console.log('create-result:', result);
    return true;
  }

  async update(params: UpdateParams) {
    const { id, name, description, type, assign, start_time, end_time } = params;
    const rows: any = {};

    if (name) {
      rows.name = name;
    }
    if (description) {
      rows.description = description;
    }
    if (type) {
      rows.type = type;
    }
    if (assign) {
      rows.assign = assign;
    }
    if (start_time) {
      rows.start_time = start_time;
    }
    if (end_time) {
      rows.end_time = end_time;
    }

    const result = await this.app.mysql.update('tasks', rows, { where: { id } });
    return result.affectedRows === 1;
  }

  async delete(params: DeleteParams) {
    const result = await this.app.mysql.delete('tasks', {
      id: params.id,
    });
    console.log('delete-result:', result);
    return true;
  }
}
