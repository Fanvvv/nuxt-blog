import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  meta: {
    title: 'Fan\' Bolg',
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/images/favicon.ico' },
    ],
  },
  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt'
  ]
})
