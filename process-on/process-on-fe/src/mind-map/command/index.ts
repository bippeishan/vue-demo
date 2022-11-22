import MindMap from '..';
import { copyRenderTree, simpleDeepClone } from '../utils';

import { Opt } from './type';

class Command {
  mindMap: MindMap;

  commands: Record<string, ((...args: any) => void)[]>;

  history: any[];

  activeHistoryIndex: number;

  constructor(opt = {} as Opt) {
    this.mindMap = opt.mindMap;
    this.commands = {};
    this.history = [];
    this.activeHistoryIndex = 0;
  }

  add(name: string, fn: (...args: any) => void) {
    if (this.commands[name]) {
      this.commands[name].push(fn);
    } else {
      this.commands[name] = [fn];
    }
  }

  remove(name: string, fn: (...args: any) => void) {
    if (!this.commands[name]) {
      return;
    }
    if (!fn) {
      this.commands[name] = [];
      delete this.commands[name];
    } else {
      // TODO: 不确定这里有没有不相等的问题存在
      const index = this.commands[name].findIndex((item) => item === fn);
      if (index !== -1) {
        this.commands[name].splice(index, 1);
      }
    }
  }

  // 添加回退数据
  addHistory() {
    const data = this.getCopyData();
    this.history.push(simpleDeepClone(data));
    this.activeHistoryIndex = this.history.length - 1;
    this.mindMap.emit('data_change', data);
    this.mindMap.emit('back_forward', this.activeHistoryIndex, this.history.length);
  }

  // 执行命令
  exec(name: string, ...args: any) {
    if (this.commands[name]) {
      this.commands[name].forEach((fn) => {
        fn(...args);
      });
      if (name === 'BACK' || name === 'FORWARD') {
        return;
      }
      this.addHistory();
    }
  }

  getCopyData() {
    return copyRenderTree({}, this.mindMap.renderer.renderTree);
  }
}

export default Command;
