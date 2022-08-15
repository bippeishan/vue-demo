<template>
  <div class="file-list">
    <div class="file-item">
      <el-icon size="12" color="#e4b133"><Folder /></el-icon>
      <span class="file-item-title">技术学习记录</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileList',
  data() {
    return {};
  },
  components: {},
  // mounted() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.file-list {
  display: flex;
}

.file-item {
  display: flex;
  align-items: center;
  padding: 12px;
  background: #ffffff;
  border-radius: 2px;
  box-shadow: 0 1px 1px 0 rgb(0 0 0 / 20%);

  &-title {
    margin-left: 4px;
    font-size: 12px;
  }
}
</style>
