import { Application } from 'egg';

export default (app: Application) => {
  app.router.resources('files', '/api/files', 'files');
  app.router.resources('projects', '/api/projects', 'projects');
  app.router.resources('users', '/api/users', 'users');
  app.router.resources('sprints', '/api/sprints', 'sprints');
  app.router.resources('tasks', '/api/tasks', 'tasks');
  app.router.resources('bugs', '/api/bugs', 'bugs');
};
