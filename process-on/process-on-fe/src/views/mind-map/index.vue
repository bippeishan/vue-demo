<template>
  <div class="editContainer">
    <div class="mindMapContainer" ref="mindMapContainer"></div>
    <Contextmenu :mindMap="mindMap"></Contextmenu>
  </div>
</template>

<script>
import emitter from './event-bus';
import MindMap from '../../mind-map';
import Contextmenu from './components/context-menu/index.vue';
import Api from '../../service/api';

export default {
  name: 'EditMap',
  components: { Contextmenu },
  data() {
    return {
      mindMap: null,
      rootData: {},
    };
  },
  mounted() {
    this.init();
    emitter.on('execCommand', this.execCommand);
  },
  methods: {
    async init() {
      const rootDataTemp = await this.getRootData();
      // eslint-disable-next-line prefer-destructuring
      this.rootData = JSON.parse(rootDataTemp[0].file_content);

      this.mindMap = new MindMap({
        el: this.$refs.mindMapContainer,
        rootData: this.rootData,
      });

      // 转发事件
      ['node_contextmenu'].forEach((event) => {
        this.mindMap.on(event, (...args) => {
          emitter.emit(event, ...args);
        });
      });
    },
    async getRootData() {
      const mindMapFile = await Api.uGet({ Action: 'files', id: this.$route.params.id });
      return mindMapFile;
    },
    execCommand(...args) {
      this.mindMap.execCommand(...args);
    },
  },
};
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
