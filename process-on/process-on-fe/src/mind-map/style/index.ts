import Node from '../node';

class Style {
  ctx: any;

  fontFamily?: string;

  fontSize?: string;

  fontWeight?: string;

  fontColor?: string;

  borderWidth?: number;

  borderStyle?: string;

  borderColor?: string;

  borderRadius?: number;

  lineWidth?: number;

  lineColor?: string;

  bgColor?: string;

  constructor(ctx: Node) {
    // console.log('ctx:', ctx);
    this.ctx = ctx;
    this.fontColor = ctx.nodeData?.data?.fontColor;
    this.fontSize = ctx.nodeData?.data?.fontSize;

    this.borderWidth = ctx.nodeData?.data?.borderWidth;
    this.borderColor = ctx.nodeData?.data?.borderColor;
    this.borderRadius = ctx.nodeData?.data?.borderRadius;

    this.lineColor = ctx.nodeData?.data?.lineColor;

    this.bgColor = ctx.nodeData?.data?.bgColor;
  }
}

export default Style;
