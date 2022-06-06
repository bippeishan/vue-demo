import Node from '.';
import { DataItem } from './type';

const handleData = (data: DataItem) => {
  data.data.expand = typeof data.data.expand === 'boolean' ? data.data.expand : true;
  data.data.isActive = typeof data.data.isActive === 'boolean' ? data.data.isActive : false;
  data.children = data.children || [];
  return data;
};

/**
 * 二次贝塞尔曲线
 */
const quadraticCurvePath = (x1: number, y1: number, x2: number, y2: number) => {
  const cx = x1 + (x2 - x1) * 0.2;
  const cy = y1 + (y2 - y1) * 0.8;
  return `M ${x1},${y1} Q ${cx},${cy} ${x2},${y2}`;
};

/**
 *  三次贝塞尔曲线
 */
const cubicBezierPath = (x1: number, y1: number, x2: number, y2: number) => {
  const cx1 = x1 + (x2 - x1) / 2;
  const cy1 = y1;
  const cx2 = cx1;
  const cy2 = y2;
  return `M ${x1},${y1} C ${cx1},${cy1} ${cx2},${cy2} ${x2},${y2}`;
};

const setNodeData = (node: Node, data: any) => {
  Object.keys(data).forEach((key) => {
    node.nodeData.data[key] = data[key];
  });
};

export default {
  handleData,
  quadraticCurvePath,
  cubicBezierPath,
  setNodeData,
};
