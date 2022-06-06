import EventEmitter from 'eventemitter3';
import MindMap from '..';

import { Opt } from './type';

class Event extends EventEmitter {
  mindMap: MindMap;

  scale: number;

  sx: number;

  sy: number;

  x: number;

  y: number;

  firstDrag: boolean;

  constructor(opt = {} as Opt) {
    super();
    this.mindMap = opt.mindMap;
    this.scale = 1;
    this.sx = 0;
    this.sy = 0;
    this.x = 0;
    this.y = 0;
    this.firstDrag = true;

    this.bind();
  }

  bind() {
    // 拖动视图
    this.mindMap.event.on('mousedown', () => {
      this.sx = this.x;
      this.sy = this.y;
    });
    this.mindMap.event.on('drag', (e, event) => {
      if (this.firstDrag) {
        this.firstDrag = false;
        // 清除激活节点
        // this.mindMap.execCommand('CLEAR_ACTIVE_NODE');
      }
      this.x = this.sx + event.mousemoveOffset.x;
      this.y = this.sy + event.mousemoveOffset.y;

      this.transform();
    });
    this.mindMap.event.on('mouseup', () => {
      this.firstDrag = true;
    });
  }

  transform() {
    this.mindMap.draw.transform({
      scale: this.scale,
      translate: [this.x, this.y],
    });
  }
}

export default Event;
