<template>
  <div class="nodeEdit">
    <div class="nodeEdit_iconContainer" v-if="!isShow" @click="show">
      <el-icon :size="20"><Operation /></el-icon>
    </div>
    <div class="nodeEdit_container" v-if="isShow">
      <div class="nodeEdit_container_header">
        <div @click="show" class="nodeEdit_header_close">
          <el-icon :size="12"><Close /></el-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isShow = ref(false);

const show = () => {
  isShow.value = !isShow.value;
};
</script>

<style lang="less" scoped>
.nodeEdit {
  position: fixed;
  top: 48px;
  right: 24px;

  .nodeEdit_iconContainer {
    width: 36px;
    height: 36px;
    box-shadow: 0 4px 12px 0 hsla(0, 0%, 69%, 0.5);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .nodeEdit_container {
    background-color: #ffffff;
    box-shadow: 0 4px 12px 0 hsla(0, 0%, 69%, 0.5);
    min-width: 200px;
    min-height: 200px;
  }
  .nodeEdit_container_header {
    padding: 0 12px;
  }
  .nodeEdit_header_close {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 16px;
    cursor: pointer;
  }
}
</style>
