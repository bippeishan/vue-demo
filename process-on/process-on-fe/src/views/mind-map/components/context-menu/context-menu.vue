<template>
  <div class="contextMenu" v-if="isShow" :style="{ left: left + 'px', top: top + 'px' }">
    <template v-if="type === 'node'">
      <div class="item" @click="exec('INSERT_CHILD_NODE')">插入子级节点</div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeMount, ref } from 'vue';
import emitter from '../../../../utils/event-bus';

const props = defineProps<{
  mindMap: any;
}>();

const isShow = ref(false);
const left = ref(0);
const top = ref(0);
const type = ref('');
const copyData = ref<any>();

const show = (e: any, _node: any) => {
  type.value = 'node';
  left.value = e.clientX + 10;
  top.value = e.clientY + 10;
  isShow.value = true;
};

onMounted(() => {
  emitter.on('node_contextmenu', show);
});

onBeforeMount(() => {
  emitter.off('node_contextmenu', show);
});

const hide = () => {
  isShow.value = false;
  left.value = 0;
  top.value = 0;
  type.value = '';
};

const exec = (key: any, disabled?: any) => {
  if (disabled) {
    return;
  }
  switch (key) {
    case 'COPY_NODE':
      copyData.value = props.mindMap.renderer.copyNode();
      break;
    case 'CUT_NODE':
      emitter.emit('execCommand', key, (data: any) => {
        copyData.value = data;
      });
      break;
    case 'PASTE_NODE':
      emitter.emit('execCommand', key, copyData.value);
      break;
    case 'RETURN_CENTER':
      props.mindMap.view.reset();
      break;
    default:
      emitter.emit('execCommand', key);
      break;
  }
  hide();
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
