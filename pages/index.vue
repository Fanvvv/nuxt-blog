<template>
  <div relative z-5 fcc h="[calc(100vh-150px)]">
    <div px-4 text-3xl md:text-4xl ref="divRef" dark:text-gray-100>
      <span op-0 transition-opacity v-for="(item, index) in title" :key="index" :style="`transition-delay: ${0.2 * (index + 1)}s`">{{ item }}</span>
    </div>
    <div nextAnimate @click="handleScorll"><span icon-btn text-10 :class="randomIcon()"></span></div>
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

const iconArr = ['i-twemoji-carousel-horse', 'i-twemoji-carp-streamer', 'i-twemoji-bullseye', 'i-twemoji-clown-face', 'i-twemoji-confetti-ball', 'i-twemoji-cloud-with-snow']
const randomIcon = () => {
  return iconArr[Math.floor(Math.random() * iconArr.length)]
}
</script>

<style scoped>
.show > span {
  opacity: 1;
}
</style>
