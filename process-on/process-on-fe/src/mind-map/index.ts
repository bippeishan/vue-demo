import { G, Svg, SVG } from '@svgdotjs/svg.js';
import Command from './command';
import Event from './event';
import Render from './render';
import View from './view';

import { Opt } from './type';

const defaultOpt = {};

class MindMap {
  opt: Opt;

  el: HTMLElement;

  svg: Svg;

  draw: G;

  rect: DOMRect;

  renderer: Render;

  event: Event;

  command: Command;

  view: View;

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
    this.event = new Event({ mindMap: this });
    this.renderer = new Render({ mindMap: this });
    // 视图操作类
    this.view = new View({
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
}

export default MindMap;
