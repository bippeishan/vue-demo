<template>
  <div class="editContainer">
    <div class="mindMapContainer" ref="mindMapContainer"></div>
    <Contextmenu :mindMap="mindMap"></Contextmenu>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import emitter from '../../utils/event-bus';
import MindMap from '../../mind-map';
import Contextmenu from './components/context-menu/context-menu.vue';
import Api from '../../service/api';

const route = useRoute();

const mindMap = ref<any>(null);
const rootData = ref<any>({});
const mindMapContainer = ref<any>();

const getRootData = async () => {
  const mindMapFile = await Api.uGet({ Action: 'files', id: route.params.id });
  return mindMapFile;
};

const init = async () => {
  const rootDataTemp = await getRootData();
  // eslint-disable-next-line prefer-destructuring
  rootData.value = JSON.parse(rootDataTemp[0].file_content);

  mindMap.value = new MindMap({
    el: mindMapContainer.value,
    rootData: rootData.value,
  });

  // 转发事件
  ['node_contextmenu', 'data_change', 'clear_active_node'].forEach((event) => {
    mindMap.value.on(event, (...args: any[]) => {
      emitter.emit(event, ...args);
    });
  });
};

const handleDataChange = async (data: any) => {
  console.log('data---:', data);
  const result = await Api.uPut({ Action: `files/${route.params.id}`, id: route.params.id, file_content: JSON.stringify(data) });
  console.log('result:', result);
};

const execCommand = (...args: any[]) => {
  mindMap.value.execCommand(...args);
};

onMounted(() => {
  init();
  emitter.on('execCommand', execCommand);
  emitter.on('data_change', handleDataChange);
});

onUnmounted(() => {
  emitter.off('data_change', handleDataChange);
  emitter.off('execCommand', execCommand);
});
</script>

<style lang="less" scoped>
.editContainer {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  .mindMapContainer {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
  }
}
</style>
