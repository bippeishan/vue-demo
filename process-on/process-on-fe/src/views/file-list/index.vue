<template>
  <div class="file-list">
    <div class="file-item" v-for="(it, idx) in fileInfos" v-bind:key="{ idx }" v-on:click="handleFolderClick(it)">
      <el-icon size="12" color="#e4b133" v-if="it.type === 'folder'"><Folder /></el-icon>
      <el-icon size="12" color="#00b894" v-if="it.type === 'mindmap'"> <Share /></el-icon>
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
      if (info.type === 'folder') {
        this.getFiles({ parent_id: info.id });
      } else {
        this.$router.push(`/${info.type}/${info.id}`);
      }
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
  margin-right: 12px;
  padding: 12px;
  background: #ffffff;
  border-radius: 2px;
  cursor: pointer;
  box-shadow: 0 1px 1px 0 rgb(0 0 0 / 20%);
  transition: all 0.3s;

  &:hover {
    transform: translateY(-4px);
  }

  &-title {
    margin-left: 4px;
    font-size: 12px;
  }
}
</style>
