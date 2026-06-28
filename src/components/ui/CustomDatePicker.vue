<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({ modelValue: { type: String, default: '' } })
const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const rootRef = ref(null)
const today = new Date()
today.setHours(0, 0, 0, 0)
const viewDate = ref(props.modelValue ? new Date(props.modelValue) : new Date())

const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const monthNames = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']

const monthLabel = computed(() => `${monthNames[viewDate.value.getMonth()]} ${viewDate.value.getFullYear()}`)

const calendarDays = computed(() => {
  const year = viewDate.value.getFullYear()
  const month = viewDate.value.getMonth()
  const startOffset = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const days = []
  for (let i = 0; i < startOffset; i++) days.push(null)
  for (let d = 1; d <= daysInMonth; d++) days.push(new Date(year, month, d))
  return days
})

function formatDate(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const displayValue = computed(() => {
  if (!props.modelValue) return ''
  const [y, m, d] = props.modelValue.split('-')
  return `${d}/${m}/${y}`
})

function isPast(date) { return date < today }
function isToday(date) { return formatDate(date) === formatDate(today) }
function isSelected(date) { return formatDate(date) === props.modelValue }

function selectDay(date) {
  if (!date || isPast(date)) return
  emit('update:modelValue', formatDate(date))
  isOpen.value = false
}

function prevMonth() { viewDate.value = new Date(viewDate.value.getFullYear(), viewDate.value.getMonth() - 1, 1) }
function nextMonth() { viewDate.value = new Date(viewDate.value.getFullYear(), viewDate.value.getMonth() + 1, 1) }

function onClickOutside(e) {
  if (rootRef.value && !rootRef.value.contains(e.target)) isOpen.value = false
}
onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>

<template>
  <div class="datepicker" ref="rootRef">
    <button type="button" class="trigger" :class="{ placeholder: !modelValue }" @click="isOpen = !isOpen">
      <span>{{ displayValue || 'Pilih Tanggal' }}</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" />
      </svg>
    </button>

    <div v-if="isOpen" class="calendar">
      <div class="cal-header">
        <button type="button" @click="prevMonth">&lsaquo;</button>
        <span>{{ monthLabel }}</span>
        <button type="button" @click="nextMonth">&rsaquo;</button>
      </div>
      <div class="cal-daynames"><span v-for="d in dayNames" :key="d">{{ d }}</span></div>
      <div class="cal-grid">
        <button
          v-for="(day, i) in calendarDays" :key="i" type="button" class="cal-day"
          :class="{ empty: !day, past: day && isPast(day), today: day && isToday(day), selected: day && isSelected(day) }"
          :disabled="!day || isPast(day)" @click="selectDay(day)"
        >{{ day ? day.getDate() : '' }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.datepicker { position: relative; width: 100%; }
.trigger { width: 100%; display: flex; justify-content: space-between; align-items: center; font-family: var(--font-body); font-size: 14px; color: var(--color-text-primary); background: transparent; border: none; border-bottom: 2px solid var(--color-border); padding: 8px 2px; cursor: pointer; text-align: left; }
.trigger.placeholder span { color: var(--color-text-secondary); }
.trigger svg { color: var(--color-text-secondary); flex-shrink: 0; margin-left: 8px; }
.calendar { position: absolute; top: calc(100% + 6px); left: 0; z-index: 20; width: 260px; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 14px; padding: 14px; box-shadow: 0 8px 24px rgba(0,0,0,0.18); }
.cal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; font-size: 13px; font-weight: 600; color: var(--color-text-primary); }
.cal-header button { background: none; border: none; font-size: 16px; color: var(--color-sakura-text); cursor: pointer; padding: 2px 8px; }
.cal-daynames { display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; font-size: 10px; color: var(--color-text-secondary); margin-bottom: 6px; }
.cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; }
.cal-day { aspect-ratio: 1; border: none; background: none; font-size: 12px; color: var(--color-text-primary); border-radius: 8px; cursor: pointer; }
.cal-day:hover:not(:disabled) { background: var(--color-bg); }
.cal-day.empty { visibility: hidden; }
.cal-day.past { color: var(--color-border); cursor: not-allowed; }
.cal-day.today { border: 1px solid var(--color-sakura); }
.cal-day.selected { background: var(--color-sakura); color: var(--color-sakura-text); font-weight: 700; }
</style>