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

  constructor(ctx: any) {
    // console.log('ctx:', ctx);
    this.ctx = ctx;
  }
}

export default Style;
