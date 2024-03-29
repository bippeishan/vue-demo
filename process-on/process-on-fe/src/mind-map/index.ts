import { G, Svg, SVG } from '@svgdotjs/svg.js';
import Command from './command';
import Event from './event';
import Render from './render';
import View from './view';

import { Opt } from './type';
import KeyCommand from './key-command';
import Drag from './drag';

const defaultOpt = {};

class MindMap {
  opt: Opt;

  el: HTMLElement;

  svg: Svg;

  draw: G;

  rect: DOMRect;

  renderer: Render;

  event: Event;

  keyCommand: KeyCommand;

  command: Command;

  view: View;

  drag: Drag;

  constructor(opt = {} as Opt) {
    this.opt = { ...defaultOpt, ...opt };
    this.el = this.opt.el;
    this.rect = this.el.getBoundingClientRect();
    this.svg = SVG().addTo(this.el).size(this.rect.width, this.rect.height);
    this.draw = this.svg.group();

    // 命令类
    this.command = new Command({
      mindMap: this,
    });
    // 按键类
    this.keyCommand = new KeyCommand({
      mindMap: this,
    });

    this.event = new Event({ mindMap: this });
    this.renderer = new Render({ mindMap: this });
    // 视图操作类
    this.view = new View({
      mindMap: this,
    });

    // 拖动类
    this.drag = new Drag({
      mindMap: this,
    });
  }

  on(event: string, fn: (...args: any[]) => void) {
    this.event.on(event, fn);
  }

  emit(event: string, ...args: any[]) {
    this.event.emit(event, ...args);
  }

  off(event: string, fn: (...args: any[]) => void) {
    this.event.off(event, fn);
  }

  execCommand(...args: any) {
    this.command.exec(args[0], ...args.slice(1));
  }

  render() {
    this.renderer.reRender = false;
    this.renderer.render();
  }
}

export default MindMap;
