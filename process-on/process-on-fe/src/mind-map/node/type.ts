import { G } from '@svgdotjs/svg.js';
import MindMap from '..';
import Node from './index';

export interface NodeData extends Record<string, any> {
  text: string;
  expand?: boolean;
  isActive?: boolean;
}
export interface DataItem {
  data: NodeData;
  children: DataItem[];
  node?: Node;
  parent?: Node;
}

export interface Opt {
  mindMap: MindMap;
  data: DataItem;
  draw: G;
  width?: number;
  height?: number;
  left?: number;
  top?: number;
}

export interface NodeProp {
  node: G;
  width: number;
  height: number;
}
