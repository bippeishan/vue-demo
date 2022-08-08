// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportFile from '../../../app/controller/file';

declare module 'egg' {
  interface IController {
    file: ExportFile;
  }
}
