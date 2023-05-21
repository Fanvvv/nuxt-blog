const useFormatDate = (date: string) => {
  // const options: Intl.DateTimeFormatOptions = {
  //   year: 'numeric',
  //   month: 'long',
  //   day: 'numeric',
  // }
  // const now = new Date(date).toLocaleDateString('zh-CN', options)
  // return now

  // toLocaleDateString 在手机中有显示 bug
  const newDate = new Date(date)
  const year = newDate.getFullYear()
  const month = newDate.getMonth() + 1
  const day = newDate.getDate()
  const now = year + '年' + month + '月' + day + '日'
  return now
}

export default useFormatDate
