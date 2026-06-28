<script setup>
import { ref, watch, onUnmounted } from 'vue'
import { useBooking, SERVICE_OPTIONS } from '../composables/useBooking'
import AdminScheduleModal from './AdminScheduleModal.vue'
import CustomDropdown from './ui/CustomDropdown.vue'
import CustomDatePicker from './ui/CustomDatePicker.vue'

const TIME_OPTIONS = []
for (let h = 6; h <= 22; h++) {
  for (const m of [0, 30]) {
    if (h === 22 && m === 30) continue
    const hh = String(h).padStart(2, '0')
    const mm = String(m).padStart(2, '0')
    TIME_OPTIONS.push({ value: `${hh}:${mm}`, label: `${hh}:${mm}` })
  }
}

const { isOpen, isAdminOpen, prefilledService, sortedSchedules, closeBooking, toggleAdmin } = useBooking()
const phone = '628971424117'

const form = ref({ name: '', whatsapp: '', date: '', time: '', service: '', location: '', notes: '' })

watch(isOpen, (val) => {
  if (val) {
    form.value = { name: '', whatsapp: '', date: '', time: '', service: prefilledService.value, location: '', notes: '' }
  }
})

watch(isOpen, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})

onUnmounted(() => {
  document.body.style.overflow = ''
})

function formatScheduleDate(dateStr) {
  const [y, m, d] = dateStr.split('-')
  const date = new Date(y, m - 1, d)
  return { day: date.getDate(), month: date.toLocaleString('id-ID', { month: 'short' }).toUpperCase() }
}

function handleSubmit() {
  if (!form.value.date || !form.value.time || !form.value.service) {
    alert('Mohon lengkapi tanggal, jam, dan layanan.')
    return
  }
  const serviceLabel = SERVICE_OPTIONS.find(s => s.value === form.value.service)?.label || form.value.service
  const message =
    `Halo Ananditha Makeup, saya ingin melakukan reservasi:\n\n` +
    `*Nama:* ${form.value.name}\n` +
    `*Tanggal:* ${formatDateLong(form.value.date)}\n` +
    `*Jam:* ${form.value.time}\n` +
    `*Layanan:* ${serviceLabel}\n` +
    `*Lokasi:* ${form.value.location}\n` +
    `*Catatan:* ${form.value.notes || '-'}\n\n` +
    `Mohon info ketersediaan jadwalnya ya. Terima kasih!`
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank')
  closeBooking()
}
function formatDateLong(dateStr) {
  if (!dateStr) return ''
  const [y, m, d] = dateStr.split('-')
  const date = new Date(y, m - 1, d)
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}
</script>

<template>
  <div v-if="isOpen" class="backdrop" @click.self="closeBooking" @keydown.esc="closeBooking" tabindex="0">
    <div class="panel">
      <button class="close" @click="closeBooking" aria-label="Tutup">&times;</button>

      <aside class="schedule-side">
        <div class="schedule-header">
          <h3>Upcoming Schedule</h3>
          <button class="admin-dot" @click="toggleAdmin" aria-label="Admin">·</button>
        </div>
        <ul class="schedule-list">
          <li v-for="item in sortedSchedules" :key="item.date + item.event">
            <div class="date-badge">
              <span class="month">{{ formatScheduleDate(item.date).month }}</span>
              <span class="day">{{ formatScheduleDate(item.date).day }}</span>
            </div>
            <div class="info">
              <p class="event">{{ item.event }}</p>
              <p class="time">{{ item.time }}</p>
            </div>
          </li>
          <li v-if="sortedSchedules.length === 0" class="empty">Belum ada jadwal terisi.</li>
        </ul>
      </aside>

      <div class="form-side">
        <h2>Reservation Form</h2>
        <p class="subtitle">Lengkapi data berikut untuk reservasi jadwal Anda</p>

        <form @submit.prevent="handleSubmit">
          <label>Nama Lengkap
            <input v-model="form.name" type="text" required placeholder="Masukkan nama Anda" />
          </label>

          <div class="row">
            <label>Nomor WhatsApp
              <input v-model="form.whatsapp" type="tel" required placeholder="0812..." />
            </label>
            <div class="field">Tanggal Acara
              <CustomDatePicker v-model="form.date" />
            </div>
            <div class="field">Jam Acara
              <CustomDropdown v-model="form.time" :options="TIME_OPTIONS" placeholder="Pilih Jam" />
            </div>
          </div>
          <div class="field">Pilih Layanan
            <CustomDropdown v-model="form.service" :options="SERVICE_OPTIONS" placeholder="-- Pilih Paket --" />
          </div>

          <label>Lokasi Acara
            <input v-model="form.location" type="text" required placeholder="Alamat lengkap atau nama gedung..." />
          </label>

          <label>Detail Alamat / Catatan
            <textarea v-model="form.notes" rows="2"
              placeholder="Contoh: Makeup untuk kulit sensitif, tema hijab minimalis, dll"></textarea>
          </label>

          <button type="submit" class="submit-btn">Kirim Permintaan Booking</button>
          <p class="disclaimer">*Anda akan diarahkan ke WhatsApp untuk finalisasi jadwal dan pembayaran uang muka (DP).
          </p>
        </form>
      </div>
    </div>

    <AdminScheduleModal v-if="isAdminOpen" />
  </div>
