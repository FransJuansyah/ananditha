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

function categoryLabel(key) {
  return categories.find(c => c.key === key)?.label ?? key
}

const categoryCounts = computed(() =>
  Object.fromEntries(categories.map(cat => [cat.key, photos.filter(p => p.category === cat.key).length]))
)

const vReveal = {
  mounted(el) {
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('is-visible')
        io.unobserve(el)
      }
    }, { threshold: 0.15 })
    io.observe(el)
  },
}
</script>

<template>
  <section class="gallery" id="gallery">
    <p class="eyebrow">Our Portfolio</p>
    <h2>Gallery</h2>

    <div class="filters">
      <button class="pill" :class="{ active: activeFilter === 'all' }" @click="activeFilter = 'all'">
        Semua <span class="count">{{ photos.length }}</span>
      </button>
      <button
        v-for="cat in categories" :key="cat.key"
        class="pill" :class="{ active: activeFilter === cat.key }"
        @click="activeFilter = cat.key"
      >{{ cat.label }} <span class="count">{{ categoryCounts[cat.key] }}</span></button>
    </div>

    <TransitionGroup v-if="displayedPhotos.length" tag="div" name="fade" class="masonry">
      <button v-for="photo in displayedPhotos" :key="photo.id" v-reveal class="masonry-item" @click="openLightbox(photo)">
        <img :src="photo.src" :alt="`Hasil makeup ${photo.category}`" loading="lazy" />
        <span class="overlay">
          <span class="overlay-label">{{ categoryLabel(photo.category) }}</span>
        </span>
      </button>
    </TransitionGroup>
    <p v-else class="empty">Belum ada foto di kategori ini.</p>

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
.gallery { padding: 64px 24px; max-width: 1080px; margin: 0 auto; text-align: center; }
.eyebrow { font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--color-sakura-text); font-weight: 600; }
h2 { margin: 8px 0 32px; font-size: 28px; font-style: italic; }
.filters { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 28px; justify-content: center; }
.pill { font-family: var(--font-body); font-size: 13px; font-weight: 500; color: var(--color-text-secondary); background: transparent; border: 1px solid var(--color-border); border-radius: 999px; padding: 8px 18px; cursor: pointer; transition: all 0.25s ease; }
.pill:hover { border-color: var(--color-sakura); color: var(--color-text-primary); }
.pill.active { background: var(--color-sakura); border-color: var(--color-sakura); color: var(--color-sakura-text); box-shadow: 0 4px 14px -4px var(--color-sakura); }
.count { font-size: 11px; opacity: 0.7; }
.masonry { column-count: 2; column-gap: 14px; text-align: initial; }
@media (min-width: 640px) { .masonry { column-count: 3; } }
@media (min-width: 1024px) { .masonry { column-count: 4; } }
.masonry-item {
  position: relative;
  display: block;
  width: 100%;
  margin-bottom: 14px;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px -4px rgba(0, 0, 0, 0.15);
  transition: transform 0.25s ease, box-shadow 0.25s ease, opacity 0.5s ease;
  opacity: 0;
  transform: translateY(16px);
}
.masonry-item.is-visible { opacity: 1; transform: translateY(0); }
.masonry-item:hover { transform: translateY(-3px); box-shadow: 0 10px 20px -8px rgba(0, 0, 0, 0.25); }
.masonry-item img { width: 100%; display: block; transition: transform 0.4s ease; }
.masonry-item:hover img { transform: scale(1.04); }
.overlay {
  position: absolute; inset: 0;
  display: flex; align-items: flex-end;
  padding: 12px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.55), transparent 60%);
  opacity: 0;
  transition: opacity 0.25s ease;
}
.masonry-item:hover .overlay { opacity: 1; }
.overlay-label { color: #fff; font-size: 12px; font-weight: 600; letter-spacing: 0.03em; text-transform: capitalize; }
.empty { color: var(--color-text-secondary); font-size: 14px; padding: 32px 0; }
.fade-move,
.fade-enter-active,
.fade-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.masonry-item.fade-enter-from,
.masonry-item.fade-leave-to { opacity: 0; transform: translateY(8px); }
.fade-leave-active { position: absolute; }
</style>
