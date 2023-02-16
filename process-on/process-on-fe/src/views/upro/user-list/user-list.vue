<template>
  <el-row className="table_header">
    <el-col :span="12">
      <el-button type="primary" @click="handleCreate()">创建用户</el-button>
    </el-col>
    <!-- <el-col :span="12"></el-col> -->
  </el-row>

  <el-table :data="infos" stripe style="width: 100%">
    <el-table-column prop="id" label="id" width="80" />
    <el-table-column prop="name" label="Name" />
    <el-table-column label="Operations">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.row)">Edit</el-button>

        <el-popconfirm title="确认删除这个用户吗?" @confirm="handleDelete(scope.row)">
          <template #reference>
            <el-button size="small" type="danger">Delete</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>

  <!-- <EditProject v-if="editProjectVisible" :projectInfo="editProject" @onComplete="handleComplete" /> -->
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Api from '../../../service/api';
import { UserInfo } from './type';

const infos = ref<UserInfo[]>([]);
const editVisible = ref(false);
const editInfo = ref<UserInfo>();

const getProjects = async (params: any) => {
  const list = await Api.uGet({ Action: 'projects', ...params });
  infos.value = list;
};

onMounted(() => {
  getProjects({});
});

const handleCreate = () => {
  editVisible.value = !editVisible.value;
};

const handleEdit = (record: UserInfo) => {
  editVisible.value = !editVisible.value;
  editInfo.value = record;
};

const handleDelete = (record: UserInfo) => {
  console.log('handleDelete:', record);
  Api.uDelete({ Action: `projects/${record.id}` }).then(() => {
    getProjects({});
  });
};

// const handleComplete = (result: string) => {
//   console.log('handleComplete');
//   editVisible.value = !editVisible.value;
//   if (result === 'success') {
//     getProjects({});
//   }
// };
</script>

<style lang="less" scoped>
.table_header {
  margin-bottom: 12px;
}
</style>
