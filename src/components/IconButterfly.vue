<script setup>
defineProps({ size: { type: Number, default: 24 } })
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
    <path d="M32 20 C26 6 8 4 4 14 C0 24 10 34 22 30 C26 28.5 30 24.5 32 20 Z" />
    <path d="M32 20 C38 6 56 4 60 14 C64 24 54 34 42 30 C38 28.5 34 24.5 32 20 Z" />
    <path d="M32 24 C26 38 8 44 4 36 C0 28 10 22 22 25 C26 26 30 24.8 32 24 Z" />
    <path d="M32 24 C38 38 56 44 60 36 C64 28 54 22 42 25 C38 26 34 24.8 32 24 Z" />
    <rect x="30.5" y="14" width="3" height="34" rx="1.5" />
  </svg>
</template>