<template>
  <div flex justify-between mt-10 pt-10 border-t-2 dark:border-gray-300>
    <NuxtLink v-if="prev" :to="prev._path" flex items-center dark:text-gray-300>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="23" height="23" 
        viewBox="0 0 23 23" 
        fill="none" 
        stroke="#000000" 
        dark:stroke="#D1D5DB"
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      >
        <path d="M19 12H6M12 5l-7 7 7 7"/>
      </svg>
      <span ml-4> 上一篇：{{ prev.title }} </span>
    </NuxtLink>
    <NuxtLink v-else flex items-center hover:cursor-not-allowed text-gray-400 dark:text-gray-600>
      <svg
        xmlns="http://www.w3.org/2000/svg" 
        width="23" height="23" 
        viewBox="0 0 23 23" 
        fill="none" 
        stroke="#9CA3AF" 
        dark:stroke="#4B5563"
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      >
        <path d="M19 12H6M12 5l-7 7 7 7"/>
      </svg>
      <span ml-4> 已经是第一篇啦！ </span>
    </NuxtLink>
    <NuxtLink v-if="next" :to="next._path" flex items-center dark:text-gray-300>
      <span mr-4> 下一篇：{{ next.title }} </span>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="23" 
        height="23" 
        viewBox="0 0 23 23" 
        fill="none" 
        stroke="#000000" 
        dark:stroke="#D1D5DB"
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      >
        <path d="M5 12h13M12 5l7 7-7 7"/>
      </svg>
    </NuxtLink>
    <NuxtLink v-else flex items-center hover:cursor-not-allowed text-gray-400 dark:text-gray-600>
      <span mr-4> 已经是最后一篇啦！ </span>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="23" 
        height="23" 
        viewBox="0 0 23 23" 
        fill="none" 
        stroke="#9CA3AF" 
        dark:stroke="#4B5563"
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      >
        <path d="M5 12h13M12 5l7 7-7 7"/>
      </svg>
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
defineProps(["prev", "next"])
</script>
