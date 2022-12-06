<template>
  <div fixed right-8 bottom-8 hidden flex-col gap-3 md:flex md:block>
    <button dark:text-gray-100 hover:cursor-pointer class="btn-nem" @click="goToTop" v-show="show">top</button>
    <button dark:text-gray-100 hover:cursor-pointer class="btn-nem" @click="router.back()">back</button>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter()
const show = ref(false)
onMounted(() => {
  const handleWindowScroll = () => {
    if (window.scrollY > 80) show.value = true
    else show.value = false
  }
  useEventListener(window, 'scroll', handleWindowScroll)
})

const goToTop = () => {
  document.documentElement.scrollTop = 0
}
</script>

<style scoped>
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
