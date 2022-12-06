import Node from '../node';
import { DataItem } from '../node/type';

/**
 * 深度优先遍历树
 * beforeCallback: 创建节点，建立节点之间关系，确认节点left
 * afterCallback: 节点及其子节点都遍历完后，从外依次调整每个节点的top
 */
const walk = (
  root: DataItem,
  parent: DataItem | null,
  beforeCallback: (cur: DataItem, beforeParent: DataItem | null, isRoot: boolean, layerIndex: number, index: number) => boolean,
  afterCallback: ((cur: DataItem, beforeParent: DataItem | null, isRoot: boolean, layerIndex: number, index: number) => void) | null,
  isRoot: boolean,
  layerIndex = 0,
  index = 0,
) => {
  let stop = false;
  if (beforeCallback) {
    stop = beforeCallback(root, parent, isRoot, layerIndex, index);
  }
  if (!stop && root.children && root.children.length > 0) {
    const layerIndexTmp = layerIndex + 1;
    root.children.forEach((node, nodeIndex) => {
      walk(node, root, beforeCallback, afterCallback, false, layerIndexTmp, nodeIndex);
    });
  }
  afterCallback?.(root, parent, isRoot, layerIndex, index);
};

// 异步执行任务队列
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const asyncRun = (taskList: Array<() => any>, callback?: () => void) => {
  let index = 0;
  const len = taskList.length;
  if (len <= 0) {
    return;
  }
  const loop = () => {
    if (index >= len) {
      callback?.();
      return;
    }
    taskList[index]();
    setTimeout(() => {
      index += 1;
      loop();
    }, 0);
  };
  loop();
};

// 获取节点在同级里的索引位置
const getNodeIndex = (node: Node) => (node.parent ? node.parent.children.findIndex((item) => item.uuid === node.uuid) : 0);

// 移除某个指定节点
const removeOneNode = (node: Node) => {
  const index = getNodeIndex(node);
  node.remove();
  node.parent?.children.splice(index, 1);
  node.parent?.nodeData.children.splice(index, 1);
};

// 广度优先遍历树
const bfsWalk = (root?: Node, callback?: (val?: Node) => string) => {
  callback?.(root);
  const stack = [root];
  let isStop = false;
  while (stack.length) {
    if (isStop) {
      break;
    }
    const cur = stack.shift();
    if (cur?.children && cur.children.length) {
      for (let i = 0; i < cur.children.length; i += 1) {
        stack.push(cur.children[i]);
        if (callback?.(cur.children[i]) === 'stop') {
          isStop = true;
          break;
        }
      }
    }
  }
};

// 极简的深拷贝
export const simpleDeepClone = (data: any) => {
  try {
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    return null;
  }
};

export const copyNodeTree = (tree: any, root: any) => {
  tree.data = simpleDeepClone(root.nodeData.data);
  // tree.data.isActive = false
  tree.children = [];
  if (root.children && root.children.length > 0) {
    root.children.forEach((item: any, index: number) => {
      tree.children[index] = copyNodeTree({}, item);
    });
  }
  return tree;
};

// 更新节点数据
export const setNodeData = (node: Node, data: any) => {
  Object.keys(data).forEach((key) => {
    node.nodeData.data[key] = data[key];
  });
};

// 更新节点样式数据
const setNodeStyleData = (node: Node, data: any) => {
  // console.log('setNodeStyleData:', data);
  Object.keys(data).forEach((key) => {
    if (!node.nodeData.data.style) {
      node.nodeData.data.style = {};
    }
    node.nodeData.data.style[key] = data[key];
  });
};

export default {
  walk,
  asyncRun,
  getNodeIndex,
  removeOneNode,
  bfsWalk,
  copyNodeTree,
  simpleDeepClone,
  setNodeStyleData,
};
