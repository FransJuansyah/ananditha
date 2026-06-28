<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  photos: { type: Array, required: true },
  index: { type: Number, required: true },
})
const emit = defineEmits(['close', 'update:index'])
const lightboxRef = ref(null)

onMounted(() => lightboxRef.value?.focus())

function prev() {
  emit('update:index', (props.index - 1 + props.photos.length) % props.photos.length)
}
function next() {
  emit('update:index', (props.index + 1) % props.photos.length)
}
function onKeydown(e) {
  if (e.key === 'Escape') emit('close')
  if (e.key === 'ArrowLeft') prev()
  if (e.key === 'ArrowRight') next()
}
</script>

<template>
  <div
    class="lightbox"
    ref="lightboxRef"
    tabindex="0"
    @keydown="onKeydown"
    @click.self="$emit('close')"
  >
    <button class="close" @click="$emit('close')" aria-label="Tutup">&times;</button>
    <button class="nav prev" @click="prev" aria-label="Foto sebelumnya">&lsaquo;</button>
    <img :src="photos[index].src" :alt="`Hasil makeup ${photos[index].category}`" />
    <button class="nav next" @click="next" aria-label="Foto selanjutnya">&rsaquo;</button>
    <div class="counter">{{ index + 1 }} / {{ photos.length }}</div>
  </div>
</template>

<style scoped>
.lightbox {
  position: fixed; inset: 0; z-index: 200; outline: none;
  display: flex; align-items: center; justify-content: center;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(8px);
}
.lightbox img { max-width: 85vw; max-height: 85vh; border-radius: 8px; object-fit: contain; }
.close { position: absolute; top: 20px; right: 20px; background: none; border: none; color: #fff; font-size: 32px; cursor: pointer; line-height: 1; }
.nav { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,0.15); border: none; color: #fff; font-size: 28px; width: 44px; height: 44px; border-radius: 50%; cursor: pointer; }
.prev { left: 20px; }
.next { right: 20px; }
.counter { position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); color: #fff; font-size: 13px; font-family: var(--font-body); }
</style>