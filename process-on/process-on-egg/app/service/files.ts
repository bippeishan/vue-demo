import { Service } from 'egg';

export interface ShowParams {
  id?: string;
  parent_id?: string;
}

export interface CreateParams {
  name: string;
  parent_id: string;
  type: string;
  file_content?: string;
}

export interface UpdateParams {
  file_content: string;
  id: string;
  name: string;
}

export interface DeleteParams {
  id: string;
}

export default class File extends Service {
  async list(params: ShowParams) {
    const fileInfos = await this.app.mysql.select('files', { where: params });
    return fileInfos;
  }

  async show() {
    const fileInfo = await this.app.mysql.get('files');
    console.log('fileInfo:', fileInfo);
    return fileInfo;
  }

  async create(params: CreateParams) {
    const { name, parent_id, type, file_content } = params;

    const result = await this.app.mysql.insert('files', { name, parent_id, type, file_content });
    console.log('create-result:', result);
    return true;
  }

  async update(params: UpdateParams) {
    const { file_content, id, name } = params;

    const rows: any = {};
    if (file_content) {
      rows.file_content = file_content;
    }
    if (name) {
      rows.name = name;
    }

    const result = await this.app.mysql.update('files', rows, { where: { id } });
    return result.affectedRows === 1;
  }

  async delete(params: DeleteParams) {
    const result = await this.app.mysql.delete('files', {
      id: params.id,
    });
    console.log('delete-result:', result);
    return true;
  }
}
