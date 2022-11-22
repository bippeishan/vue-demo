import { G, Path } from '@svgdotjs/svg.js';
import { throttle } from 'lodash';
import MindMap from '..';
import { Opt } from './type';
import Node from '../node';
import renderUtils from '../render/utils';
import styleUtils from '../style/utils';

const virtualChildWidth = 50;
const virtualChildHeight = 20;
// 虚拟节点直接的距离
const virtualNodeMargin = 100;

class Drag {
  mindMap: MindMap;

  node?: Node;

  clone?: G;

  isMousedown: boolean;

  mouseDownX: number;

  mouseDownY: number;

  mouseMoveX: number;

  mouseMoveY: number;

  // 鼠标在节点按下时，鼠标位置距离节点左侧距离
  offsetX: number;

  offsetY: number;

  cloneNodeLeft: number;

  cloneNodeTop: number;

  // 重叠节点: 当前遍历节点
  overlapNode?: Node;

  // 移动节点的指示位置
  VirtualChildGroup?: G;

  // 引导节点的虚拟子节点
  virtualChild?: G;

  // 引导节点的虚拟连线
  virtualLine?: Path;

  // 移动节点类型
  moveNodeType?: 'addChild' | 'addAfterBrother' | 'addBeforeBrother';

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
    console.log('创建克隆节点:', this.clone, this.node);
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

  // 删除引导节点和虚拟子节点
  removeVirtualChild() {
    if (this.VirtualChildGroup) {
      this.VirtualChildGroup.clear();
      this.VirtualChildGroup.remove();
      this.VirtualChildGroup = undefined;
    }
    this.removeVirtualChildAndLine();
  }

  // 删除虚拟子节点和连线
  removeVirtualChildAndLine() {
    if (this.virtualChild) {
      this.virtualChild.clear();
      this.virtualChild.remove();
      this.virtualChild = undefined;
    }
    if (this.virtualLine) {
      this.virtualLine.clear();
      this.virtualLine.remove();
      this.virtualLine = undefined;
    }
  }

  drawGuideNode() {
    if (this.overlapNode) {
      // 位置发生改变，清除旧节点
      this.removeVirtualChild();
      // 1. 新建引导节点
      this.VirtualChildGroup = new G();
      this.mindMap.draw.add(this.VirtualChildGroup);
      // 位移到重叠节点上
      this.VirtualChildGroup.translate(this.overlapNode.left, this.overlapNode.top);
      // 加上颜色
      styleUtils.rect(this.VirtualChildGroup.rect(this.overlapNode.width, this.overlapNode.height), { strokeColor: '#e67e22', fillColor: 'transparent' });
    }
  }

  /**
   * 添加虚拟子节点
   * 1. 创建和overlapNode同样宽高、位置的橙色矩形
   * 2. 创建橙色矩形的子节点，橙色矩形
   * 3. 连线
   */
  addVirtualChild() {
    if (this.overlapNode && (this.VirtualChildGroup?.transform().translateX !== this.overlapNode.left || this.VirtualChildGroup?.transform().translateY !== this.overlapNode.top)) {
      console.log('添加虚拟子节点');
      // 1. 新建引导节点
      this.drawGuideNode();
    }
    this.addVirtualChildAndLine();
  }

  // 添加虚拟子节点和连线
  addVirtualChildAndLine() {
    if (this.VirtualChildGroup && this.overlapNode && !this.virtualChild) {
      // 2. 新建引导子节点
      this.virtualChild = new G();
      this.VirtualChildGroup.add(this.virtualChild);

      const virtualChildTranslateY = this.moveNodeType === 'addChild' ? (this.overlapNode.height - virtualChildHeight) / 2 : this.overlapNode.height;
      this.virtualChild.translate(virtualNodeMargin, virtualChildTranslateY);
      styleUtils.rect(this.virtualChild.rect(virtualChildWidth, virtualChildHeight), { strokeColor: '#e67e22', fillColor: 'transparent' });

      // 3. 连线
      const virtualLineStartX = this.moveNodeType === 'addChild' ? this.overlapNode.width : (3 * this.overlapNode.width) / 4;
      const virtualLineStartY = this.moveNodeType === 'addChild' ? this.overlapNode.height / 2 : this.overlapNode.height;
      const virtualLineEndY = this.moveNodeType === 'addChild' ? this.overlapNode.height / 2 : this.overlapNode.height + virtualChildHeight / 2;
      this.virtualLine = this.VirtualChildGroup.path();
      this.virtualLine.plot(`M ${virtualLineStartX} ${virtualLineStartY} L ${virtualNodeMargin} ${virtualLineEndY}`);
      styleUtils.line(this.virtualLine, { color: '#e67e22' });
    }
  }

