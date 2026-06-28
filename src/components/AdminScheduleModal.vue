<script setup>
import { ref } from 'vue'
import { useBooking } from '../composables/useBooking'

const { sortedSchedules, toggleAdmin, addSchedule, removeSchedule, copyScheduleData } = useBooking()

const newDate = ref('')
const newTime = ref('')
const newEvent = ref('')
const copied = ref(false)

function handleAdd() {
  const ok = addSchedule({ date: newDate.value, time: newTime.value, event: newEvent.value })
  if (!ok) { alert('Harap isi semua kolom!'); return }
  newDate.value = ''; newTime.value = ''; newEvent.value = ''
}

function handleRemove(item) {
  if (confirm('Hapus jadwal ini dari daftar?')) removeSchedule(item)
}

async function handleCopy() {
  await copyScheduleData()
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}
</script>

<template>
  <div class="admin-backdrop" @click.self="toggleAdmin">
    <div class="admin-panel">
      <div class="admin-header">
        <h3>Manage Schedule</h3>
        <button class="close" @click="toggleAdmin" aria-label="Tutup">&times;</button>
      </div>

      <div class="add-form">
        <input v-model="newDate" type="date" />
        <input v-model="newTime" type="text" placeholder="Waktu (e.g. 08:00 - 12:00)" />
        <input v-model="newEvent" type="text" placeholder="Jenis Acara (e.g. Wedding)" />
        <button class="add-btn" @click="handleAdd">Tambah Jadwal</button>
      </div>

      <p class="list-label">Daftar Jadwal Aktif:</p>
      <div class="admin-list">
        <div v-for="item in sortedSchedules" :key="item.date + item.event" class="admin-item">
          <div>
            <p class="d">{{ item.date }}</p>
            <p class="e">{{ item.event }}</p>
          </div>
          <button class="remove" @click="handleRemove(item)">Remove</button>
        </div>
        <p v-if="sortedSchedules.length === 0" class="empty">Belum ada jadwal.</p>
      </div>

      <div class="copy-row">
        <button class="copy-btn" @click="handleCopy">{{ copied ? 'Tersalin!' : 'Copy Data for Code Update' }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-backdrop { position: fixed; inset: 0; z-index: 400; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; padding: 16px; }
.admin-panel { width: 100%; max-width: 420px; background: var(--color-surface); border-radius: 18px; padding: 24px; max-height: 85vh; overflow-y: auto; }
.admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
.admin-header h3 { font-family: var(--font-display); font-style: italic; font-size: 18px; color: var(--color-sakura-text); }
.close { background: none; border: none; font-size: 20px; color: var(--color-text-secondary); cursor: pointer; }
.add-form { display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; }
.add-form input { font-family: var(--font-body); font-size: 13px; padding: 10px 12px; border: 1px solid var(--color-border); border-radius: 10px; background: var(--color-bg); color: var(--color-text-primary); }
.add-btn { background: var(--color-sakura); color: var(--color-sakura-text); font-weight: 700; font-size: 13px; padding: 10px; border: none; border-radius: 10px; cursor: pointer; }
.list-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-text-secondary); font-weight: 700; margin-bottom: 10px; }
.admin-list { display: flex; flex-direction: column; gap: 8px; max-height: 200px; overflow-y: auto; margin-bottom: 16px; }
.admin-item { display: flex; justify-content: space-between; align-items: center; padding: 10px 12px; background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 10px; }
.admin-item .d { font-size: 12px; font-weight: 700; }
.admin-item .e { font-size: 11px; color: var(--color-text-secondary); }
.remove { background: none; border: none; color: #c0506a; font-weight: 700; font-size: 11px; cursor: pointer; }
.empty { font-size: 12px; color: var(--color-text-secondary); font-style: italic; }
.copy-row { border-top: 1px solid var(--color-border); padding-top: 16px; text-align: center; }
.copy-btn { background: none; border: none; font-size: 11px; color: var(--color-sakura-text); text-decoration: underline; cursor: pointer; }
</style>