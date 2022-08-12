<template>
  <div class="entry-layout">
    <el-container>
      <el-header>
        <div>云办公</div>
        <div></div>
        <div>emma.bi</div>
      </el-header>
      <el-container class="entry-layout-content">
        <el-aside width="200px">
          <el-button type="primary">新建</el-button>

          <div class="menu-content">
            <div class="menu-item menu-item-active">
              <el-icon :size="18">
                <Files />
              </el-icon>
              <span class="menu-item-label">我的文件</span>
            </div>

            <div class="menu-item">
              <el-icon :size="18"><DeleteFilled /></el-icon>
              <span class="menu-item-label">回收站</span>
            </div>
          </div>
        </el-aside>
        <el-main><router-view /></el-main>
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

  .entry-layout-content {
    padding: 24px;
  }

  .menu-content {
    margin-top: 24px;

    .menu-item {
      display: flex;
      align-items: center;
      margin-bottom: 24px;

      i {
        margin-right: 12px;
        color: #747d8c;
      }

      &-label {
        color: #747d8c;
      }
    }

    .menu-item-active {
      i {
        color: #0984e3;
      }

      .menu-item-label {
        color: #0984e3;
      }
    }
  }
}
</style>
