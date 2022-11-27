import { isDark } from '~/composables/dark'
import { useStorage  } from '@vueuse/core'

const useTheme = () => {
  const theme = ref('dark')
  onMounted(() => {
    theme.value = useStorage('vueuse-color-scheme', '').value
  })
  watch(isDark, (newValue) => {
    theme.value = newValue ? 'dark' : 'auto'
  })
  return {
    isDark,
    theme
  }
}

export default useTheme
