<template>
  <el-dialog v-model="dialogVisible" title="创建文件夹" width="30%">
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
import { uPost } from '@/service/api/utils';

const emit = defineEmits(['onComplete']);

const props = defineProps({
  parentId: {
    type: Number,
    require: true,
  },
});

const dialogVisible = ref(true);

const form = ref<any>({
  name: '',
});

const handleSubmit = () => {
  // eslint-disable-next-line object-curly-newline
  uPost({ Action: 'files', name: form.value.name, parent_id: props.parentId, type: 'folder' }).then(() => {
    emit('onComplete', 'success');
  });
};
</script>

<style lang="less" scoped></style>
