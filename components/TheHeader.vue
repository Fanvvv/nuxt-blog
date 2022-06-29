<template>
  <div f-cb>
    <header fcb py-10>
      <div fcb>
        <img h15 mr-1 src="/images/logo.png" alt="">
        <span text-2xl font-serif>' Blog</span>
      </div>
      <div fc text-base leading-5>
        <NuxtLink
          v-for="route in routes"
          :key="route.path"
          :to="route.path"
          ml-5
        >
          <span text-gray-900>{{ route.name }}</span>
        </NuxtLink>
      </div>
    </header>
  </div>
</template>

<script lang="ts" setup>
const routes = reactive([
  { name: "文章", path: "/posts" },
  { name: "标签", path: "/tags" },
  { name: "关于", path: "/about" }
])
</script>
