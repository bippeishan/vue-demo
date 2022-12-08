<template>
  <el-row class="style-edit-rowmargin">
    <el-popover placement="bottom-start" popper-class="popover-nopadding" trigger="click" :show-arrow="false" :width="200">
      <template #reference>
        <div class="style-edit-iconbtn"><IFontColor :fontColor="fontColor" width="18px" height="18px" /></div>
      </template>
      <div><ChangeColor :color="fontColor" @onChange="handleFontColorChange" /></div>
    </el-popover>

    <el-tooltip content="字号大小">
      <el-input-number v-model="fontNum" class="style-edit-selectbtn" :min="1" :max="10" controls-position="right" @change="handleChange" />
    </el-tooltip>
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

    <el-popover placement="bottom-start" popper-class="popover-nopadding" trigger="click" :show-arrow="false" :width="200">
      <template #reference>
        <div class="style-edit-iconbtn"><IBorderColor :fontColor="borderColor" width="18px" height="18px" /></div>
      </template>
      <div><ChangeColor :color="borderColor" @onChange="handleBorderColorChange" /></div>
    </el-popover>

    <el-tooltip content="边框圆角">
      <el-input-number v-model="borderRadius" class="style-edit-selectbtn" :min="1" :max="10" controls-position="right" @change="handleBorderRadiusChange" />
    </el-tooltip>
  </el-row>

  <div class="style-edit-rowmargin style-edit-rowname">连线</div>
  <el-row class="style-edit-rowmargin">
    <el-tooltip content="连线宽度">
      <el-select v-model="lineWidth" class="style-edit-selectbtn" placeholder="Select" @change="handleLineWidthChange">
        <el-option v-for="item in borderWidthOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-tooltip>

    <el-popover placement="bottom-start" popper-class="popover-nopadding" trigger="click" :show-arrow="false" :width="200">
      <template #reference>
        <div class="style-edit-iconbtn"><IBorderColor :fontColor="lineColor" width="18px" height="18px" /></div>
      </template>
      <div><ChangeColor :color="lineColor" @onChange="handleLineColorChange" /></div>
    </el-popover>
  </el-row>

  <div class="style-edit-rowmargin style-edit-rowname">填充和背景</div>
  <el-row class="style-edit-rowmargin">
    <el-popover placement="bottom-start" popper-class="popover-nopadding" trigger="click" :show-arrow="false" :width="200">
      <template #reference>
        <div class="style-edit-iconbtn"><IBorderColor :fontColor="bgColor" width="18px" height="18px" /></div>
      </template>
      <div><ChangeColor :color="bgColor" @onChange="handleBgColorChange" /></div>
    </el-popover>
  </el-row>

  <div class="style-edit-rowmargin style-edit-rowname">预设风格和主题</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import IFontColor from '../../../../icons/i-font-color.vue';
import IBorderColor from '../../../../icons/i-border-color.vue';
import ChangeColor from './modal/change-color.vue';
import emitter from '../../../../utils/event-bus';

const props = defineProps<{
  activeNode: any;
}>();

const exec = (key: string, valueObj?: any) => {
  switch (key) {
    case 'UPDATE_NODE_STYLE':
      emitter.emit('execCommand', key, valueObj);
      break;
    default:
      emitter.emit('execCommand', key, valueObj);
      break;
  }
};

const fontColor = ref(props.activeNode?.nodeData?.data?.fontColor || '#333333');
const handleFontColorChange = (val: string) => {
  fontColor.value = val;
  exec('UPDATE_NODE_STYLE', { fontColor: val });
};

const fontNum = ref(props.activeNode?.nodeData?.data?.fontSize || 12);
const handleChange = (value: number) => {
  fontNum.value = value;
  exec('UPDATE_NODE_STYLE', { fontSize: value });
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
const borderWidth = ref(props.activeNode?.nodeData?.data?.borderWidth || 0);
const handleBorderWidthChange = (value: number) => {
  // console.log(value);
  borderWidth.value = value;
  exec('UPDATE_NODE_STYLE', { borderWidth: value });
};
const borderColor = ref(props.activeNode?.nodeData?.data?.borderColor || '#cccccc');
const handleBorderColorChange = (val: string) => {
  borderColor.value = val;
  exec('UPDATE_NODE_STYLE', { borderColor: val });
};

const borderStyleOptions = [
  { label: '无', value: '' },
  { label: '实线', value: 'solid' },
  { label: '虚线', value: 'dotted' },
  { label: '点线', value: 'dot' },
  { label: '双线', value: 'double' },
];
const borderStyle = ref(props.activeNode?.nodeData?.data?.borderStyle || 'solid');
const handleBorderStyleChange = (value: string) => {
  console.log(value);
  borderStyle.value = value;
};

const borderRadius = ref(props.activeNode?.nodeData?.data?.borderRadius || 0);
const handleBorderRadiusChange = (value: number) => {
  borderRadius.value = value;
  exec('UPDATE_NODE_STYLE', { borderRadius: value });
};

const lineWidth = ref(props.activeNode?.nodeData?.data?.lineWidth || 1);
const handleLineWidthChange = (value: number) => {
  lineWidth.value = value;
  exec('UPDATE_NODE_STYLE', { lineWidth: value });
};
const lineColor = ref(props.activeNode?.nodeData?.data?.lineColor || '#cccccc');
const handleLineColorChange = (value: string) => {
  lineColor.value = value;
  exec('UPDATE_NODE_STYLE', { lineColor: value });
};

const bgColor = ref(props.activeNode?.nodeData?.data?.bgColor || '#ffffff');
const handleBgColorChange = (value: string) => {
  bgColor.value = value;
  exec('UPDATE_NODE_STYLE', { bgColor: value });
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
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #6a89cc;
  }
}
.style-edit-selectbtn {
  width: 80px;
  margin-right: 4px;
}
</style>

<style lang="less" global>
.popover-nopadding {
  padding: 0 !important;
}
</style>
