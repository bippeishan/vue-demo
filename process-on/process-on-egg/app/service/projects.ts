import { Service } from 'egg';

export interface ShowParams {
  id?: number;
}

export interface CreateParams {
  name: string;
}

export interface UpdateParams {
  id: number;
  name: string;
}

export interface DeleteParams {
  id: string;
}

export default class Project extends Service {
  async list(params: ShowParams) {
    const infos = await this.app.mysql.select('projects', { where: params });
    return infos;
  }

  async show() {
    const info = await this.app.mysql.get('projects');
    // console.log('fileInfo:', info);
    return info;
  }

  async create(params: CreateParams) {
    const { name } = params;

    const result = await this.app.mysql.insert('projects', { name });
    console.log('create-result:', result);
    return true;
  }

  async update(params: UpdateParams) {
    const { id, name } = params;
    const rows: any = {};

    if (name) {
      rows.name = name;
    }

    const result = await this.app.mysql.update('projects', rows, { where: { id } });
    return result.affectedRows === 1;
  }

  async delete(params: DeleteParams) {
    const result = await this.app.mysql.delete('projects', {
      id: params.id,
    });
    console.log('delete-result:', result);
    return true;
  }
}
