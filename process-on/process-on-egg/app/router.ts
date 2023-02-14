import { Application } from 'egg';

export default (app: Application) => {
  app.router.resources('files', '/api/files', 'files');
  app.router.resources('projects', '/api/projects', 'projects');
};
