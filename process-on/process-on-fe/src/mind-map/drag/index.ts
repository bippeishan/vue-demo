import { G } from '@svgdotjs/svg.js';
import { throttle } from 'lodash';
import MindMap from '..';
import { Opt } from './type';
import Node from '../node';

class Drag {
  mindMap: MindMap;

  node?: Node;

  clone?: G;

  isMousedown: boolean;

  mouseDownX: number;

  mouseDownY: number;

  mouseMoveX: number;

  mouseMoveY: number;

  constructor(opt: Opt) {
    this.mindMap = opt.mindMap;
    this.isMousedown = false;
    this.mouseDownX = 0;
    this.mouseDownY = 0;
    this.mouseMoveX = 0;
    this.mouseMoveY = 0;

    this.bindFn();
    this.bindEvent();
  }

  // 创建克隆节点
  createCloneNode() {
    if (!this.clone && this.node) {
      this.clone = this.node.group?.clone();
      this.clone?.opacity(0.5);
      this.clone?.css('zIndex', '99999');
      this.node.isDrag = true;

      if (this.clone) {
        this.mindMap.draw.add(this.clone);
      }
    }
  }

  // 检测重叠节点
  checkOverlapNode() {
    console.log('检测重叠节点:', this.clone);
  }

  handleNodeMousedown(node: Node, e: any) {
    if (e.which !== 1 || node.isRoot) {
      return;
    }
    e.preventDefault();

    this.node = node;
    this.isMousedown = true;
    this.mouseDownX = e.clientX;
    this.mouseDownY = e.clientY;
  }

  handleMousemove(e: any) {
    // console.log('handleMousemove:', e, this.mindMap);
    if (!this.isMousedown) {
      return;
    }
    e.preventDefault();

    this.mouseMoveX = e.clientX;
    this.mouseMoveY = e.clientY;

    if (Math.abs(e.clientX - this.mouseDownX) <= 10 && Math.abs(e.clientY - this.mouseDownY) <= 10 && !this.node?.isDrag) {
      return;
    }
    this.mindMap.renderer.clearActive();

    // 创建克隆节点，跟随鼠标移动
    this.createCloneNode();

    // console.log('this.clone:', this.clone);
    if (this.clone) {
      const t = this.clone.transform();
      // console.log('22:', e.clientX - (t.translateX || 0), e.clientY - (t.translateY || 0));
      this.clone.translate(e.clientX - (t.translateX || 0), e.clientY - (t.translateY || 0));
      this.checkOverlapNode();
    }
  }

  handleNodeMouseup(_e: any) {
    // console.log('handleNodeMouseup:', e, this.mindMap);
    if (!this.isMousedown) {
      return;
    }
    this.isMousedown = false;

    // 删除克隆节点
  }

  bindFn() {
    this.checkOverlapNode = throttle(this.checkOverlapNode, 300);
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
