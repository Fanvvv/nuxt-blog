<template>
  <div font-mono dark:text-gray-300 >
    <h1 text-center>标签</h1>
    <div mt-10 flex flex-wrap>
      <span v-for="item in sortedTags" v-motion-pop h-4 px-4 py-2 mx-5 my-5 border-2 rounded-2xl shadow-lg shadow-gray-900 dark:shadow-gray-300>
        <NuxtLink :to="`/tags/${item}`" capitalize font-bold><span text-blue-600 >
          {{ item }}</span>&nbsp;({{ tagCount[item] }})
        </NuxtLink>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface TagObj {
  [key: string]: number;
}
// 获取所有文章的标签
const { data } = await useAsyncData("tags", () => queryContent("posts").only(["tags"]).find())
// 用于收集标签的个数
const tagCount = ref<TagObj>({})
const tagData = unref(data)
if (Array.isArray(tagData)) {
  tagData.forEach((item) => {
    item.tags.forEach((tag: string) => {
      if (tag in tagCount.value) {
        tagCount.value[tag] += 1
      } else {
        tagCount.value[tag] = 1
      }
    })
  })
}
// 标签排序
const sortedTags = Object.keys(tagCount.value).sort((a, b) => tagCount.value[b] - tagCount.value[a])
</script>
