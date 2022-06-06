import { G, Path, Text } from '@svgdotjs/svg.js';
import { Opt, DataItem, NodeProp } from './type';
import utils from './utils';
import styleUtils from '../style/utils';
import renderUtils from '../render/utils';
import MindMap from '..';

// 矩形节点的边距
const nodePadding = 8;

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

    this.createNodeData();
    this.getSize();
  }

  active(e: Event) {
    e.stopPropagation();
    if (this.nodeData.data.isActive) {
      return;
    }

    this.mindMap.renderer.clearActive();
    utils.setNodeData(this, { isActive: true });

    // this.mindMap.emit('before_node_active', this, this.mindMap.renderer.activeNodeList);
    // this.mindMap.renderer.clearActive();
    // this.mindMap.execCommand('SET_NODE_ACTIVE', this, true);
    this.mindMap.renderer.addActiveNode(this);
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

  getSize() {
    // TODO: 可以扩展图片、链接、标注等节点类型
    let totalWidth = nodePadding * 2;
    let totalHeight = nodePadding * 2;

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

  renderNode() {
    this.group = new G();
    this.draw.add(this.group);

    styleUtils.rect(this.group.rect(this.width, this.height));
    // 根节点在页面居中
    this.group.translate(this.left, this.top);
    // 内容节点
    const textContentNested = new G();

    if (this.textData) {
      // 有文字节点
      textContentNested.add(this.textData.node);
    }
    // TODO: 可以扩展图片、链接、标注等节点类型
    this.group.add(textContentNested);
    // 混合节点在矩形框中水平、垂直居中
    textContentNested.translate(
      nodePadding,
      // group加textContentNested后的高度被折叠了，所以这样处理垂直居中
      this.group.bbox().height - this.height + nodePadding,
    );

    // 增加事件监听
    this.group.on('contextmenu', (e) => {
      console.log('node-contextmenu');
      e.stopPropagation();
      e.preventDefault();

      this.active(e);
      this.mindMap.emit('node_contextmenu', e, this);
    });
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
}

export default Node;
