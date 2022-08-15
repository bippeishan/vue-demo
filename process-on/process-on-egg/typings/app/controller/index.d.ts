// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportFiles from '../../../app/controller/files';

declare module 'egg' {
  interface IController {
    files: ExportFiles;
  }
}
