<template>
  <el-row class="style-edit-rowmargin">
    <el-input-number v-model="num" class="mx-4" :min="1" :max="10" controls-position="right" size="small" @change="handleChange" />
  </el-row>

  <div class="style-edit-iconbtn"><IFontColor fontColor="#eb2f06" width="18px" height="18px" /></div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import IFontColor from '../../../../icons/i-font-color.vue';

const num = ref(1);
const handleChange = (value: number) => {
  console.log(value);
};
</script>

<style lang="less" scoped>
.style-edit-rowmargin {
  margin-bottom: 8px;
}
.style-edit-iconbtn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 3px;
}
</style>
