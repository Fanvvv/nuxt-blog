import { defineNuxtConfig } from 'nuxt/config'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Fan\' Bolg',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/images/favicon.ico' },
      ],
    }
  },
  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@nuxt/content',
    '@nuxtjs/color-mode',
  ],
  content: {
    highlight: {
      theme: 'vitesse-dark',
    },
    markdown: {
      toc: {
        depth: 3,
      },
    },
    documentDriven: true,
  },
})
