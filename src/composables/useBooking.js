import { reactive, ref, computed } from 'vue'

const SUPABASE_URL = 'https://hheznuewqsjivaftudsx.supabase.co'
const SUPABASE_KEY = 'sb_publishable_k7KDABTtf1Ae-E85fI8A2Q_rkJ6CrsA'
const TABLE_NAME = 'schedules'

export const SERVICE_OPTIONS = [
  { value: 'regular', label: 'Regular (Wisuda, Pas Photo, Ijazah)' },
  { value: 'glamour', label: 'Glamour (Engagement, Prewed, Pageant)' },
  { value: 'premium', label: 'Premium (Bridesmaid, Tasyakuran, Party)' },
  { value: 'wedding_single', label: 'Wedding - Akad/Resepsi (Single Event)' },
  { value: 'wedding_1day', label: 'Wedding - Akad-Resepsi (1 Hari Acara)' },
  { value: 'wedding_2days', label: 'Wedding - Akad-Resepsi (2 Hari Acara)' },
]

const isOpen = ref(false)
const isAdminOpen = ref(false)
const prefilledService = ref('')
const bookedDates = reactive([])
const isLoading = ref(false)

function authHeaders(extra = {}) {
  return {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    ...extra,
  }
}

async function loadSchedules() {
  isLoading.value = true
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE_NAME}?select=*`, { headers: authHeaders() })
    const data = await res.json()
    bookedDates.splice(0, bookedDates.length, ...data)
  } catch (err) {
    console.error('Gagal mengambil jadwal:', err)
  } finally {
    isLoading.value = false
  }
}

function todayStr() {
  return new Date().toISOString().split('T')[0]
}

// Hanya tampilkan jadwal hari ini & ke depan (yang lewat disembunyikan dari tampilan,
// TIDAK dihapus dari database — karena ini data bersama, bukan per-browser lagi)
const sortedSchedules = computed(() =>
  [...bookedDates]
    .filter((item) => item.date >= todayStr())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
)

loadSchedules()

export function useBooking() {
  function openBooking(serviceValue = '') {
    prefilledService.value = serviceValue
    isOpen.value = true
  }

  function closeBooking() {
    isOpen.value = false
    isAdminOpen.value = false
  }

  function toggleAdmin() {
    isAdminOpen.value = !isAdminOpen.value
  }

  async function addSchedule({ date, time, event }) {
    if (!date || !time || !event) return false
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/${TABLE_NAME}`, {
        method: 'POST',
        headers: authHeaders({ 'Content-Type': 'application/json', Prefer: 'return=minimal' }),
        body: JSON.stringify({ date, time, event }),
      })
      await loadSchedules()
      return true
    } catch (err) {
      console.error('Gagal menambah jadwal:', err)
      return false
    }
  }

  async function removeSchedule(item) {
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/${TABLE_NAME}?id=eq.${item.id}`, {
        method: 'DELETE',
        headers: authHeaders(),
      })
      await loadSchedules()
    } catch (err) {
      console.error('Gagal menghapus jadwal:', err)
    }
  }

  async function copyScheduleData() {
    const code = JSON.stringify(bookedDates, null, 2)
    await navigator.clipboard.writeText(code)
  }

  return {
    isOpen, isAdminOpen, prefilledService, sortedSchedules, isLoading,
    openBooking, closeBooking, toggleAdmin,
    addSchedule, removeSchedule, copyScheduleData,
  }
}