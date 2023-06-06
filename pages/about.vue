<template>
  <div>
    <div fc flex-col relative ref="heightRef" dark:text-gray-100 >
      <img w-40 h-40 border-rounded-40 transition-all duration-500 ease-in-out src="/images/me.png" alt="" />
      <h1 font-400 text-2xl md:text-3xl mt-5>Fan</h1>
      <span text-base md:text-xl>Front-end Developer</span>
      <div fcc mt-3 text-base leading-5 dark:text-gray-100>
        <a v-for="route in routes" :href="route.href" target="_blank" ml-5>
          <span text-5 icon-btn :class="route.icon"></span>
        </a>
      </div>
      <div w-130 mt-10>
        你好！我是一名前端工程师，这个博客主要记录了一些学习成长笔记。
      </div>
      <!-- <div nextAnimate @click="handleScorll"><span icon-btn text-10 :class="randomIcon()"></span></div> -->
    </div>
    <div mt-7 text-center dark:text-gray-100>
      <h1>我的技术栈</h1>
      <div w-130 grid grid-cols-3 my-0 mx-auto>
        <span v-for="item in skills" w-20 h-4 px-4 py-2 mx-5 my-5 border-2 rounded-2xl shadow-lg shadow-gray-900 dark:shadow-gray-300>
          <span capitalize font-bold text-blue-600>
            {{ item }}
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue'

const heightRef: Ref<HTMLDivElement | null> = ref(null)
const handleScorll = () => {
  console.log(heightRef.value?.offsetHeight);
  
  const height = heightRef.value?.offsetHeight
  // 盒子高度 + 100vh所减去的高度
  document.documentElement.scrollTop = height! + 140
}
const iconArr = ['i-twemoji-carousel-horse', 'i-twemoji-carp-streamer', 'i-twemoji-bullseye', 'i-twemoji-clown-face', 'i-twemoji-confetti-ball', 'i-twemoji-cloud-with-snow']
const randomIcon = () => {
  return iconArr[Math.floor(Math.random() * iconArr.length)]
}

const routes = reactive([
  { name: "邮箱", icon: "i-bi-envelope-fill", href: "mailto:me@fanjs.cn"},
  { name: "github", icon: "i-bi-github", href: "https://github.com/fanvvv" },
  { name: "推特", icon: "i-bi-twitter", href: "https://twitter.com/Fanvvv_" }
])

const skills = ref(['Javascript', 'Vue', 'Nuxt.js', 'Vite', 'Webpack', 'Typescript', 'Koa2'])

</script>
