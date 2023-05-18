<template>
  <article v-for="article in list" py-6 my-2 border-gray border-b-2>
    <header>
      <h2>
        <NuxtLink :to="article._path">{{ article.title }}</NuxtLink>
      </h2>
      <div mt-2 text-sm flex flex-col md:flex-row md:items-center>
        <time text-grey-dark mr-1>{{ useFormatDate(article.createtime) }}</time>
        <span hidden md:block text-grey-dark text-sm mx-1> | </span>
        <ul list-none p-0 flex content-center mt-2 md:mt-0>
          <li v-for="item in article.tags">
            <NuxtLink :to="article._path" font-bold mr-2 md:ml-1 text-blue-6 hover:text-blue-2 transition-all>{{ useToUpperCase(item) }}</NuxtLink>
          </li>
        </ul>
      </div>
    </header>
    <p md:text-lg mt-4 md:mt-2>{{ article.description }}</p>
    <div mt-3>
      <NuxtLink :to="article._path" font-bold text-blue-6 hover:text-blue-2 transition-all>阅读更多...</NuxtLink>
    </div>
  </article>
</template>

<script lang="ts" setup>
import type { Article } from '~/types/Article'

interface Props {
  list: Article[]
}

const props = withDefaults(defineProps<Props>(), {
  list: () => []
})
</script>
