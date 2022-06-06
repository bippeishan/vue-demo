import { DataItem } from '../node/type';

/**
 * 深度优先遍历树
 * beforeCallback: 创建节点，建立节点之间关系，确认节点left
 * afterCallback: 节点及其子节点都遍历完后，从外依次调整每个节点的top
 */
const walk = (
  root: DataItem,
  parent: DataItem | null,
  beforeCallback: (
    cur: DataItem,
    beforeParent: DataItem | null,
    isRoot: boolean,
    layerIndex: number,
    index: number,
  ) => boolean,
  afterCallback:
    | ((
        cur: DataItem,
        beforeParent: DataItem | null,
        isRoot: boolean,
        layerIndex: number,
        index: number,
      ) => void)
    | null,
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

export default {
  walk,
  asyncRun,
};
