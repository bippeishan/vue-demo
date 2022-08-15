<template>
  <div class="file-list">
    <div class="file-item" v-for="(it, idx) in fileInfos" v-bind:key="{ idx }" v-on:click="handleFolderClick(it)">
      <el-icon size="12" color="#e4b133"><Folder /></el-icon>
      <span class="file-item-title">{{ it.name }}</span>
    </div>
  </div>
</template>

<script>
import Api from '../../service/api';

export default {
  name: 'FileList',
  data() {
    return {
      fileInfos: [],
    };
  },
  components: {},
  mounted() {
    this.getFiles({ parent_id: '0' });
  },
  methods: {
    async getFiles(params) {
      const files = await Api.uGet({ Action: 'files', ...params });
      this.fileInfos = files;
    },
    handleFolderClick(info) {
      console.log('handleFolderClick:', info);
      this.getFiles({ parent_id: info.id });
    },
  },
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
