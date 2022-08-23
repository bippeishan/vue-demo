<template>
  <div class="file-list">
    <div class="file-item" v-for="(it, idx) in fileInfos" v-bind:key="{ idx }" v-on:click="handleFolderClick(it)">
      <el-icon size="12" color="#e4b133" v-if="it.type === 'folder'"><Folder /></el-icon>
      <el-icon size="12" color="#00b894" v-if="it.type === 'mindmap'"> <Share /></el-icon>
      <span class="file-item-title">{{ it.name }}</span>

      <el-dropdown>
        <el-icon size="12"><Operation /></el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>重命名</el-dropdown-item>
            <el-dropdown-item @click="handleDeleteFolder(it)">删除</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

  <EditFolder v-if="editFolderVisible" :parentId="activeFolderId" @onComplete="handleCreateFolderComplete" />
  <DeleteFile v-if="deleteFileVisible" :fileInfo="editFile" @onComplete="handleDeleteFolder" />
</template>

<script>
import Api from '../../service/api';
import emitter from '../../utils/event-bus';
import EditFolder from './modal/edit-folder.vue';
import DeleteFile from './modal/delete-file.vue';

export default {
  name: 'FileList',
  data() {
    return {
      fileInfos: [],
      editFolderVisible: false,
      deleteFileVisible: false,
      activeFolderId: 0,
      editFile: {},
    };
  },
  components: { EditFolder, DeleteFile },
  mounted() {
    emitter.on('create_folder', this.handleCreateFolder);

    this.getFiles({ parent_id: this.activeFolderId });
  },
  unmounted() {
    emitter.off('create_folder', this.handleCreateFolder);
  },
  methods: {
    async getFiles(params) {
      const files = await Api.uGet({ Action: 'files', ...params });
      this.fileInfos = files;
    },
    handleFolderClick(info) {
      if (info.type === 'folder') {
        this.activeFolderId = info.id;

        this.getFiles({ parent_id: info.id });
      } else {
        this.$router.push(`/${info.type}/${info.id}`);
      }
    },
    handleCreateFolder() {
      this.editFolderVisible = !this.editFolderVisible;
    },
    handleCreateFolderComplete(result) {
      this.editFolderVisible = !this.editFolderVisible;
      if (result === 'success') {
        this.getFiles({ parent_id: this.activeFolderId });
      }
    },
    handleDeleteFolder(result) {
      if (result !== 'success') {
        this.editFile = result;
      }
      this.deleteFileVisible = !this.deleteFileVisible;
      if (result === 'success') {
        this.editFile = {};
        this.getFiles({ parent_id: this.activeFolderId });
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

  .el-dropdown {
    margin-left: 4px;
    color: #409eff;
  }
}
</style>
