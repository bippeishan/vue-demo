<template>
  <el-container class="upro-entry-layout">
    <el-aside width="200px">
      <div>upro</div>
    </el-aside>
    <el-main><router-view /></el-main>
  </el-container>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.upro-entry-layout {
  color: red;
}
</style>
