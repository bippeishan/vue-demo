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

export default {
  name: 'EditMap',
  components: { Contextmenu },
  data() {
    return {
      mindMap: null,
      rootData: {
        data: {
          text: '中心主题',
        },
        children: [
          {
            data: {
              text: '二级节点',
            },
            children: [
              {
                data: {
                  text: '二级节点-1',
                },
              },
              {
                data: {
                  text: '二级节点-2',
                },
              },
              {
                data: {
                  text: '二级节点-3',
                },
              },
            ],
          },
          {
            data: {
              text: '二级节点2',
            },
            children: [
              {
                data: {
                  text: '二级节点2-1',
                },
              },
              {
                data: {
                  text: '二级节点2-2',
                },
              },
              {
                data: {
                  text: '二级节点2-3',
                },
              },
            ],
          },
        ],
      },
    };
  },
  mounted() {
    this.init();
    emitter.on('execCommand', this.execCommand);
  },
  methods: {
    init() {
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
