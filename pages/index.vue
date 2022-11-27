<template>
  <div relative z-5 fc flex-col min-h="[calc(100vh-330px)]" ref="heightRef">
    <div my-30 w-40 h-40 border-rounded-4>
      <img w-40 h-40 border-rounded-40 transition-all duration-500 ease-in-out class="hover" src="/images/me.png" alt="" />
    </div>
    <div ref="divRef" px-4 text-center text-3xl md:text-4xl dark:text-gray-100>
      <span op-0 transition-opacity font-mono v-for="(item, index) in title" :key="index" :style="`transition-delay: ${0.2 * (index + 1)}s`">{{ item }}</span>
    </div>
    <!-- <div nextAnimate @click="handleScorll"><span icon-btn text-10 :class="randomIcon()"></span></div> -->
  </div>
</template>

<script lang="ts" setup>
// const title = ref("星河随风而至，落日踏霞而归")
const title = ref("不是一个厉害的 FrontEnd Developer")

const divRef = ref(null)
onMounted(() => {
  divRef.value?.classList.add('show')
})

const heightRef = ref(null)
const handleScorll = () => {
  const height = heightRef.value?.offsetHeight
  // 盒子高度 + 100vh所减去的高度
  document.documentElement.scrollTop = height + 140
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
.hover:hover {
  transition: transform 0.5s;
  transform: scale(1.5);
}
</style>
