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
          <el-dropdown trigger="click">
            <el-button type="primary">新建</el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-on:click="handleEditFolder()">文件夹</el-dropdown-item>
                <el-dropdown-item>思维导图</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

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

    <el-dialog v-model="editFolderVisible" title="创建文件夹" width="30%">
      <span>This is a message</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button>Cancel</el-button>
          <el-button type="primary">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>

  <!-- <EditFolder :visible="editFolderVisible" /> -->
</template>

<script>
// import EditFolder from '../file-list/modal/edit-folder.vue';
// import { ref } from 'vue';

export default {
  name: 'EntryLayout',
  // setup() {
  //   const editFolderVisible = ref(false);

  //   const handleEditFolder = () => {
  //     // this.editFolderVisible = !this.editFolderVisible;
  //     editFolderVisible.value = true;
  //   };

  //   return { editFolderVisible, handleEditFolder };
  // },
  data() {
    return {
      // editFolderVisible: ref(false),
      editFolderVisible: false,
    };
  },
  methods: {
    handleEditFolder() {
      this.editFolderVisible = true;
    },
  },
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

<style lang="less">
.el-dropdown__popper {
  .el-popper__arrow {
    display: none;
  }
}
</style>
