import MindMap from '..';
import { Opt } from './type';

class Drag {
  mindMap: MindMap;

  constructor(opt: Opt) {
    this.mindMap = opt.mindMap;

    this.bindFn();
    this.bindEvent();
  }

  handleNodeMousedown(e: any) {
    console.log('handleNodeMousedown:', e, this.mindMap);
  }

  handleMousemove(e: any) {
    console.log('handleMousemove:', e, this.mindMap);
  }

  handleNodeMouseup(e: any) {
    console.log('handleNodeMouseup:', e, this.mindMap);
  }

  bindFn() {
    this.handleNodeMousedown = this.handleNodeMousedown.bind(this);
    this.handleMousemove = this.handleMousemove.bind(this);
    this.handleNodeMouseup = this.handleNodeMouseup.bind(this);
  }

  bindEvent() {
    this.mindMap.on('node_mousedown', this.handleNodeMousedown);
    this.mindMap.on('mousemove', this.handleMousemove);
    this.mindMap.on('node_mouseup', this.handleNodeMouseup);
  }
}

export default Drag;
