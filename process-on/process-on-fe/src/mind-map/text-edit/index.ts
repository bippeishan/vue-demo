import MindMap from '..';
import { Opt } from './type';
import Node from '../node';
import styleUtils from '../style/utils';

class TextEdit {
  mindMap: MindMap;

  textEditNode?: HTMLDivElement;

  showTextEdit: boolean;

  constructor(opt: Opt) {
    this.mindMap = opt.mindMap;
    // 文本编辑框是否显示
    this.showTextEdit = false;

    this.bindFn();
    this.bindEvent();
  }

  bindFn() {
    this.show = this.show.bind(this);
  }

  bindEvent() {
    // 节点双击事件
    this.mindMap.on('node_dblclick', this.show);
  }

  show(_e: any, node: Node) {
    const textRect = node.textData?.node?.node?.getBoundingClientRect();
    console.log('textRect:', textRect);
    if (!this.textEditNode) {
      // 创建输入框元素
      this.textEditNode = document.createElement('div');
      this.textEditNode.style.cssText = 'position:fixed;box-sizing: border-box;background-color:#fff;box-shadow: 0 0 20px rgba(0,0,0,.5);padding: 3px 5px;margin-left: -5px;margin-top: -3px;outline: none;';
      this.textEditNode.setAttribute('contenteditable', 'true');
      document.body.appendChild(this.textEditNode);
    }
    if (textRect) {
      styleUtils.domText(this.textEditNode, this.mindMap.view.scale);
      this.textEditNode.innerHTML = node.nodeData.data.text.split(/\n/gim).join('<br>');
      this.textEditNode.style.minWidth = `${textRect.width + 10}px`;
      this.textEditNode.style.minHeight = `${textRect.height + 6}px`;
      this.textEditNode.style.left = `${textRect.left}px`;
      this.textEditNode.style.top = `${textRect.top}px`;
      this.textEditNode.style.display = 'block';
      this.showTextEdit = true;

      this.selectNodeText();
    }
  }

  // 选中文本
  selectNodeText() {
    const selection = window.getSelection();
    const range = document.createRange();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    range.selectNodeContents(this.textEditNode);
    selection?.removeAllRanges();
    selection?.addRange(range);
  }
}

export default TextEdit;
