import EventEmitter from 'eventemitter3';
import MindMap from '..';

import { MousePos, Opt } from './type';

class Event extends EventEmitter {
  mindMap: MindMap;

  isLeftMousedown: boolean;

  mousedownPos: MousePos;

  mousemovePos: MousePos;

  mousemoveOffset: MousePos;

  constructor(opt = {} as Opt) {
    super();
    this.mindMap = opt.mindMap;
    this.isLeftMousedown = false;
    this.mousedownPos = { x: 0, y: 0 };
    this.mousemovePos = { x: 0, y: 0 };
    this.mousemoveOffset = { x: 0, y: 0 };

    this.bindFn();
    this.bind();
  }

  bindFn() {
    this.onDrawClick = this.onDrawClick.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMousemove = this.handleMousemove.bind(this);
    this.handleMouseup = this.handleMouseup.bind(this);
  }

  bind() {
    this.mindMap.svg.on('click', this.onDrawClick);
    this.mindMap.el.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mousemove', this.handleMousemove);
    window.addEventListener('mouseup', this.handleMouseup);
  }

  unbind() {
    this.mindMap.svg.off('click', this.onDrawClick);
    this.mindMap.el.removeEventListener('mousedown', this.handleMouseDown);
    window.removeEventListener('mousemove', this.handleMousemove);
    window.removeEventListener('mouseup', this.handleMouseup);
  }

  // 画布的单击事件
  onDrawClick(e: any) {
    // console.log('画布的单击事件');
    this.emit('draw_click', e);
  }

  handleMouseDown(e: MouseEvent) {
    // 鼠标左键
    if (e.button === 0) {
      this.isLeftMousedown = true;
    }
    this.mousedownPos.x = e.clientX;
    this.mousedownPos.y = e.clientY;
    this.emit('mousedown', e, this);
  }

  handleMousemove(e: MouseEvent) {
    this.mousemovePos.x = e.clientX;
    this.mousemovePos.y = e.clientY;
    this.mousemoveOffset.x = e.clientX - this.mousedownPos.x;
    this.mousemoveOffset.y = e.clientY - this.mousedownPos.y;
    this.emit('mousemove', e, this);

    if (this.isLeftMousedown) {
      this.emit('drag', e, this);
    }
  }

  handleMouseup(e: MouseEvent) {
    this.isLeftMousedown = false;
    this.emit('mouseup', e, this);
  }
}

export default Event;
