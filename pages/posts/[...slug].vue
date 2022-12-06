<template>
  <Progress />
  <div class="article" dark:text-gray-300 my-0 mx-auto>
    <ContentDoc>
      <template #empty>
        <h1>404</h1>
        <p>真遗憾，你所访问的页面我没写~~~~</p>
        <h2>/(ㄒoㄒ)/~~</h2>
      </template>
      <template #not-found>
        <h1>404</h1>
        <p>很可惜，你所访问的页面没有找到~~~~</p>
        <h2>😥</h2>
      </template>
    </ContentDoc>
  </div>
  <div mt-10>
    <a font-mono opacity-50 hover:opacity-75 text-lg border-gray border-b dark:text-gray-300 hover:cursor-pointer @click="router.back()">cd ..</a>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter()
</script>
