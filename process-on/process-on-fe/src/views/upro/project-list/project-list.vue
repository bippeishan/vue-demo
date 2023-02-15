<template>
  <el-row className="table_header">
    <el-col :span="12">
      <el-button type="primary" @click="handleCreate()">创建项目</el-button>
    </el-col>
    <!-- <el-col :span="12"></el-col> -->
  </el-row>

  <el-table :data="projectInfos" stripe style="width: 100%">
    <el-table-column prop="id" label="id" width="80" />
    <el-table-column prop="name" label="Name" />
    <el-table-column label="Operations">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.row)">Edit</el-button>

        <el-popconfirm title="确认删除这个项目吗?" @confirm="handleDelete(scope.row)">
          <template #reference>
            <el-button size="small" type="danger">Delete</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>

  <EditProject v-if="editProjectVisible" :projectInfo="editProject" @onComplete="handleComplete" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Api from '../../../service/api';
import { ProjectInfo } from './type';
import EditProject from './modal/edit-project.vue';

const projectInfos = ref<ProjectInfo[]>([]);
const editProjectVisible = ref(false);
const editProject = ref<ProjectInfo>();

const getProjects = async (params: any) => {
  const infos = await Api.uGet({ Action: 'projects', ...params });
  projectInfos.value = infos;
};

onMounted(() => {
  getProjects({});
});

const handleCreate = () => {
  editProjectVisible.value = !editProjectVisible.value;
};

const handleEdit = (record: ProjectInfo) => {
  editProjectVisible.value = !editProjectVisible.value;
  editProject.value = record;
};

const handleDelete = (record: ProjectInfo) => {
  console.log('handleDelete:', record);
  Api.uDelete({ Action: `projects/${record.id}` }).then(() => {
    getProjects({});
  });
};

const handleComplete = (result: string) => {
  console.log('handleComplete');
  editProjectVisible.value = !editProjectVisible.value;
  if (result === 'success') {
    getProjects({});
  }
};
</script>

<style lang="less" scoped>
.table_header {
  margin-bottom: 12px;
}
</style>
