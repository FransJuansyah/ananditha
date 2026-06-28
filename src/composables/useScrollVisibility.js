import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollVisibility(threshold = 100) {
  const isVisible = ref(false)

  function handleScroll() {
    isVisible.value = window.scrollY > threshold
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return { isVisible }
}