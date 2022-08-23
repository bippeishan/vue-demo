<template>
  <el-dialog v-model="dialogVisible" title="删除文件夹" width="30%">
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
import { uDelete } from '@/service/api/utils';
import { FileInfo } from '../type';

const emit = defineEmits(['onComplete']);

const props = defineProps<{
  fileInfo: FileInfo;
}>();

const dialogVisible = ref(true);

const handleSubmit = () => {
  // eslint-disable-next-line object-curly-newline
  uDelete({ Action: `files/${props.fileInfo.id}` }).then(() => {
    emit('onComplete', 'success');
  });
};
</script>

<style lang="less" scoped></style>
