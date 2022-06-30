import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import type { Shortcut } from 'unocss'

const customShortcuts: Shortcut[] = [
  ['nextAnimate', 'absolute bottom-5 cursor-pointer animate-bounce-alt animate-count-infinite animate-duration-1s']
]

export default defineConfig({
  shortcuts: [
    ...customShortcuts,
    ['fc', 'flex items-center'],
    ['fcc', 'flex items-center justify-center'],
    ['fcb', 'flex items-center justify-between'],
    ['f-cc', 'flex flex-col items-center'],
    ['f-cb', 'flex flex-col justify-between'],
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-700 text-white cursor-pointer hover:bg-teal-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: 'prose prose-sm m-auto text-left'.split(' '),
})
