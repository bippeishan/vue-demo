<template>
  <div class="file-list">
    <div class="file-item" v-for="(it, idx) in projectInfos" v-bind:key="idx">
      <el-icon size="12" color="#e4b133" v-if="it.type === 'folder'"><Folder /></el-icon>
      <el-icon size="12" color="#00b894" v-if="it.type === 'mindmap'"> <Share /></el-icon>
      <span class="file-item-title">{{ it.name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const projectInfos = ref<any[]>([]);
</script>

<style lang="less" scoped></style>
