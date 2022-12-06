<template>
  <color-picker theme="light" :color="color" @changeColor="changeColor" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import colorPicker from '@bipeishan/vue-colorpicker';

// const props = defineProps<{
//   color: string;
// }>();
const emit = defineEmits(['onChange']);

const color = ref('#59c7f9');
const changeColor = (val: any) => {
  //   const { r, g, b, a } = val.rgba;
  //   this.color = `rgba(${r}, ${g}, ${b}, ${a})`;
  emit('onChange', val.hex);
};
</script>

<style lang="less" scoped></style>