  /**
   * 添加弟弟节点
   */
  addAfterBrother() {
    // 当覆盖节点和引导节点都没有发生变化，不重新建引导节点
    if (this.overlapNode && (this.VirtualChildGroup?.transform().translateX !== this.overlapNode.left || this.VirtualChildGroup?.transform().translateY !== this.overlapNode.top)) {
      console.log('添加虚拟弟弟节点');
      // 1. 新建引导节点
      this.drawGuideNode();
    }
    this.addVirtualChildAndLine();
  }

  // 检测重叠节点
  checkOverlapNode() {
    this.overlapNode = undefined;
    this.moveNodeType = undefined;

    renderUtils.bfsWalk(this.mindMap.renderer.root, (node) => {
      if (node?.uuid === this.node?.uuid) {
        return '';
      }

      if (this.overlapNode) {
        return '';
      }

      if (!node) {
        return '';
      }

      // eslint-disable-next-line object-curly-newline
      const { left, top, width, height } = node;

      /**
       * node: 当前遍历节点
       * left: 当前遍历节点左侧距画布边缘距离
       * width: 当前遍历节点宽度
       * right: 当前遍历节点右侧距画布左边缘距离
       * top: 当前遍历节点上侧距画布上边缘距离
       * bottom: 当前遍历节点下侧距画布上边缘距离
       * cloneNodeLeft: 克隆节点左侧距画布边缘距离
       * cloneNodeTop: 克隆节点上侧距画布上边缘距离
       * cloneNodeHeight: 克隆节点高度
       */

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
        // console.log('00:', left, width, top, height, right, this.cloneNodeLeft, this.cloneNodeTop, this.offsetX);
        // console.log('11:', left + width / 2 >= this.cloneNodeLeft, left + width / 2 <= right, top + height / 2 >= this.cloneNodeTop, top <= this.cloneNodeTop + height / 2);

        if (left + width >= this.cloneNodeLeft && left <= this.cloneNodeLeft && top + height / 5 <= this.cloneNodeTop && top + (4 * height) / 5 >= this.cloneNodeTop) {
          console.log('加到子节点');
          this.removeVirtualChildAndLine();
          this.moveNodeType = 'addChild';
          this.overlapNode = node;
          this.addVirtualChild();
          return '';
        }
        // console.log('22:', left + width / 2 >= this.cloneNodeLeft, left <= this.cloneNodeLeft, bottom >= this.cloneNodeTop, top + height / 2 <= this.cloneNodeTop);

        if (left + width >= this.cloneNodeLeft && left <= this.cloneNodeLeft && top + (4 * height) / 5 < this.cloneNodeTop && top + height >= this.cloneNodeTop) {
          console.log('加到弟弟节点');
          this.removeVirtualChildAndLine();
          this.moveNodeType = 'addAfterBrother';
          this.overlapNode = node;
          this.addAfterBrother();
          return '';
        }
      }

      this.removeVirtualChild();
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
      this.cloneNodeLeft = e.clientX;
      this.cloneNodeTop = e.clientY;

      const t = this.clone.transform();
      // console.log('clone.translate:', e.clientX, t.translateX, e.clientX - (t.translateX || 0), e.clientY - (t.translateY || 0), t);
      this.clone.translate(e.clientX - (t.translateX || 0), e.clientY - (t.translateY || 0));
      this.checkOverlapNode();
    }
  }

  // 删除克隆节点
  removeCloneNode() {
    if (!this.clone) {
      return;
    }
    this.clone.clear();
    this.clone.remove();
    this.clone = undefined;
  }

  // 清空覆盖节点等数据
  clearData() {
    this.overlapNode = undefined;
    this.moveNodeType = undefined;
    this.node = undefined;
  }

  handleNodeMouseup(_e: any) {
    // console.log('handleNodeMouseup:', e, this.mindMap);
    if (!this.isMousedown) {
      return;
    }
    this.isMousedown = false;
    if (this.node) {
      this.node.isDrag = false;
    }

    // 删除克隆节点
    this.removeCloneNode();
    this.removeVirtualChild();
    if (this.node && this.overlapNode && this.moveNodeType === 'addChild') {
      // 移动节点作为子节点
      console.log('移动节点作为子节点');
      this.mindMap.execCommand('MOVE_NODE_TO', this.node, this.overlapNode);
    }
    if (this.node && this.overlapNode && this.moveNodeType === 'addAfterBrother') {
      // 移动节点作为弟弟节点
      console.log('移动节点作为弟弟节点');
      this.mindMap.execCommand('INSERT_AFTER', this.node, this.overlapNode);
    }
    // 清除数据
    this.clearData();
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
    this.mindMap.on('mouseup', this.handleNodeMouseup);
  }
}

export default Drag;
