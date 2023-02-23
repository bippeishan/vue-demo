import { Service } from 'egg';

export interface ShowParams {
  id?: number;
}

export interface CreateParams {
  name: string;
  state: 'TODO' | 'DOING' | 'DONE';
  start_time: number;
  end_time: number;
}

export interface UpdateParams {
  id: number;
  name: string;
  state: 'TODO' | 'DOING' | 'DONE';
  start_time: number;
  end_time: number;
}

export interface DeleteParams {
  id: string;
}

export default class Sprints extends Service {
  async list(params: ShowParams) {
    const infos = await this.app.mysql.select('sprints', { where: params });
    return infos;
  }

  async show() {
    const info = await this.app.mysql.get('sprints');
    // console.log('fileInfo:', info);
    return info;
  }

  async create(params: CreateParams) {
    const { name, state, start_time, end_time } = params;
    const create_time = new Date().getTime();

    const result = await this.app.mysql.insert('sprints', {
      name,
      state,
      start_time,
      end_time,
      create_time,
    });
    console.log('create-result:', result);
    return true;
  }

  async update(params: UpdateParams) {
    const { id, name, state, start_time, end_time } = params;
    const rows: any = {};

    if (name) {
      rows.name = name;
    }
    if (state) {
      rows.state = state;
    }
    if (start_time) {
      rows.start_time = start_time;
    }
    if (end_time) {
      rows.end_time = end_time;
    }

    const result = await this.app.mysql.update('sprints', rows, { where: { id } });
    return result.affectedRows === 1;
  }

  async delete(params: DeleteParams) {
    const result = await this.app.mysql.delete('sprints', {
      id: params.id,
    });
    console.log('delete-result:', result);
    return true;
  }
}
