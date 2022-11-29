const useReadingProgress = () => {
  const progress = ref(0)

  const updateScroll = () => {
    // 已经滚动的高度
    const currentScrollY = window.scrollY
    // 可以滚动的高度
    let scrollHeight = document.body.scrollHeight - window.innerHeight
    if (scrollHeight) {
      progress.value = Number((currentScrollY / scrollHeight).toFixed(2)) * 100
    }
  }

  onMounted(() => {
    // 添加全局滚动事件的监听
    window.addEventListener('scroll', updateScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', updateScroll)
  })

  return { progress }
}

export default useReadingProgress

