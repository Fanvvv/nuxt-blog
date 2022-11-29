<template>
  <div fixed top-0 left-0 h-1 w-full bg-gradient-to-r from-purple-500 to-pink-500 backdrop-blur-3xl transition-transform duration-150 :style="`transform: translateX(${progress - 100}%)`"></div>
</template>

<script lang="ts" setup>
const { progress } = useReadingProgress()
</script>
