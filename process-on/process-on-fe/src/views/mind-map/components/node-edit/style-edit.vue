<template>
  <el-row class="style-edit-rowmargin">
    <el-popover placement="bottom-start" trigger="click" :show-arrow="false" :width="200">
      <template #reference>
        <div class="style-edit-iconbtn"><IFontColor fontColor="#eb2f06" width="18px" height="18px" /></div>
      </template>
      <div><ChangeColor /></div>
    </el-popover>

    <el-input-number v-model="fontNum" class="style-edit-selectbtn" :min="1" :max="10" controls-position="right" @change="handleChange" />
  </el-row>

  <div class="style-edit-rowmargin style-edit-rowname">边框</div>
  <el-row class="style-edit-rowmargin">
    <el-tooltip content="边框宽度">
      <el-select v-model="borderWidth" class="style-edit-selectbtn" placeholder="Select" @change="handleBorderWidthChange">
        <el-option v-for="item in borderWidthOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-tooltip>

    <el-tooltip content="边框样式">
      <el-select v-model="borderStyle" class="style-edit-selectbtn" placeholder="Select" @change="handleBorderStyleChange">
        <el-option v-for="item in borderStyleOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-tooltip>

    <el-tooltip content="边框颜色">
      <div class="style-edit-iconbtn"><IBorderColor fontColor="#eb2f06" width="18px" height="18px" /></div>
    </el-tooltip>

    <el-tooltip content="边框圆角">
      <el-input-number v-model="borderRadius" class="style-edit-selectbtn" :min="1" :max="10" controls-position="right" @change="handleBorderRadiusChange" />
    </el-tooltip>
  </el-row>

  <div class="style-edit-rowmargin style-edit-rowname">连线</div>
  <el-row class="style-edit-rowmargin">
    <el-tooltip content="连线宽度">
      <el-select v-model="borderWidth" class="style-edit-selectbtn" placeholder="Select" @change="handleBorderWidthChange">
        <el-option v-for="item in borderWidthOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-tooltip>

    <el-tooltip content="连线颜色">
      <div class="style-edit-iconbtn"><IBorderColor fontColor="#eb2f06" width="18px" height="18px" /></div>
    </el-tooltip>
  </el-row>

  <div class="style-edit-rowmargin style-edit-rowname">填充和背景</div>
  <el-row class="style-edit-rowmargin">
    <el-tooltip content="主题背景色">
      <div class="style-edit-iconbtn"><IBorderColor fontColor="#eb2f06" width="18px" height="18px" /></div>
    </el-tooltip>
  </el-row>

  <div class="style-edit-rowmargin style-edit-rowname">预设风格和主题</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import IFontColor from '../../../../icons/i-font-color.vue';
import IBorderColor from '../../../../icons/i-border-color.vue';
import ChangeColor from './modal/change-color.vue';

const fontNum = ref(1);
const handleChange = (value: number) => {
  fontNum.value = value;
};

const borderWidthOptions = [
  { label: '无', value: 0 },
  { label: '1px', value: 1 },
  { label: '2px', value: 2 },
  { label: '3px', value: 3 },
  { label: '4px', value: 4 },
  { label: '5px', value: 5 },
  { label: '6px', value: 6 },
];
const borderWidth = ref(0);
const handleBorderWidthChange = (value: number) => {
  console.log(value);
  borderWidth.value = value;
};

const borderStyleOptions = [
  { label: '无', value: '' },
  { label: '实线', value: 'solid' },
  { label: '虚线', value: 'dotted' },
  { label: '点线', value: 'dot' },
  { label: '双线', value: 'double' },
];
const borderStyle = ref('');
const handleBorderStyleChange = (value: string) => {
  console.log(value);
  borderStyle.value = value;
};

const borderRadius = ref(0);
const handleBorderRadiusChange = (value: number) => {
  borderRadius.value = value;
};
</script>

<style lang="less" scoped>
.style-edit-rowmargin {
  margin-bottom: 8px;
}
.style-edit-rowname {
  color: #333;
  font-size: 13px;
}
.style-edit-iconbtn {
  width: 28px;
  height: 28px;
  margin-right: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 3px;
}
.style-edit-selectbtn {
  width: 80px;
  margin-right: 4px;
}
</style>
