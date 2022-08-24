<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(it, idx) in breadcrumbDatas" v-bind:key="{ idx }" @click="handleBreadcrumClick(it)"
      ><span class="file-list-creadcrum-name">{{ it.title }}</span></el-breadcrumb-item
    >
  </el-breadcrumb>

  <div class="file-list">
    <div class="file-item" v-for="(it, idx) in fileInfos" v-bind:key="idx" @click="handleFolderClick(it)">
      <el-icon size="12" color="#e4b133" v-if="it.type === 'folder'"><Folder /></el-icon>
      <el-icon size="12" color="#00b894" v-if="it.type === 'mindmap'"> <Share /></el-icon>
      <span class="file-item-title">{{ it.name }}</span>

      <el-dropdown>
        <el-icon size="12"><Operation /></el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleEditName(it)">重命名</el-dropdown-item>
            <el-dropdown-item @click="handleDeleteFolder(it)">删除</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

  <EditFolder v-if="editFolderVisible" :parentId="activeFolderId" @onComplete="handleCreateFolderComplete" />
  <DeleteFile v-if="deleteFileVisible" :fileInfo="editFile" @onComplete="handleDeleteFolder" />
  <EditName v-if="editNameVisible" :fileInfo="editFile" @onComplete="handleEditName" />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Api from '../../service/api';
import emitter from '../../utils/event-bus';
import EditFolder from './modal/edit-folder.vue';
import DeleteFile from './modal/delete-file.vue';
import EditName from './modal/edit-name.vue';

const router = useRouter();

const getLocalBeradcrumData = () => JSON.parse(localStorage.getItem('FILE_BREADCRUM_DATAS') || '[{"title":"我的文件","toId":0}]');

const setLocalBeradcrumData = (data: any) => {
  localStorage.setItem('FILE_BREADCRUM_DATAS', JSON.stringify(data || [{ title: '我的文件', toId: 0 }]));
};

const fileInfos = ref<any[]>([]);
const editFolderVisible = ref(false);
const deleteFileVisible = ref(false);
const editNameVisible = ref(false);
const activeFolderId = ref(getLocalBeradcrumData()?.[getLocalBeradcrumData().length - 1]?.toId || 0);
const editFile = ref<any>({});
const breadcrumbDatas = ref<any[]>(getLocalBeradcrumData());

const handleCreateFolder = () => {
  editFolderVisible.value = !editFolderVisible.value;
};

const getFiles = async (params: any) => {
  const files = await Api.uGet({ Action: 'files', ...params });
  fileInfos.value = files;
};

onMounted(() => {
  emitter.on('create_folder', handleCreateFolder);

  getFiles({ parent_id: activeFolderId.value });
});

onUnmounted(() => {
  emitter.off('create_folder', handleCreateFolder);
});

const handleFolderClick = (info: any) => {
  if (info.type === 'folder') {
    activeFolderId.value = info.id;
    breadcrumbDatas.value.push({ title: info.name, toId: info.id });
    setLocalBeradcrumData(breadcrumbDatas.value);

    getFiles({ parent_id: info.id });
  } else {
    router.push(`/${info.type}/${info.id}`);
  }
};

const handleBreadcrumClick = (info: any) => {
  const index = breadcrumbDatas.value.findIndex((it) => it.toId === info.toId);
  breadcrumbDatas.value.splice(index + 1);
  setLocalBeradcrumData(breadcrumbDatas.value);

  getFiles({ parent_id: info.toId });
};

const handleCreateFolderComplete = (result: any) => {
  editFolderVisible.value = !editFolderVisible.value;
  if (result === 'success') {
    getFiles({ parent_id: activeFolderId.value });
  }
};

const handleDeleteFolder = (result: any) => {
  if (result !== 'success') {
    editFile.value = result;
  }
  deleteFileVisible.value = !deleteFileVisible.value;
  if (result === 'success') {
    editFile.value = {};
    getFiles({ parent_id: activeFolderId.value });
  }
};

const handleEditName = (result: any) => {
  if (result !== 'success') {
    editFile.value = result;
  }
  editNameVisible.value = !editNameVisible.value;
  if (result === 'success') {
    editFile.value = {};
    getFiles({ parent_id: activeFolderId.value });
  }
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
