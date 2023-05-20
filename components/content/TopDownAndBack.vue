<style scoped>
.fixed-container {
  @apply fixed right-8 bottom-8 hidden flex-col gap-3 md:flex md:block;
}
.dark-hover {
  @apply dark:text-gray-100 hover:cursor-pointer;
}
.btn-nem {
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 53px;
  background: linear-gradient(145deg, #ffffff, #e6e6e6);
  box-shadow:  6px 6px 12px #666666,
              -6px -6px 12px #ffffff;
}
.btn-nem:hover {
  border-radius: 53px;
  background: linear-gradient(145deg, #ffffff, #e6e6e6);
  box-shadow:  5px 5px 4px #666666,
              -5px -5px 4px #ffffff;
}
.dark .btn-nem {
  border-radius: 53px;
  background: linear-gradient(145deg, #191919, #151515);
  box-shadow:  6px 6px 12px #090909,
              -6px -6px 12px #252525;
}
.dark .btn-nem:hover {
  border-radius: 53px;
  background: linear-gradient(145deg, #191919, #151515);
  box-shadow:  5px 5px 4px #090909,
              -5px -5px 4px #252525;
}
</style>

<template>
  <div class="fixed-container">
    <button class="btn-nem dark-hover" @click="goToTop" v-show="showTop">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24"
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="#000000" 
        dark:stroke="#F3F4F6" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      >
        <path d="M17 11l-5-5-5 5M17 18l-5-5-5 5"/>
      </svg>
    </button>
    <button class="btn-nem dark-hover" @click="goToDown" v-show="showDown">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="#000000" 
        dark:stroke="#F3F4F6" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      >
        <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
      </svg>
    </button>
    <button class="btn-nem dark-hover" @click="router.back()">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="#000000"
        dark:stroke="#F3F4F6" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8l-4 4 4 4M16 12H9"/>
      </svg>
    </button>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter()
const showTop = ref(false)
const showDown = ref(false)
onMounted(() => {
  const handleWindowScroll = () => {
    // 判断离顶部的距离
    if (window.scrollY > 80) showTop.value = true
    else showTop.value = false
    // 判断是否到达页面底部
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    console.log(scrollTop, clientHeight, scrollHeight)
    if (scrollTop + clientHeight >= scrollHeight) showDown.value = false
    else showDown.value = true
  }
  // 首次进入页面执行一次
  handleWindowScroll()
  // 监听滚动事件
  useEventListener(window, 'scroll', handleWindowScroll)
})

const goToTop = () => {
  document.documentElement.scrollTop = 0
}
const goToDown = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  })
}
</script>
