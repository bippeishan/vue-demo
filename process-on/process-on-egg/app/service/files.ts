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
}

export interface DeleteParams {}

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
    console.log('update:', params);
    const { file_content, id } = params;

    const result = await this.app.mysql.update('files', { file_content }, { where: { id } });
    return result.affectedRows === 1;
  }

  async delete(params: DeleteParams) {
    console.log('delete:', params);
    return '';
  }
}
