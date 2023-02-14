<template>
  <el-container class="upro-entry-layout">
    <el-aside width="200px">
      <div class="menu-content">
        <div class="menu-item menu-item-active">
          <el-icon :size="18">
            <Files />
          </el-icon>
          <span class="menu-item-label">项目</span>
        </div>

        <div class="menu-item">
          <el-icon :size="18"><DeleteFilled /></el-icon>
          <span class="menu-item-label">迭代</span>
        </div>

        <div class="menu-item">
          <el-icon :size="18"><DeleteFilled /></el-icon>
          <span class="menu-item-label">需求</span>
        </div>

        <div class="menu-item">
          <el-icon :size="18"><DeleteFilled /></el-icon>
          <span class="menu-item-label">Bug</span>
        </div>
      </div>
    </el-aside>
    <el-main><router-view /></el-main>
  </el-container>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.upro-entry-layout {
  .menu-content {
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
