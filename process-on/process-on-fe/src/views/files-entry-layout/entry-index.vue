<template>
  <el-container class="files-entry-layout">
    <el-aside width="200px">
      <el-dropdown trigger="click">
        <el-button type="primary">新建</el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleEditFolder">文件夹</el-dropdown-item>
            <el-dropdown-item>思维导图</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <div class="menu-content">
        <div class="menu-item menu-item-active">
          <el-icon :size="18">
            <Files />
          </el-icon>
          <span class="menu-item-label">我的文件</span>
        </div>

        <div class="menu-item">
          <el-icon :size="18"><DeleteFilled /></el-icon>
          <span class="menu-item-label">回收站</span>
        </div>
      </div>
    </el-aside>
    <el-main><router-view /></el-main>
  </el-container>
</template>

<script setup lang="ts">
import emitter from '../../utils/event-bus';

const handleEditFolder = () => {
  emitter.emit('create_folder');
};
</script>

<style lang="less" scoped>
.files-entry-layout {
  .menu-content {
    margin-top: 24px;

    .menu-item {
      display: flex;
      align-items: center;
      margin-bottom: 24px;

      i {
        margin-right: 12px;
        color: #747d8c;
      }

      &-label {
        color: #747d8c;
      }
    }

    .menu-item-active {
      i {
        color: #0984e3;
      }

      .menu-item-label {
        color: #0984e3;
      }
    }
  }
}
</style>

<style lang="less">
.el-dropdown__popper {
  .el-popper__arrow {
    display: none;
  }
}
</style>
