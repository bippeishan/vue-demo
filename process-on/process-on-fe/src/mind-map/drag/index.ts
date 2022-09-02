import { G } from '@svgdotjs/svg.js';
import { throttle } from 'lodash';
import MindMap from '..';
import { Opt } from './type';
import Node from '../node';
import renderUtils from '../render/utils';

// 检查是否前后加节点的额外距离
// const extraHeight = 20;

class Drag {
  mindMap: MindMap;

  node?: Node;

  clone?: G;

  isMousedown: boolean;

  mouseDownX: number;

  mouseDownY: number;

  mouseMoveX: number;

  mouseMoveY: number;

  offsetX: number;

  offsetY: number;

  cloneNodeLeft: number;

  cloneNodeTop: number;

  // 重叠节点
  overlapNode?: Node;

  constructor(opt: Opt) {
    this.mindMap = opt.mindMap;
    this.isMousedown = false;
    // 鼠标按下位置
    this.mouseDownX = 0;
    this.mouseDownY = 0;
    // 鼠标移动中的位置
    this.mouseMoveX = 0;
    this.mouseMoveY = 0;
    // 鼠标按下位置距离节点左上角位置
    this.offsetX = 0;
    this.offsetY = 0;
    // 克隆节点位置
    this.cloneNodeLeft = 0;
    this.cloneNodeTop = 0;

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
    const checkRight = this.cloneNodeLeft + (this.node?.width || 0);
    const checkBottom = this.cloneNodeTop + (this.node?.height || 0);

    this.overlapNode = undefined;

    renderUtils.bfsWalk(this.mindMap.renderer.root, (node) => {
      console.log('99:', node);

      if (node === this.node) {
        return '';
      }

      if (!node) {
        return '';
      }

      // eslint-disable-next-line object-curly-newline
      const { left, top, width, height } = node;
      const right = left + width;
      const bottom = top + height;

      // 检测是否重叠
      if (!this.overlapNode) {
        /**
         * 加到子节点
         * 1. left + 1/2 width >= this.cloneNodeLeft
         * 2. left + 1/2 width <= right
         * 3. top <= this.cloneNodeTop + 1/2 height
         * 4. bottom >= this.cloneNodeTop + 1/2 height
         * 节点前加节点
         * 1. left + 1/2 width >= this.cloneNodeLeft
         * 2. left + 1/2 width <= right
         * 3. top >= this.cloneNodeTop + 1/2 this.clone.height
         * 4. top + extraHeight <= this.cloneNodeTop + 1/2 this.clone.height
         * 节点后加节点: 和节点前加节点类似
         */
        if (left <= checkRight && right >= this.cloneNodeLeft && top <= checkBottom && bottom >= this.cloneNodeTop) {
          this.overlapNode = node;
        }
      }

      return '';
    });
  }

  handleNodeMousedown(node: Node, e: any) {
    if (e.which !== 1 || node.isRoot) {
      return;
    }
    e.preventDefault();

    this.offsetX = e.clientX - node.left;
    this.offsetY = e.clientY - node.top;

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
      this.cloneNodeLeft = e.clientX - this.offsetX;
      this.cloneNodeTop = e.clientY - this.offsetY;

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
