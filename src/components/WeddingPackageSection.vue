<script setup>
const phone = '628971424117'

const packages = [
  {
    key: 'single',
    title: 'Akad/Resepsi',
    note: '(Single Event)',
    price: '1.800k',
    features: ['Retouch by Owner', 'Premium Softlens (Normal Size)', 'Free Transport (Palembang Area)'],
    ctaLabel: 'Book Wedding',
    highlight: false,
  },
  {
    key: '1day',
    title: 'Akad-Resepsi',
    note: '(1 Hari Acara)',
    price: '2.000k',
    features: ['Sudah termasuk retouch by owner', 'Sudah termasuk softlens premium', 'Sudah termasuk transport PP'],
    ctaLabel: 'Reserve Date',
    highlight: true,
    badge: 'Premium Choice',
  },
  {
    key: '2days',
    title: 'Akad-Resepsi',
    note: '(2 Hari Acara)',
    price: '2.500k',
    features: ['Full Service (2 Days)', 'Premium Softlens (Normal Size)', 'Free Transport (Palembang Area)'],
    ctaLabel: 'Book Wedding',
    highlight: false,
  },
]

const terms = [
  'Home service minimal 2 (dua) orang',
  'Belum termasuk transport PP ke lokasi klien (Gratis transport di studio owner)',
  'DP 50% dari total keseluruhan, pelunasan H-1',
  'Cancel sepihak maka DP dianggap hangus',
  'Cancel H-7 s/d H-1 wajib melunasi seluruh total biaya',
  'Garansi tanggal maks 1x (menyesuaikan jadwal tersedia)',
  'Add-ons: Retouch +150k | Softlens +70k | Hairdo +200k',
  'Jika MUA berhalangan (urgent/sakit), klien bersedia DP dikembalikan penuh atau diganti MUA rekanan yang tersedia.',
]

function waLink(pkg) {
  const text = `Halo Ananditha Makeup, saya tertarik dengan paket ${pkg.title} ${pkg.note}.`
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
}
</script>

<template>
  <section class="wedding" id="wedding">
    <p class="eyebrow">Your Eternal Glow Starts Here</p>
    <h2>Wedding Packages</h2>

    <div class="cards">
      <div v-for="pkg in packages" :key="pkg.key" class="card" :class="{ highlight: pkg.highlight }">
        <span v-if="pkg.badge" class="badge">{{ pkg.badge }}</span>
        <h3>{{ pkg.title }}</h3>
        <p class="note">{{ pkg.note }}</p>
        <p class="price">{{ pkg.price }}</p>
        <ul class="features">
          <li v-for="f in pkg.features" :key="f">{{ f }}</li>
        </ul>
        <button class="cta" @click="openBooking('wedding_' + pkg.key)">{{ pkg.ctaLabel }}</button>
      </div>
    </div>

    <div class="terms">
      <h4>Terms & Conditions</h4>
      <ul>
        <li v-for="(t, i) in terms" :key="i">{{ t }}</li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.wedding { padding: 64px 24px; max-width: 1080px; margin: 0 auto; text-align: center; }
.eyebrow { font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--color-sakura-text); font-weight: 600; }
h2 { margin: 8px 0 32px; font-size: 28px; font-style: italic; }
.cards { display: grid; grid-template-columns: 1fr; gap: 20px; margin-bottom: 48px; }
@media (min-width: 768px) { .cards { grid-template-columns: repeat(3, 1fr); } }
.card { position: relative; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 16px; padding: 28px 24px; text-align: left; }
.card.highlight { border: 2px solid var(--color-butter); }
.badge { position: absolute; top: -12px; left: 24px; background: var(--color-butter); color: var(--color-butter-text); font-size: 11px; font-weight: 600; padding: 4px 12px; border-radius: 999px; }
h3 { font-size: 20px; font-style: italic; }
.note { font-size: 13px; color: var(--color-text-secondary); margin: 4px 0 12px; }
.price { font-size: 24px; font-weight: 600; margin-bottom: 16px; }
.features { list-style: none; margin-bottom: 24px; font-size: 13px; color: var(--color-text-secondary); }
.features li { padding: 4px 0; }
.features li::before { content: '✓ '; color: var(--color-sakura-text); }
.cta { display: block; text-align: center; background: var(--color-sakura); color: var(--color-sakura-text); font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.04em; padding: 12px; border-radius: 999px; text-decoration: none; transition: transform 0.25s ease; }
.cta:hover { transform: translateY(-2px); }

.terms { text-align: left; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 16px; padding: 24px 28px; }
.terms h4 { font-family: var(--font-body); font-size: 14px; margin-bottom: 12px; }
.terms ul { list-style: none; font-size: 13px; color: var(--color-text-secondary); line-height: 1.6; }
.terms li { padding: 4px 0; }
.terms li::before { content: '★ '; color: var(--color-butter-text); }
</style>