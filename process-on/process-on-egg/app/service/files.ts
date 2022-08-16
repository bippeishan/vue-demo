import { Service } from 'egg';

export interface ShowParams {
  id?: string;
  parent_id?: string;
}

export interface CreateParams {}

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
    console.log('create:', params);
    return '';
  }

  async update(params: UpdateParams) {
    console.log('update:', params);
    const result = await this.app.mysql.update(
      'files',
      { file_content: params.file_content },
      { where: { id: params.id } },
    );
    return result.affectedRows === 1;
  }

  async delete(params: DeleteParams) {
    console.log('delete:', params);
    return '';
  }
}
