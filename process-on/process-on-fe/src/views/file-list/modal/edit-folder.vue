<template>
  <el-dialog v-model="inVisible" title="创建文件夹" width="30%">
    <el-form :model="form" label-width="120px">
      <el-form-item label="名称" placeholder="请输入名称">
        <el-input v-model="form.name" />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button>Cancel</el-button>
        <el-button type="primary" @click="handleSubmit">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { reactive } from 'vue';
import { uPost } from '@/service/api/utils';

export default {
  name: 'EditFolder',
  props: {
    visible: Boolean,
  },
  data() {
    return {
      form: reactive({
        name: '',
      }),
    };
  },
  components: {},
  mounted() {
    // console.log('visible:', this.visible);
  },
  computed: {
    // 该 prop 变更时计算属性也会自动更新
    inVisible() {
      return this.visible;
    },
  },
  methods: {
    handleSubmit() {
      console.log('handleSubmit:', this.form);
      uPost({ Action: 'files', name: this.form.name, type: 'folder' }).then((res) => {
        console.log('888:', res);
      });
    },
  },
};
</script>

<style lang="less" scoped></style>
