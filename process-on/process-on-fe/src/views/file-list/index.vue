<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(it, idx) in breadcrumbDatas" v-bind:key="{ idx }" @click="handleBreadcrumClick(it)"
      ><span class="file-list-creadcrum-name">{{ it.title }}</span></el-breadcrumb-item
    >
  </el-breadcrumb>

  <div class="file-list">
    <div class="file-item" v-for="(it, idx) in fileInfos" v-bind:key="{ idx }" @click="handleFolderClick(it)">
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
      activeFolderId: this.getLocalBeradcrumData()?.[this.getLocalBeradcrumData().length - 1]?.toId || 0,
      editFile: {},
      breadcrumbDatas: this.getLocalBeradcrumData(),
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
        this.breadcrumbDatas.push({ title: info.name, toId: info.id });
        this.setLocalBeradcrumData(this.breadcrumbDatas);

        this.getFiles({ parent_id: info.id });
      } else {
        this.$router.push(`/${info.type}/${info.id}`);
      }
    },
    handleBreadcrumClick(info) {
      const index = this.breadcrumbDatas.findIndex((it) => it.toId === info.toId);
      this.breadcrumbDatas.splice(index + 1);
      this.setLocalBeradcrumData(this.breadcrumbDatas);

      this.getFiles({ parent_id: info.toId });
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
    setLocalBeradcrumData(data) {
      localStorage.setItem('FILE_BREADCRUM_DATAS', JSON.stringify(data || [{ title: '我的文件', toId: 0 }]));
    },
    getLocalBeradcrumData() {
      return JSON.parse(localStorage.getItem('FILE_BREADCRUM_DATAS')) || [{ title: '我的文件', toId: 0 }];
    },
  },
};
</script>

<style lang="less" scoped>
.file-list {
  display: flex;
  margin-top: 24px;
}

.file-list-creadcrum-name {
  cursor: pointer;
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
