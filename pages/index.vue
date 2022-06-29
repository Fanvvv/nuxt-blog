<template>
  <div relative z-5 fcc h="[calc(100vh-150px)]">
    <div px-4 text-3xl md:text-4xl ref="divRef">
      <span op-0 transition-opacity v-for="(item, index) in title" :key="index" :style="`transition-delay: ${0.2 * (index + 1)}s`">{{ item }}</span>
    </div>
    <div nextAnimate @click="handleScorll">👇</div>
  </div>
</template>

<script lang="ts" setup>
const title = ref("星河随风而至，落日踏霞而归")

const divRef = ref(null)
onMounted(() => {
  divRef.value?.classList.add('show')
})

const handleScorll = () => {
  const clock = setInterval(() => {
    document.documentElement.scrollTop <= window.innerHeight ? document.documentElement.scrollTop += 10 : clearInterval(clock)
    document.documentElement.scrollTop + document.documentElement.clientHeight === document.documentElement.scrollHeight && clearInterval(clock)
  }, 1)
}
</script>

<style scoped>
.show > span{
  opacity: 1;
}
</style>
