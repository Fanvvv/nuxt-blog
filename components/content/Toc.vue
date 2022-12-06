<template>
  <div fixed left-10 text-sm hidden xl2:block max-w-60>
    <ul ref="ulRef" list-none>
      <li v-for="item in links" :key="item.id">
        <a :href="`#${item.id}`" border-b border-gray-1 hover:border-gray-4 dark:border-gray-4 hover:dark:border-gray-1 transition-all >{{ item.text }}</a>
        <ul v-if="item.children && item.children.length" my-1 list-none p-0 pl-4>
          <li v-for="child in item.children" :key="child.text">
            <a :href="`#${child.id}`" border-b border-gray-1 hover:border-gray-4 dark:border-gray-4 hover:dark:border-gray-1 transition-all >
              {{ child.text }}
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script lang='ts' setup>
const router = useRouter()
const { toc } = useContent()
const { links } = toc.value

const ulRef = ref<HTMLUListElement>()
onMounted(() => {
  const navigate = () => {
    if (location.hash) {
      document.querySelector(decodeURIComponent(location.hash))
        ?.scrollIntoView({ behavior: 'smooth' })
    }
  }
  const handleAnchors = (
    event: MouseEvent & { target: HTMLElement },
  ) => {
    const link = event.target.closest('a')
    if (
      !event.defaultPrevented
      && link
      && event.button === 0
      && link.target !== '_blank'
      && link.rel !== 'external'
      && !link.download
      && !event.metaKey
      && !event.ctrlKey
      && !event.shiftKey
      && !event.altKey
    ) {
      const url = new URL(link.href)
      if (url.origin !== window.location.origin)
        return
      event.preventDefault()
      const { pathname, hash } = url
      if (hash && (!pathname || pathname === location.pathname)) {
        window.history.replaceState({}, '', hash)
        navigate()
      }
      else {
        router.push({ path: pathname, hash })
      }
    }
  }
  useEventListener(window, 'hashchange', navigate)
  useEventListener(ulRef.value!, 'click', handleAnchors, { passive: false })
  navigate()
  setTimeout(navigate, 500)
})
</script>
