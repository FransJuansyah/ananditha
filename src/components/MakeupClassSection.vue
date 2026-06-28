<script setup>
const phone = '628971424117'

const courses = [
  {
    key: 'basic-to-pro',
    title: 'Basic to Pro Course',
    note: 'Specialized for Career Development',
    tiers: [
      { label: '1x Pertemuan', price: '1.500k' },
      { label: '3x Pertemuan', price: '3.700k', badge: 'Best Value' },
      { label: '5x Pertemuan', price: '4.000k' },
    ],
    includes: ['Certificate', 'Muse & Attire', 'Goodie Bag', 'Documentation'],
    ctaLabel: 'Consult Now',
    waText: 'Halo Ananditha Makeup, saya tertarik dengan Basic to Pro Course.',
  },
  {
    key: 'self-makeup',
    title: 'Self Makeup Class',
    note: 'Perfect for Hobbyists & Daily Look',
    tiers: [
      { label: '1x Pertemuan', price: '400k' },
      { label: '3x Pertemuan', price: '1.000k', badge: 'Popular' },
    ],
    includes: ['Personalized Technique', 'Color Theory & Brush Knowledge', 'Food & Beverages'],
    ctaLabel: 'Start Learning',
    waText: 'Halo Ananditha Makeup, saya ingin belajar Self Makeup Class.',
  },
]

function waLink(course) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(course.waText)}`
}
</script>

<template>
  <section class="class" id="class">
    <p class="eyebrow">Education & Mastery</p>
    <h2>Makeup Class</h2>

    <div class="cards">
      <div v-for="course in courses" :key="course.key" class="card">
        <h3>{{ course.title }}</h3>
        <p class="note">{{ course.note }}</p>

        <div class="tiers">
          <div v-for="tier in course.tiers" :key="tier.label" class="tier">
            <span v-if="tier.badge" class="badge">{{ tier.badge }}</span>
            <span class="tier-label">{{ tier.label }}</span>
            <span class="tier-price">{{ tier.price }}</span>
          </div>
        </div>

        <p class="includes-title">Course Includes:</p>
        <ul class="includes">
          <li v-for="item in course.includes" :key="item">{{ item }}</li>
        </ul>

        <a class="cta" :href="waLink(course)" target="_blank" rel="noopener">{{ course.ctaLabel }}</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.class { padding: 64px 24px; max-width: 1080px; margin: 0 auto; text-align: center; }
.eyebrow { font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--color-sakura-text); font-weight: 600; }
h2 { margin: 8px 0 32px; font-size: 28px; font-style: italic; }
.cards { display: grid; grid-template-columns: 1fr; gap: 20px; }
@media (min-width: 768px) { .cards { grid-template-columns: repeat(2, 1fr); } }
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 28px 24px;
  text-align: left;
  display: flex;
  flex-direction: column;
  height: 100%;
}
h3 { font-size: 20px; font-style: italic; }
.card h3,
.card .note {
  text-align: center;
  width: 100%;
}

.note { font-size: 13px; color: var(--color-text-secondary); margin: 4px 0 20px; }
.tiers { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px; }
.tier { position: relative; flex: 1; min-width: 100px; background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 10px; padding: 12px; text-align: center; }
.badge { position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: var(--color-butter); color: var(--color-butter-text); font-size: 10px; font-weight: 600; padding: 2px 10px; border-radius: 999px; white-space: nowrap; }
.tier-label { display: block; font-size: 12px; color: var(--color-text-secondary); margin-bottom: 4px; }
.tier-price { display: block; font-weight: 600; font-size: 15px; }
.includes-title { font-size: 13px; font-weight: 600; margin-bottom: 8px; }
.includes { list-style: none; margin-bottom: 24px; font-size: 13px; color: var(--color-text-secondary); }
.includes li { padding: 4px 0; }
.includes li::before { content: '✓ '; color: var(--color-sakura-text); }
.cta {
  display: block;
  text-align: center;
  background: var(--color-sakura);
  color: var(--color-sakura-text);
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