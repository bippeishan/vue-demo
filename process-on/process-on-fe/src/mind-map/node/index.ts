import { G, Path, Text } from '@svgdotjs/svg.js';
import { Opt, DataItem, NodeProp } from './type';
import utils from './utils';
import styleUtils from '../style/utils';
import renderUtils from '../render/utils';
import MindMap from '..';

// 矩形节点的边距
const nodePadding = 8;
const contentPadding = 4;

class Node {
  mindMap: MindMap;

  nodeData: DataItem;

  textData: NodeProp | null;

  group?: G;

  draw: G;

  width: number;

  height: number;

  left: number;

  top: number;

  isRoot: boolean;

  parent?: Node;

  node?: Node;

  children: Node[];

  initRender: boolean;

  childrenAreaHeight: number;

  lines: Path[];

  constructor(opt = {} as Opt) {
    this.mindMap = opt.mindMap;
    this.nodeData = utils.handleData(opt.data);
    this.textData = null;
    this.draw = opt.draw;
    this.width = opt.width || 0;
    this.height = opt.height || 0;
    this.left = opt.left || 0;
    this.top = opt.top || 0;
    this.isRoot = false;
    this.children = [];
    this.initRender = true;
    this.childrenAreaHeight = 0;
    this.lines = [];

    this.bindFn();
    this.createNodeData();
    this.getSize();

    // console.log('this.nodeData:', this.nodeData);
  }

  handleContextMenu(e: any) {
    // console.log('node-contextmenu');
    e.stopPropagation();
    e.preventDefault();

    this.active(e);
    this.mindMap.emit('node_contextmenu', e, this);
  }

  handleClick(e: any) {
    this.active(e);
    this.mindMap.emit('node_click', e, this);
  }

  handleNodeMousedown(e: any) {
    e.stopPropagation();
    this.mindMap.emit('node_mousedown', this, e);
  }

  handleNodeMouseup(e: any) {
    e.stopPropagation();
    this.mindMap.emit('node_mouseup', this, e);
  }

  bindFn() {
    this.handleContextMenu = this.handleContextMenu.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleNodeMousedown = this.handleNodeMousedown.bind(this);
    this.handleNodeMouseup = this.handleNodeMouseup.bind(this);
  }

  active(e: Event) {
    e.stopPropagation();
    // console.log('active-1:', this.nodeData, this.nodeData.data.isActive);
    if (this.nodeData.data.isActive) {
      return;
    }

    this.mindMap.renderer.clearActive();
    utils.setNodeData(this, { isActive: true });

    // this.mindMap.emit('before_node_active', this, this.mindMap.renderer.activeNodeList);
    // this.mindMap.renderer.clearActive();
    // this.mindMap.execCommand('SET_NODE_ACTIVE', this, true);
    this.mindMap.renderer.addActiveNode(this);

    this.renderNode();
    // this.mindMap.emit('node_active', this, this.mindMap.renderer.activeNodeList);
  }

  reset() {
    this.children = [];
    this.parent = undefined;
    this.isRoot = false;
    this.left = 0;
    this.top = 0;
  }

  createTextNode() {
    const g = new G();
    // 多行文本
    this.nodeData.data.text.split(/\n/gim).forEach((item) => {
      const node = new Text().text(item);
      // 设置字体颜色、字号等TODO: 一级/二级/三级的样式应该不一样
      styleUtils.text(node);
      g.add(node);
    });

    const { width, height } = g.bbox();
    return {
      node: g,
      width,
      height,
    };
  }

  createNodeData() {
    this.textData = this.createTextNode();
  }

  // 解绑所有绑定事件
  removeAllEvent() {
    if (this.group) {
      this.group.off('contextmenu', this.handleContextMenu);
      this.group.off('click', this.handleClick);
    }
  }

  // 移除所有节点
  removeAllNode() {
    // 节点内的内容
    [this.textData].forEach((item) => {
      if (item && item.node) item.node.remove();
    });

    this.textData = null;

    // 展开收缩按钮
    // if (this._expandBtn) {
    //   this._expandBtn.remove();
    //   this._expandBtn = null;
    // }
    // 组
    if (this.group) {
      this.group.clear();
      this.group.remove();
      this.group = undefined;
    }
  }

  getSize() {
    this.removeAllNode();
    this.createNodeData();

    // TODO: 可以扩展图片、链接、标注等节点类型
    let totalWidth = nodePadding * 2 + contentPadding * 2;
    let totalHeight = nodePadding * 2 + contentPadding * 2;

    if (this.textData) {
      totalWidth += this.textData.width;
      totalHeight += this.textData.height;
    }
    this.width = totalWidth;
    this.height = totalHeight;
  }

  // 添加子节点
  addChildren(node: Node) {
    this.children.push(node);
  }

