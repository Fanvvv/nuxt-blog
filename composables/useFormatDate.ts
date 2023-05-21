import { useDateFormat } from '@vueuse/core'

const useFormatDate = (date: string) => {
  // const options: Intl.DateTimeFormatOptions = {
  //   year: 'numeric',
  //   month: 'long',
  //   day: 'numeric',
  // }
  // const now = new Date(date).toLocaleDateString('zh-CN', options)
  // return now

  // 上述方式在手机中有显示 bug，也可以使用 moment.js 库来格式化
  const formatted = useDateFormat(date, 'YYYY年MM月DD日', { locales: 'zh-CN' })
  return formatted.value
}

export default useFormatDate
