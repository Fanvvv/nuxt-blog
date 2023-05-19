<template>
  <div h-screen mx-a max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0 font-sans>
    <TheHeader />
    <main min-h="[calc(100vh-290px)]">
      <slot />
    </main>
    <TheFooter />
    <!-- <Plum /> -->
    <Sun v-show="theme !== 'dark' && width > 1000" v-motion-roll-visible-right />
    <!-- <StarSky v-show="theme === 'dark'" /> -->
    <Moon v-show="theme === 'dark' && width > 1000" v-motion-roll-visible-right />
  </div>
</template>

<script setup lang="ts">
import useTheme from '~/composables/useTheme'

const { theme } = useTheme()

const { width } = useWindowSize()
</script>
