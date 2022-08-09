<template>
  <div class="entry-layout">
    <el-container>
      <el-header>
        <div>left</div>
        <div>center</div>
        <div>right</div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-button type="primary">新建</el-button>

          <div>
            <div>
              <el-icon :size="14" :color="red">
                <Edit />
              </el-icon>
              <span>我的文件</span>
            </div>
          </div>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'EntryLayout',
  components: {},
};
</script>

<style lang="less" scoped>
.entry-layout {
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
  }
}
</style>
