<script setup>
// ganti dengan 2 file crop asli: hero-desktop.jpg & hero-mobile.jpg
import heroDesktop from '../assets/images/hero/hero-desktop.jpg'
import heroMobile from '../assets/images/hero/hero-mobile.jpg'
import { useBooking } from '../composables/useBooking'
const { openBooking } = useBooking()
</script>

<template>
  <section class="hero">
    <picture class="hero-photo">
      <source media="(min-width: 768px)" :srcset="heroDesktop" />
      <img :src="heroMobile" alt="Hasil makeup oleh Ananditha Makeup" />
    </picture>

    <div class="hero-content">
      <h1>Transforming Faces<br />with Confidence</h1>
      <p>Spesialis makeup muslim-friendly dengan sentuhan elegan dan modern.</p>
      <button class="cta" @click="openBooking('')">Book Your Makeup</button>
    </div>

    <div class="hero-fade"></div>
  </section>
</template>

<style scoped>
.hero { position: relative; width: 100%; height: 100vh; overflow: hidden; }

.hero-photo { position: absolute; inset: 0; z-index: 1; }
.hero-photo img {
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: center 45%;
  display: block;
}

.hero-content {
  position: relative; z-index: 3; height: 100%;
  display: flex; flex-direction: column; justify-content: center; align-items: flex-start;
  text-align: left; padding: 0 24px 0 32px; color: #fff;
  transform: translateY(28%);
}

.hero-content h1 {
  font-size: clamp(28px, 5vw, 48px);
  font-style: italic;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.35);
}

.hero-content p {
  margin-top: 12px; max-width: 340px; font-size: 15px;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
}

.cta {
  margin-top: 24px;
  background: var(--color-sakura);
  color: var(--color-sakura-text);
  font-family: var(--font-body);
  font-weight: 600; font-size: 14px; letter-spacing: 0.04em; text-transform: uppercase;
  padding: 14px 32px; border-radius: 999px; text-decoration: none;
  transition: transform 0.25s ease;
}
.cta:hover { transform: translateY(-2px); }

.hero-fade {
  position: absolute; left: 0; right: 0; bottom: 0; height: 30%; z-index: 2;
  background: linear-gradient(to bottom, transparent, var(--color-bg));
}

@media (min-width: 768px) {
  .hero-photo img {
    object-position: center 45%;
    transform: none;
  }

  .hero-content {
    align-items: flex-start;
    justify-content: center;
    text-align: left;
    padding: 0 24px 0 84px;
    transform: translateX(18%);
  }

  .hero-content p {
    max-width: 380px;
  }
}
</style>