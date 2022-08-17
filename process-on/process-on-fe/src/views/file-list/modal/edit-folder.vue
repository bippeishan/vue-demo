<template>
  <el-dialog :v-model="visible" title="创建文件夹" width="30%">
    <span>This is a message</span>
    <!-- <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">Cancel</el-button>
        <el-button type="primary" @click="visible = false">Confirm</el-button>
      </span>
    </template> -->
  </el-dialog>
</template>

<script>
export default {
  name: 'EditFolder',
  props: {
    visible: Boolean,
  },
  data() {
    return {};
  },
  components: {},
  mounted() {
    console.log('visible:', this.visible);
  },
  methods: {},
};
</script>

<style lang="less" scoped></style>
