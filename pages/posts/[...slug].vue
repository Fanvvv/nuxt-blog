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
</template>
