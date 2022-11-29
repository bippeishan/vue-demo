<template>
  <div class="nodeEdit">
    <div class="nodeEdit_iconContainer" v-if="!isShow" @click="show">
      <el-icon :size="20"><Operation /></el-icon>
    </div>
    <div class="nodeEdit_container" v-if="isShow">
      <div class="nodeEdit_container_header">
        <div @click="show" class="nodeEdit_header_close">
          <el-icon :size="14"><Close /></el-icon>
        </div>
      </div>

      <el-tabs type="border-card">
        <el-tab-pane>
          <template #label>
            <el-tooltip content="样式" placement="left">
              <span>
                <el-icon><orange :size="16" /></el-icon>
              </span>
            </el-tooltip>
          </template>
          <StyleEdit />
        </el-tab-pane>

        <el-tab-pane>
          <template #label>
            <el-tooltip content="图片" placement="bottom">
              <span>
                <el-icon><picture-filled :size="16" /></el-icon>
              </span>
            </el-tooltip>
          </template>
        </el-tab-pane>

        <el-tab-pane>
          <template #label>
            <el-tooltip content="备注" placement="bottom">
              <span>
                <el-icon><chat-dot-square :size="16" /></el-icon>
              </span>
            </el-tooltip>
          </template>
        </el-tab-pane>

        <el-tab-pane>
          <template #label>
            <el-tooltip content="标签" placement="bottom">
              <span>
                <el-icon><price-tag :size="16" /></el-icon>
              </span>
            </el-tooltip>
          </template>
        </el-tab-pane>

        <el-tab-pane>
          <template #label>
            <el-tooltip content="链接" placement="bottom">
              <span>
                <el-icon><position :size="16" /></el-icon>
              </span>
            </el-tooltip>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import StyleEdit from './style-edit.vue';

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
    min-width: 300px;
    min-height: 300px;
  }
  .nodeEdit_container_header {
    padding: 0;
    display: flex;
    justify-content: flex-end;
  }
  .nodeEdit_header_close {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    width: 48px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: rgba(106, 137, 204, 0.8);
      color: #ffffff;
    }
  }
}
</style>
