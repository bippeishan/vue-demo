import merge from 'deepmerge';
import MindMap from '..';
import { DataItem } from '../node/type';
import { Opt } from './type';
import Node from '../node';
import renderUtils from './utils';
import nodeUtils from '../node/utils';

const nodeMarginX = 100;
const nodeMarginY = 50;

class Render {
  mindMap: MindMap;

  renderTree: DataItem;

  root?: Node;

  activeNodeList: Node[];

  constructor(opt: Opt) {
    this.mindMap = opt.mindMap;
    this.renderTree = merge({}, this.mindMap.opt.rootData || {});
    this.activeNodeList = [];

    this.doLayout();
    // 注册命令
    this.registerCommands();
  }

  findActiveNodeIndex(node: Node) {
    return this.activeNodeList.findIndex((item) => item === node);
  }

  addActiveNode(node: Node) {
    const index = this.findActiveNodeIndex(node);
    if (index === -1) {
      this.activeNodeList.push(node);
    }
  }

  clearActive() {
    this.activeNodeList.forEach((item) => {
      nodeUtils.setNodeData(item, false);
    });
    this.activeNodeList = [];
  }

  // 插入子节点
  insertChildNode() {
    if (this.activeNodeList.length <= 0) {
      return;
    }
    console.log('this.activeNodeList:', this.activeNodeList[0]?.children.length);
    this.activeNodeList.forEach((node) => {
      if (!node.nodeData.children) {
        node.nodeData.children = [];
      }
      node.nodeData.children.push({
        data: {
          text: '分支主题',
          expand: true,
        },
        children: [],
      });
      if (node.isRoot) {
        node.initRender = true;
      }
    });
    this.doLayout();
  }

  // 注册命令
  registerCommands() {
    this.mindMap.command.add('INSERT_CHILD_NODE', this.insertChildNode.bind(this));
  }

  /**
   * 创建节点，并关联数据、节点父子关系、层级
   */
  createNode(data: DataItem, parent: DataItem | null, isRoot: boolean) {
    let newNode = null;
    if (data?.node) {
      newNode = data?.node;
      newNode.reset();
    } else {
      newNode = new Node({
        mindMap: this.mindMap,
        data,
        draw: this.mindMap.draw,
      });

      // 数据和实例关联
      data.node = newNode;
    }

    if (isRoot) {
      newNode.isRoot = true;
      this.root = newNode;
    } else if (parent?.node) {
      // 互相收集
      newNode.parent = parent.node;
      parent.node.addChildren(newNode);
    }

    return newNode;
  }

  setNodeCenter(node: Node) {
    node.left = (this.mindMap.rect.width - node.width) / 2;
    node.top = (this.mindMap.rect.height - node.height) / 2;
  }

  /**
   * 更新子节点位置
   */
  updateChildren(children: Node[], prop: string, offset: number) {
    children.forEach((it) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (it as any)[prop] += offset;
      if (it.children?.length) {
        this.updateChildren(it.children, prop, offset);
      }
    });
  }

  /**
   * 更新兄弟节点top
   */
  updateBrothers(node: Node, addHeight: number) {
    if (node.parent) {
      const childrenList = node.parent.children;
      const index = childrenList.findIndex((it) => it === node);
      childrenList.forEach((it, idx) => {
        if (it === node) {
          return;
        }
        let offest = 0;
        if (idx < index) {
          // 上面的节点上移
          offest = -addHeight;
        } else if (idx > index) {
          // 下面的节点下移
          offest = addHeight;
        }
        it.top += offest;

        if (it.children?.length) {
          // 同步更新子节点的位置
          this.updateChildren(it.children, 'top', offest);
        }
      });
      // 更新父节点的位置
      this.updateBrothers(node.parent, addHeight);
    }
  }

  /**
   * 遍历数据计算节点的left、width、height、areaHeight
   */
  computeBaseValue() {
    renderUtils.walk(
      this.renderTree,
      null,
      (cur, parent, isRoot) => {
        const newNode = this.createNode(cur, parent, isRoot);
        if (isRoot) {
          // 根节点定位在画布中心
          this.setNodeCenter(newNode);
        } else if (newNode.parent) {
          // 非根节点定位到父节点右侧
          newNode.left = newNode.parent.left + newNode.parent.width + nodeMarginX;
        }
        return false;
      },
      (cur) => {
        // 返回时计算节点的areaHeight，也就是子节点所占的高度之和，包括外边距
        if (cur.node) {
          const len = cur.node.children.length || 0;
          cur.node.childrenAreaHeight = len ? cur.node.children.reduce((h, item) => h + item.height, 0) + (len + 1) * nodeMarginY : 0;
        }
      },
      true,
      0,
    );
  }

  /**
   * 计算节点的top
   */
  computedTopValue() {
    renderUtils.walk(
      this.renderTree,
      null,
      (crr) => {
        const { node } = crr;
        if (node?.children.length) {
          // 第一个子节点的top值 = 该节点中心的top值 - 子节点的高度之和的一半
          const top = node.top + node.height / 2 - node.childrenAreaHeight / 2;
          let totalTop = top + nodeMarginY;

          node.children.forEach((cur) => {
            if (cur.nodeData.data.text === '二级节点-1') {
              console.log('99:', totalTop);
            }
            cur.top = totalTop;
            totalTop += cur.height + nodeMarginY;
          });
        }
        return false;
      },
      null,
      true,
    );
  }

  /**
   * 调整节点top
   */
  adjustTopValue() {
    renderUtils.walk(
      this.renderTree,
      null,
      (crr) => {
        // eslint-disable-next-line operator-linebreak
        const difference = (crr.node?.childrenAreaHeight || 0) - nodeMarginY * 2 - (crr.node?.height || 0);
        if (difference > 0 && crr.node) {
          this.updateBrothers(crr.node, difference / 2);
        }
        return false;
      },
      null,
      true,
    );
  }

  doLayout() {
    const task = [
      () => {
        this.computeBaseValue();
      },
      () => {
        this.computedTopValue();
      },
      () => {
        this.adjustTopValue();
      },
      () => {
        if (this.root) {
          console.log('this.root:', this.root);
          this.root.render();
        }
      },
    ];
    renderUtils.asyncRun(task);
  }
}

export default Render;
