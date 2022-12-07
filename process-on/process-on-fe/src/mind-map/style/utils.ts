import { Path, Rect, Text } from '@svgdotjs/svg.js';

const rect = (node: Rect, style?: { fillColor?: string; strokeColor?: string; borderWidth?: number; borderRadius?: number }) => {
  node
    .fill({
      color: style?.fillColor || '#f4f4f4',
    })
    .stroke({
      color: style?.strokeColor || '#0984e3',
      width: style?.borderWidth || 1,
      dasharray: '0, 0',
    })
    .radius(style?.borderRadius || 2);
};

const text = (node: Text, config?: Record<string, any>) => {
  // console.log('config:', config);
  node
    .fill({
      color: config?.fontColor || '#333333',
    })
    .font({
      'font-family': '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,apple color emoji,segoe ui emoji,Segoe UI Symbol,noto color emoji',
      'font-size': config?.fontSize || 12,
      'line-height': 14,
      'font-weight': 'noraml',
      'font-style': 'normal',
      'text-decoration': 'none',
    });
};

const line = (node: Path, style?: { color?: string; width?: number }) => {
  node.stroke({ width: style?.width || 1, color: style?.color || '#ccc' }).fill('transparent');
};

const domText = (node: HTMLDivElement, _fontSizeScale = 1) => {
  node.style.fontFamily = '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,apple color emoji,segoe ui emoji,Segoe UI Symbol,noto color emoji';
  node.style.fontSize = '12px';
  node.style.fontWeight = 'normal';
};

export default {
  rect,
  text,
  line,
  domText,
};
