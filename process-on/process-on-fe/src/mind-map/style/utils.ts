import { Path, Rect, Text } from '@svgdotjs/svg.js';

const rect = (node: Rect, style?: { fillColor?: string; strokeColor?: string }) => {
  node
    .fill({
      color: style?.fillColor || '#ffffff',
    })
    .stroke({
      color: style?.strokeColor || '#0984e3',
      width: 1,
      dasharray: '0, 0',
    })
    .radius(2);
};

const text = (node: Text) => {
  node
    .fill({
      color: '#ffffff',
    })
    .font({
      'font-family': '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,apple color emoji,segoe ui emoji,Segoe UI Symbol,noto color emoji',
      'font-size': 12,
      'line-height': 14,
      'font-weight': 'noraml',
      'font-style': 'normal',
      'text-decoration': 'none',
    });
};

const line = (node: Path) => {
  node.stroke({ width: 1, color: '#ccc' }).fill('transparent');
};

export default {
  rect,
  text,
  line,
};
