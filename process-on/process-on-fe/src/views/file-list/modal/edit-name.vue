<template>
  <el-dialog v-model="dialogVisible" title="重命名" width="30%">
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
import Api from '@/service/api';
import { FileInfo } from '../type';

const emit = defineEmits(['onComplete']);

const props = defineProps<{
  fileInfo: FileInfo;
}>();

const dialogVisible = ref(true);

const form = ref<any>({
  name: props.fileInfo.name,
});

const handleSubmit = () => {
  // eslint-disable-next-line object-curly-newline
  Api.uPut({ Action: `files/${props.fileInfo.id}`, name: form.value.name, id: props.fileInfo.id }).then(() => {
    emit('onComplete', 'success');
  });
};
</script>

<style lang="less" scoped></style>
