<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useBrandLogos } from '../composables/useBrandLogos'
const { logos } = useBrandLogos()

const marqueeGroup = ref(null)
const trackOffset = ref(0)
const isPaused = ref(false)

let animationFrameId = 0
let groupWidth = 0
let lastTimestamp = 0

const trackStyle = computed(() => ({
  transform: `translate3d(${trackOffset.value}px, 0, 0)`,
}))

function measureGroupWidth() {
  if (!marqueeGroup.value) return
  groupWidth = marqueeGroup.value.scrollWidth
  trackOffset.value = 0
}

function animate(timestamp) {
  if (!lastTimestamp) lastTimestamp = timestamp

  const elapsed = timestamp - lastTimestamp
  lastTimestamp = timestamp

  if (!isPaused.value && groupWidth > 0) {
    const speed = 60
    trackOffset.value -= (speed * elapsed) / 1000

    if (trackOffset.value <= -groupWidth) {
      trackOffset.value = 0
    }
  }

  animationFrameId = window.requestAnimationFrame(animate)
}

function pauseMarquee() {
  isPaused.value = true
}

function resumeMarquee() {
  isPaused.value = false
}

onMounted(async () => {
  await nextTick()
  measureGroupWidth()
  window.addEventListener('resize', measureGroupWidth)
  animationFrameId = window.requestAnimationFrame(animate)
})

onBeforeUnmount(() => {
  window.cancelAnimationFrame(animationFrameId)
  window.removeEventListener('resize', measureGroupWidth)
})
</script>

<template>
  <section class="brands" id="brands">
    <p class="eyebrow">Professional Tools for Professional Results</p>
    <h2>The Premium Selection</h2>
    <div class="logos" aria-label="Brand names marquee" @mouseenter="pauseMarquee" @mouseleave="resumeMarquee">
      <div class="logos-track" :style="trackStyle">
        <div ref="marqueeGroup" class="logos-group">
          <div v-for="brand in logos" :key="`first-${brand.name}`" class="logo-item">
            <span class="brand-pill">{{ brand.label }}</span>
          </div>
        </div>
        <div class="logos-group" aria-hidden="true">
          <div v-for="brand in logos" :key="`second-${brand.name}`" class="logo-item">
            <span class="brand-pill">{{ brand.label }}</span>
          </div>
        </div>
      </div>
    </div>
    <p class="note">And many more high-quality professional products...</p>
  </section>
</template>

<style scoped>
.brands {
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  padding: 64px 0;
  text-align: center;
  overflow: hidden;
}

.brands > * {
  padding-left: clamp(24px, 4vw, 64px);
  padding-right: clamp(24px, 4vw, 64px);
}
.eyebrow { font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--color-sakura-text); font-weight: 600; }
h2 { margin: 8px 0 32px; font-size: 28px; font-style: italic; }
.logos {
  overflow: hidden;
  margin-bottom: 20px;
  width: 100%;
  padding-left: 0;
  padding-right: 0;
}

.logos-track {
  display: flex;
  width: max-content;
  gap: 32px;
  align-items: center;
  will-change: transform;
}

.logos-group {
  display: flex;
  flex: 0 0 auto;
  gap: 32px;
  align-items: center;
}

.logos:hover .logos-track {
  cursor: pointer;
}

.logo-item {
  flex: 0 0 auto;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  padding: 12px 16px;
  color: var(--color-text-primary);
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 500;
  font-style: italic;
  letter-spacing: 0.02em;
  transition: transform 0.3s ease, color 0.3s ease;
}

.brand-pill:hover {
  transform: translateY(-2px);
  color: var(--color-sakura-text);
}

@keyframes marquee-right {
  from { transform: translateX(-50%); }
  to { transform: translateX(0); }
}

@media (prefers-reduced-motion: reduce) {
  .logos-track {
    transform: translate3d(0, 0, 0);
  }
}
.note { font-size: 13px; color: var(--color-text-secondary); font-style: italic; }
</style>