</template>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  z-index: 300;
  background: rgba(20, 10, 12, 0.55);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  overflow-y: auto;
}

.panel {
  position: relative;
  width: 100%;
  max-width: 860px;
  background: var(--color-bg);
  border-radius: 20px;
  display: grid;
  grid-template-columns: 1fr;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 90vh;
  -webkit-overflow-scrolling: touch;
}

.panel {
  scrollbar-width: none;
}

.panel::-webkit-scrollbar {
  display: none;
}

@media (min-width: 768px) {
  .panel {
    grid-template-columns: 260px 1fr;
  }
}

.close {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
  background: rgba(0, 0, 0, 0.15);
  border: none;
  color: #fff;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
}

.schedule-side {
  background: var(--color-sakura);
  color: var(--color-sakura-text);
  padding: 28px 24px;
  overflow-y: auto;
}

.schedule-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.schedule-header h3 {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 18px;
}

.admin-dot {
  background: none;
  border: none;
  color: transparent;
  font-size: 10px;
  cursor: default;
  padding: 4px;
  transition: color 0.3s ease;
}

.schedule-side:hover .admin-dot {
  color: rgba(0, 0, 0, 0.18);
  cursor: pointer;
}

.schedule-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.schedule-list li {
  display: flex;
  gap: 10px;
  align-items: center;
  background: rgba(0, 0, 0, 0.18);
  border-radius: 14px;
  padding: 10px;
}

.date-badge {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.22);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.date-badge .month {
  font-size: 9px;
  font-weight: 700;
  color: #fff;
}

.date-badge .day {
  font-size: 16px;
  font-weight: 700;
  line-height: 1;
  color: #fff;
}

.info .event {
  font-size: 13px;
  font-weight: 600;
  color: #fff;
}

.info .time {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.8);
}

.empty {
  font-size: 12px;
  opacity: 0.75;
  font-style: italic;
}

.form-side {
  background: var(--color-surface);
  padding: 32px 28px;
  overflow-y: auto;
}

.form-side h2 {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 24px;
  text-align: center;
}

.subtitle {
  text-align: center;
  font-size: 13px;
  color: var(--color-text-secondary);
  margin: 4px 0 24px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

label,
.field {
  display: flex;
  flex-direction: column;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-secondary);
  font-weight: 600;
  gap: 6px;
}

input,
select,
textarea {
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--color-text-primary);
  background: transparent;
  border: none;
  border-bottom: 2px solid var(--color-border);
  padding: 8px 2px;
  outline: none;
  transition: border-color 0.25s ease;
}

input:focus,
select:focus,
textarea:focus {
  border-color: var(--color-sakura);
}

.row {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

@media (min-width: 600px) {
  .row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }
}

.submit-btn {
  margin-top: 8px;
  background: var(--color-sakura);
  color: var(--color-sakura-text);
  font-weight: 700;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 14px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.25s ease;
}

.submit-btn:hover {
  transform: translateY(-2px);
}

.disclaimer {
  font-size: 10px;
  color: var(--color-text-secondary);
  text-align: center;
  margin-top: 8px;
}
</style>