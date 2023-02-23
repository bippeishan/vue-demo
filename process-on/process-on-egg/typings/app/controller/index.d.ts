// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBugs from '../../../app/controller/bugs';
import ExportFiles from '../../../app/controller/files';
import ExportProjects from '../../../app/controller/projects';
import ExportSprints from '../../../app/controller/sprints';
import ExportTasks from '../../../app/controller/tasks';
import ExportUsers from '../../../app/controller/users';

declare module 'egg' {
  interface IController {
    bugs: ExportBugs;
    files: ExportFiles;
    projects: ExportProjects;
    sprints: ExportSprints;
    tasks: ExportTasks;
    users: ExportUsers;
  }
}
