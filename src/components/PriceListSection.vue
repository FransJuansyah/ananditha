<script setup>
import { useBooking } from '../composables/useBooking'

const { openBooking } = useBooking()
const phone = '628971424117'

const tiers = [
  {
    key: 'premium',
    title: 'Premium Package',
    description:
      'For your precious & unforgettable moments such as Graduation, Farewell Party, Birthday Party, Aqiqah, Bridesmaid, Sister Bride/Groom, Mom Bride/Groom, and Pageants Event',
    highlight: false,
  },
  {
    key: 'glamour',
    title: 'Glamour Package',
    description:
      "Special for our beloved Bride to Be's events such as engagement, Qur'an recitation, siraman, sangjit, martumpol, prewedding photoshoot and even maternity photoshoot, etc",
    highlight: true,
    badge: 'Most Popular',
  },
  {
    key: 'regular',
    title: 'Regular Package',
    description:
      'For your basic event look, non heavy duty makeup that still enhance your natural beauty',
    highlight: false,
  },
]

function waLink(tier) {
  const text = `Halo Ananditha Makeup, saya tertarik dengan paket ${tier.title}.`
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
}
</script>

<template>
  <section class="price" id="price">
    <p class="eyebrow">Professional Services</p>
    <h2>Makeup Packages</h2>

    <div class="cards">
      <div v-for="tier in tiers" :key="tier.key" class="card" :class="{ highlight: tier.highlight }">
        <span v-if="tier.badge" class="badge">{{ tier.badge }}</span>
        <h3>{{ tier.title }}</h3>
        <p class="description">{{ tier.description }}</p>
        <button class="cta" @click="openBooking(tier.key)">Book Now</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.price { padding: 64px 24px; max-width: 1080px; margin: 0 auto; text-align: center; }
.eyebrow { font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--color-sakura-text); font-weight: 600; }
h2 { margin: 8px 0 32px; font-size: 28px; font-style: italic; }
.cards { display: grid; grid-template-columns: 1fr; gap: 20px; }
@media (min-width: 768px) { .cards { grid-template-columns: repeat(3, 1fr); } }
.card {
  position: relative;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 28px 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.card.highlight { border: 2px solid var(--color-sakura); }
.badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--color-sakura); color: var(--color-sakura-text); font-size: 11px; font-weight: 600; padding: 4px 12px; border-radius: 999px; }
h3 { font-size: 20px; font-style: italic; }
.description { font-size: 14px; color: var(--color-text-secondary); margin: 8px 0 24px; line-height: 1.7; }
.cta {
  display: block;
  text-align: center;
  background: var(--color-butter);
  color: var(--color-butter-text);
  font-weight: 600;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 12px;
  border-radius: 999px;
  text-decoration: none;
  transition: transform 0.25s ease;
  margin-top: auto;
}
.cta:hover { transform: translateY(-2px); }
</style>
