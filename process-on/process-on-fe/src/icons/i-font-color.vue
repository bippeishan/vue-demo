<template>
  <svg t="1669684541948" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6362" :width="width" :height="height">
    <path d="M839 768H735.3l-74.1-192.7H358.6L288.7 768H185L461.8 64h100.4L839 768zM632.1 495.8L522.3 203.1c-3.4-9.4-7.2-25.7-11.3-49.1h-2.3c-3.4 21.2-7.4 37.6-11.7 49.1L388.1 495.8h244z" fill="#333" p-id="6363"></path>
    <path d="M64 832h896v128H64z" :fill="fontColor" p-id="6364"></path>
  </svg>
</template>

<script setup lang="ts">
defineProps({
  fontColor: {
    type: String,
    default: '#333',
  },
  width: {
    type: String,
    default: '14px',
  },
  height: {
    type: String,
    default: '14px',
  },
});
</script>

<style lang="less" scoped></style>
