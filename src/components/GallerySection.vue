<script setup>
import { ref, computed } from 'vue'
import { useGalleryPhotos } from '../composables/useGalleryPhotos'
import PhotoLightbox from './PhotoLightbox.vue'

const { photos, featuredPhotos, categories } = useGalleryPhotos()
const activeFilter = ref('all')

const displayedPhotos = computed(() =>
  activeFilter.value === 'all' ? featuredPhotos : photos.filter(p => p.category === activeFilter.value)
)

const lightboxOpen = ref(false)
const lightboxCategory = ref(null)
const lightboxIndex = ref(0)

const lightboxPhotos = computed(() =>
  lightboxCategory.value ? displayedPhotos.value.filter(p => p.category === lightboxCategory.value) : []
)

function openLightbox(photo) {
  lightboxCategory.value = photo.category
  lightboxIndex.value = lightboxPhotos.value.findIndex(p => p.id === photo.id)
  lightboxOpen.value = true
}
</script>

<template>
  <section class="gallery" id="gallery">
    <div class="filters">
      <button class="pill" :class="{ active: activeFilter === 'all' }" @click="activeFilter = 'all'">Semua</button>
      <button
        v-for="cat in categories" :key="cat.key"
        class="pill" :class="{ active: activeFilter === cat.key }"
        @click="activeFilter = cat.key"
      >{{ cat.label }}</button>
    </div>

    <div class="masonry">
      <button v-for="photo in displayedPhotos" :key="photo.id" class="masonry-item" @click="openLightbox(photo)">
        <img :src="photo.src" :alt="`Hasil makeup ${photo.category}`" loading="lazy" />
      </button>
    </div>

    <PhotoLightbox
      v-if="lightboxOpen"
      :photos="lightboxPhotos"
      :index="lightboxIndex"
      @close="lightboxOpen = false"
      @update:index="lightboxIndex = $event"
    />
  </section>
</template>

<style scoped>
.gallery { padding: 64px 24px; max-width: 1080px; margin: 0 auto; }
.filters { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 28px; justify-content: center; }
.pill { font-family: var(--font-body); font-size: 13px; font-weight: 500; color: var(--color-text-secondary); background: transparent; border: 1px solid var(--color-border); border-radius: 999px; padding: 8px 18px; cursor: pointer; transition: all 0.25s ease; }
.pill:hover { border-color: var(--color-sakura); color: var(--color-text-primary); }
.pill.active { background: var(--color-sakura); border-color: var(--color-sakura); color: var(--color-sakura-text); }
.masonry { column-count: 2; column-gap: 14px; }
@media (min-width: 640px) { .masonry { column-count: 3; } }
@media (min-width: 1024px) { .masonry { column-count: 4; } }
.masonry-item { display: block; width: 100%; margin-bottom: 14px; border: none; background: none; padding: 0; cursor: pointer; border-radius: 8px; overflow: hidden; }
.masonry-item img { width: 100%; display: block; transition: transform 0.4s ease; }
.masonry-item:hover img { transform: scale(1.04); }
</style>
