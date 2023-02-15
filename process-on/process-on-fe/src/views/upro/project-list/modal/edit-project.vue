<template>
  <el-dialog v-model="dialogVisible" title="创建项目" width="30%">
    <el-form :model="form" label-width="120px">
      <el-form-item label="名称" placeholder="请输入名称">
        <el-input v-model="form.name" />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('onComplete', 'cancel')">Cancel</el-button>
        <el-button type="primary" @click="handleSubmit">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { uPost, uPut } from '@/service/api/utils';
import { ProjectInfo } from '../type';

const emit = defineEmits(['onComplete']);

const props = defineProps<{
  projectInfo?: ProjectInfo;
}>();

const dialogVisible = ref(true);

const form = ref<any>({
  name: props.projectInfo?.name,
});

const handleSubmit = () => {
  if (props.projectInfo) {
    uPut({ Action: `projects/${props.projectInfo.id}`, name: form.value.name, id: props.projectInfo.id }).then(() => {
      emit('onComplete', 'success');
    });
  } else {
    uPost({ Action: 'projects', name: form.value.name }).then(() => {
      emit('onComplete', 'success');
    });
  }
};
</script>

<style lang="less" scoped></style>
