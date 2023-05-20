<style scoped>
.article-border {
  @apply py-6 my-2 border-gray border-b-2;
}
.sub {
  @apply mt-2 text-sm flex flex-col md:flex-row md:items-center;
}
.divider-style {
  @apply hidden md:block text-grey-dark text-sm mx-1;
}
.ul-none {
  @apply list-none p-0 flex content-center mt-2 md:mt-0;
}
.tags-item {
  @apply font-bold mr-2 md:ml-1 text-blue-6 hover:text-blue-2 transition-all;
}
.read-more {
  @apply font-bold text-blue-6 hover:text-blue-2 transition-all;
}
</style>
<template>
  <article v-for="article in list" class="article-border">
    <header>
      <h2>
        <NuxtLink :to="article._path">{{ article.title }}</NuxtLink>
      </h2>
      <div class="sub">
        <time text-grey-dark mr-1>{{ useFormatDate(article.date) }}</time>
        <span class="divider-style"> | </span>
        <ul class="ul-none">
          <li v-for="(item, index) in article.tags">
            <NuxtLink :to="`/tags/${article.tags[index]}`" class="tags-item">
              {{ useToUpperCase(item) }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </header>
    <p md:text-lg mt-4 md:mt-2>{{ article.description }}</p>
    <div mt-3>
      <NuxtLink :to="article._path" class="read-more">
        阅读更多...
      </NuxtLink>
    </div>
  </article>
</template>

<script lang="ts" setup>
import type { Article } from '~/types/Article'

interface Props {
  list: Article[]
}

withDefaults(defineProps<Props>(), {
  list: () => []
})
</script>