  // 定位节点内容
  layout() {
    this.group = new G();
    this.draw.add(this.group);

    // console.log('99:', this.nodeData);
    const isActive = !!this.nodeData.data.isActive;

    styleUtils.rect(this.group.rect(this.width, this.height), { strokeColor: isActive ? '' : '#ffffff' });
    // 根节点在页面居中
    this.group.translate(this.left, this.top);
    // 文字节点
    const textContentNested = new G();
    // console.log('11:', this.width, this.height, this.width - contentPadding * 2, this.height - contentPadding * 2);
    styleUtils.rect(textContentNested.rect(this.width - contentPadding * 2, this.height - contentPadding * 2), { fillColor: '#6c5ce7' });

    if (this.textData) {
      // 有文字节点
      textContentNested.add(this.textData.node);
      // console.log('22:', textContentNested.bbox().height, textContentNested.bbox().width);
      this.textData.node.translate(
        nodePadding,
        // group加textContentNested后的高度被折叠了，所以这样处理垂直居中
        // textContentNested.bbox().height - this.height + nodePadding,
        textContentNested.bbox().height / 2 - 2,
      );
    }
    // TODO: 可以扩展图片、链接、标注等节点类型
    this.group.add(textContentNested);
    // console.log('33:', this.group.bbox().height, this.group.bbox().width);
    // 混合节点在矩形框中水平、垂直居中
    textContentNested.translate(
      contentPadding,
      // group加textContentNested后的高度被折叠了，所以这样处理垂直居中
      this.group.bbox().height - this.height + contentPadding,
    );

    // 增加事件监听
    this.group.on('click', this.handleClick);
    this.group.on('mousedown', this.handleNodeMousedown);
    this.group.on('mouseup', this.handleNodeMouseup);
    this.group.on('contextmenu', this.handleContextMenu);
  }

  // 连线
  renderLine() {
    const childrenLen = this.nodeData.children.length || 0;
    if (childrenLen > this.lines.length) {
      // 创建缺少的线
      new Array(childrenLen - this.lines.length).fill(0).forEach(() => {
        this.lines.push(this.draw.path());
      });
    } else if (childrenLen < this.lines.length) {
      // 删除多余的线
      this.lines.slice(childrenLen).forEach((line) => {
        line.remove();
      });
      this.lines = this.lines.slice(0, childrenLen);
    }

    // 画线
    // eslint-disable-next-line object-curly-newline
    const { left, top, width, height } = this;
    this.children?.forEach((item, idx) => {
      const x1 = left + width;
      const y1 = top + height / 2;
      const x2 = item.left;
      const y2 = item.top + item.height / 2;
      let path = '';
      if (this.isRoot) {
        path = utils.quadraticCurvePath(x1, y1, x2, y2);
      } else {
        path = utils.cubicBezierPath(x1, y1, x2, y2);
      }
      this.lines[idx].plot(path);
    });
    // 添加样式
    this.lines.forEach((line) => {
      styleUtils.line(line);
    });
  }

  removeLine() {
    this.lines.forEach((line) => {
      line.remove();
    });
    this.lines = [];
  }

  update(layout = false) {
    if (!this.group) {
      return;
    }

    // if (this.nodeData.data.text === '中心主题') {
    //   console.log('11:', this.left, this.top);
    // }

    const t = this.group.transform();
    const translateX = this.left - (t.translateX || 0);
    const translateY = this.top - (t.translateY || 0);
    // if (this.nodeData.data.text === '中心主题') {
    //   console.log('22:', t.translateX, t.translateY);
    //   console.log('33:', translateX, translateY);
    // }
    if (!layout) {
      // this.group.animate(300).element().translate(translateX, translateY);
      this.group.translate(translateX, translateY);
    } else {
      this.group.translate(translateX, translateY);
    }
  }

  render() {
    // 连线
    this.renderLine();

    // console.log('this.initRender:', this.initRender);
    if (this.initRender) {
      this.initRender = false;
      this.renderNode();
    } else {
      this.update();
    }
    // 子节点
    if (this.children?.length && this.nodeData.data.expand !== false) {
      // TODO: 记得去看看asyncRun的实现
      renderUtils.asyncRun(
        this.children.map((item) => () => {
          item.render();
        }),
      );
    }
  }

  // 渲染节点到画布，会移除旧的，创建新的
  renderNode() {
    this.removeAllEvent();
    this.removeAllNode();
    this.createNodeData();
    this.layout();
  }

  // 递归移除
  remove() {
    this.initRender = true;
    this.removeAllEvent();
    this.removeAllNode();
    this.removeLine();
    // 子节点
    if (this.children && this.children.length) {
      renderUtils.asyncRun(
        this.children.map((item) => () => {
          item.remove();
        }),
      );
    }
  }
}

export default Node;
