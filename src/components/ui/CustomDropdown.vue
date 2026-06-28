<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  options: { type: Array, required: true },
  placeholder: { type: String, default: 'Pilih...' },
})
const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const rootRef = ref(null)

const selectedLabel = computed(() => {
  const found = props.options.find((o) => o.value === props.modelValue)
  return found ? found.label : props.placeholder
})

function select(opt) {
  console.log('select dipanggil, opt:', opt, 'isOpen sebelum:', isOpen.value)
  emit('update:modelValue', opt.value)
  isOpen.value = false
  console.log('isOpen sesudah:', isOpen.value)
}

function onClickOutside(e) {
  if (rootRef.value && !rootRef.value.contains(e.target)) isOpen.value = false
}
onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>

<template>
  <div class="dropdown" ref="rootRef">
    <button type="button" class="trigger" :class="{ placeholder: !modelValue }" @click="isOpen = !isOpen">
      <span>{{ selectedLabel }}</span>
      <svg class="chevron" :class="{ open: isOpen }" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <ul v-if="isOpen" class="options">
      <li v-for="opt in options" :key="opt.value" :class="{ active: opt.value === modelValue }" @click="select(opt)">
        {{ opt.label }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.dropdown { position: relative; width: 100%; }
.trigger { width: 100%; display: flex; justify-content: space-between; align-items: center; font-family: var(--font-body); font-size: 14px; color: var(--color-text-primary); background: transparent; border: none; border-bottom: 2px solid var(--color-border); padding: 8px 2px; cursor: pointer; text-align: left; }
.trigger.placeholder span { color: var(--color-text-secondary); }
.chevron { transition: transform 0.2s ease; color: var(--color-text-secondary); flex-shrink: 0; margin-left: 8px; }
.chevron.open { transform: rotate(180deg); }
.options {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  z-index: 20;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  list-style: none;
  max-height: 220px;
  overflow-y: auto;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
  scrollbar-width: none;
}
.options::-webkit-scrollbar {
  display: none;
}
.options li { padding: 10px 14px; font-size: 13px; color: var(--color-text-primary); cursor: pointer; transition: background 0.15s ease; }
.options li:hover { background: var(--color-bg); }
.options li.active { background: var(--color-sakura); color: var(--color-sakura-text); font-weight: 600; }
</style>