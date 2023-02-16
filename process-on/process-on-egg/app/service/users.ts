import { Service } from 'egg';

export interface ShowParams {
  id?: number;
}

export interface CreateParams {
  name: string;
  user_name: string;
  email: string;
  position: string;
}

export interface UpdateParams {
  id: number;
  name: string;
  user_name: string;
  email: string;
  position: string;
}

export interface DeleteParams {
  id: string;
}

export default class User extends Service {
  async list(params: ShowParams) {
    const infos = await this.app.mysql.select('users', { where: params });
    return infos;
  }

  async show() {
    const info = await this.app.mysql.get('users');
    // console.log('fileInfo:', info);
    return info;
  }

  async create(params: CreateParams) {
    const { name, user_name, email, position } = params;

    const result = await this.app.mysql.insert('users', { name, user_name, email, position });
    console.log('create-result:', result);
    return true;
  }

  async update(params: UpdateParams) {
    const { id, name, user_name, email, position } = params;
    const rows: any = {};

    if (name) {
      rows.name = name;
    }
    if (user_name) {
      rows.user_name = user_name;
    }
    if (email) {
      rows.email = email;
    }
    if (position) {
      rows.position = position;
    }

    const result = await this.app.mysql.update('users', rows, { where: { id } });
    return result.affectedRows === 1;
  }

  async delete(params: DeleteParams) {
    const result = await this.app.mysql.delete('users', {
      id: params.id,
    });
    console.log('delete-result:', result);
    return true;
  }
}
