<template>
  <div class="contextMenu" v-if="isShow" :style="{ left: left + 'px', top: top + 'px' }">
    <template v-if="type === 'node'">
      <div class="item" @click="exec('INSERT_CHILD_NODE')">插入子级节点</div>
    </template>
  </div>
</template>

<script>
import emitter from '../../event-bus';

export default {
  name: 'ContextMenu',
  props: {},
  data() {
    return {
      isShow: false,
      left: 0,
      top: 0,
      type: '',
    };
  },
  created() {
    // console.log('menu-created');
    emitter.on('node_contextmenu', this.show);
  },
  beforeUnmount() {
    console.log('menu-beforeUnmount');
    emitter.off('node_contextmenu', this.show);
  },
  methods: {
    show(e, node) {
      this.type = 'node';
      this.left = e.clientX + 10;
      this.top = e.clientY + 10;
      this.isShow = true;
    },
    hide() {
      this.isShow = false;
      this.left = 0;
      this.top = 0;
      this.type = '';
    },
    exec(key, disabled) {
      if (disabled) {
        return;
      }
      switch (key) {
        case 'COPY_NODE':
          this.copyData = this.mindMap.renderer.copyNode();
          break;
        case 'CUT_NODE':
          emitter.emit('execCommand', key, (copyData) => {
            this.copyData = copyData;
          });
          break;
        case 'PASTE_NODE':
          emitter.emit('execCommand', key, this.copyData);
          break;
        case 'RETURN_CENTER':
          this.mindMap.view.reset();
          break;
        default:
          emitter.emit('execCommand', key);
          break;
      }
      this.hide();
    },
  },
};
</script>

<style lang="less" scoped>
.contextMenu {
  position: fixed;
  width: 160px;
  background: #fff;
  box-shadow: 0 4px 12px 0 hsla(0, 0%, 69%, 0.5);
  border-radius: 4px;
  padding-top: 16px;
  padding-bottom: 16px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #1a1a1a;

  .item {
    height: 28px;
    line-height: 28px;
    padding-left: 16px;
    cursor: pointer;

    &.danger {
      color: #f56c6c;
    }

    &:hover {
      background: #f5f5f5;
    }

    &.disabled {
      color: grey;
      cursor: not-allowed;

      &:hover {
        background: #fff;
      }
    }
  }
}
</style>
