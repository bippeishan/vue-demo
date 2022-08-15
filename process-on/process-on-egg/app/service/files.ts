import { Service } from 'egg';

export interface ShowParams {
  id?: string;
  parent_id?: string;
}

export interface CreateParams {}

export interface UpdateParams {}

export interface DeleteParams {}

export default class File extends Service {
  async list(params: ShowParams) {
    // console.log('params:', params);
    const fileInfos = await this.app.mysql.select('files', { where: params });
    console.log('fileInfos:', fileInfos);
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
    return '';
  }

  async delete(params: DeleteParams) {
    console.log('delete:', params);
    return '';
  }
}
