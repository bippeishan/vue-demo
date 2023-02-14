// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportFiles from '../../../app/controller/files';
import ExportProjects from '../../../app/controller/projects';

declare module 'egg' {
  interface IController {
    files: ExportFiles;
    projects: ExportProjects;
  }
}
