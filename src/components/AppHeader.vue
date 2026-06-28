<script setup>
import { useScrollVisibility } from '../composables/useScrollVisibility'
import logo from '../assets/images/logo/logo.png' // ganti sesuai nama file logo asli

const { isVisible } = useScrollVisibility(100)

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <header class="app-header" :class="{ visible: isVisible }">
    <button class="logo-button" @click="scrollToTop" aria-label="Kembali ke atas">
      <img :src="logo" alt="Ananditha Makeup" />
    </button>
  </header>
</template>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 16px 0;
  z-index: 100;
  opacity: 0;
  transform: translateY(-12px);
  pointer-events: none;
  transition: opacity 0.4s ease, transform 0.4s ease;
  background: linear-gradient(to bottom, var(--color-bg) 0%, transparent 100%);
}

.app-header.visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.logo-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.logo-button img {
  height: 48px;
  display: block;
}

@media (min-width: 768px) {
  .logo-button img {
    height: 72px;
  }
}
</style>