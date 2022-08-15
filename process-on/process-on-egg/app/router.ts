import { Application } from 'egg';

export default (app: Application) => {
  app.router.resources('files', '/api/files', 'files');
};
