<template>
  <div class="entry-layout">
    <el-container>
      <el-header>
        <div>Good云办公</div>
        <div></div>
        <div>emma.bi</div>
      </el-header>
      <el-container class="entry-layout-content">
        <el-main><router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.entry-layout {
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
  }

  .entry-layout-content {
    padding: 24px;
  }
}
</style>
