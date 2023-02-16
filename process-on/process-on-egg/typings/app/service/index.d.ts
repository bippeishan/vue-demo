// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportFiles from '../../../app/service/files';
import ExportProjects from '../../../app/service/projects';
import ExportUsers from '../../../app/service/users';

declare module 'egg' {
  interface IService {
    files: AutoInstanceType<typeof ExportFiles>;
    projects: AutoInstanceType<typeof ExportProjects>;
    users: AutoInstanceType<typeof ExportUsers>;
  }
}
