import MindMap from '..';
import { Opt } from './type';
import { checkKey } from './utils';

class KeyCommand {
  mindMap: MindMap;

  shortcutMap: Record<string, (() => void)[]>;

  constructor(opt = {} as Opt) {
    this.mindMap = opt.mindMap;

    this.shortcutMap = {};

    this.bindEvent();
  }

  // 绑定事件
  bindEvent() {
    window.addEventListener('keydown', (e) => {
      Object.keys(this.shortcutMap).forEach((key) => {
        if (checkKey(e, key)) {
          e.stopPropagation();
          e.preventDefault();
          this.shortcutMap[key].forEach((fn) => {
            fn();
          });
        }
      });
    });
  }

  // 添加快捷键命令
  addShortcut(key: string, fn: () => void) {
    key.split(/\s*\|\s*/).forEach((item) => {
      if (this.shortcutMap[item]) {
        this.shortcutMap[item].push(fn);
      } else {
        this.shortcutMap[item] = [fn];
      }
    });
  }

  // 移除快捷键命令
  removeShortcut(key: string, fn?: () => void) {
    key.split(/\s*\|\s*/).forEach((item) => {
      if (this.shortcutMap[item]) {
        if (fn) {
          // TODO: 不确定有没有不相等的问题
          const index = this.shortcutMap[item].findIndex((f) => f === fn);
          if (index !== -1) {
            this.shortcutMap[item].splice(index, 1);
          }
        } else {
          this.shortcutMap[item] = [];
          delete this.shortcutMap[item];
        }
      }
    });
  }
}

export default KeyCommand;
