<template>
  <color-picker theme="light" :color="color" @changeColor="changeColor" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import colorPicker from '@bipeishan/vue-colorpicker';

const props = defineProps<{
  color: string;
}>();
const emit = defineEmits(['onChange']);

const color = ref(props.color);
const changeColor = (val: any) => {
  color.value = val.hex;
  emit('onChange', val.hex);
};
</script>

<style lang="less" scoped></style>
