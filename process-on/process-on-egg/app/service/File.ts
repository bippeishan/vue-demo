import { Service } from 'egg';

export default class File extends Service {
  async files() {
    const fileInfos = await this.app.mysql.get('file', {});
    console.log('fileInfos:', fileInfos);
    return fileInfos;
  }
}
