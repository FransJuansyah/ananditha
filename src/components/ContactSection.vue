<script setup>
import mapsImg from '../assets/images/maps/maps.png' // ganti sesuai nama file asli
</script>

<template>
  <section class="contact" id="contact">
    <div class="cta-block">
      <h2>Let's Enhance Your Glow</h2>
      <p>Siap untuk tampil memukau di hari spesial Anda? Hubungi kami untuk konsultasi jadwal dan detail paket.</p>
      <div class="buttons">
        <a class="icon-btn whatsapp" href="https://wa.me/628971424117" target="_blank" rel="noopener" aria-label="Hubungi via WhatsApp" title="Hubungi via WhatsApp">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2a10 10 0 0 0-8.48 15.21L2 22l4.93-1.47A10 10 0 1 0 12 2zm0 18a7.98 7.98 0 0 1-4.06-1.11l-.29-.17-2.92.87.87-2.85-.19-.3A8 8 0 1 1 12 20zm4.62-5.95c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.55.12-.16.25-.63.81-.78.98-.14.16-.29.18-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.22-1.46-1.37-1.71-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.12-.15.16-.25.25-.41.08-.16.04-.3-.02-.42-.06-.12-.55-1.36-.76-1.86-.2-.48-.4-.42-.55-.43h-.47c-.16 0-.42.06-.64.3-.22.25-.84.82-.84 1.99s.86 2.3.98 2.46c.12.16 1.68 2.56 4.07 3.59.57.25 1.02.4 1.37.52.57.18 1.08.16 1.49.1.45-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.28z"/>
          </svg>
        </a>
        <a class="icon-btn instagram" href="https://www.instagram.com/ananditha.makeup/" target="_blank" rel="noopener" aria-label="Follow Instagram Kami" title="Follow Instagram Kami">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5zM17.75 6.5a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25z"/>
          </svg>
        </a>
        <a class="icon-btn tiktok" href="https://www.tiktok.com/@ananditha.makeup" target="_blank" rel="noopener" aria-label="Follow TikTok Kami" title="Follow TikTok Kami">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M16.7 3a6.8 6.8 0 0 0 1.92 4.1 7.4 7.4 0 0 0 4.38 1.45v3.1a10.2 10.2 0 0 1-4.9-1.18v5.7a5.84 5.84 0 1 1-5.84-5.84c.22 0 .44.02.65.05v3.24a2.58 2.58 0 1 0 1.84 2.46V3h1.95z"/>
          </svg>
        </a>
      </div>
    </div>

    <div class="studio-block">
      <h3>Kunjungi Studio Kami</h3>
      <p>Datang langsung untuk konsultasi gratis atau sesi makeup di studio kami yang nyaman dan privat.</p>
      <address>Perumahan Grand City, Blok A-12,<br />Kota Palembang, Sumatera Selatan.</address>
      <a class="maps-link" href="https://maps.app.goo.gl/HRQF5dAz8A9RD9Ms7" target="_blank" rel="noopener">
        <img :src="mapsImg" alt="Lokasi Studio Ananditha Makeup" />
        <span>Lihat di Google Maps →</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.contact { padding: 64px 24px; max-width: 1080px; margin: 0 auto; }
.cta-block { text-align: center; margin-bottom: 56px; }
.cta-block h2 { font-size: 28px; font-style: italic; margin-bottom: 12px; }
.cta-block p { max-width: 420px; margin: 0 auto 24px; color: var(--color-text-secondary); font-size: 14px; }
.buttons { display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; }
.icon-btn {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
  box-shadow: 0 10px 22px rgba(58, 42, 46, 0.08);
}
.icon-btn svg { width: 24px; height: 24px; fill: currentColor; }
.icon-btn.whatsapp,
.icon-btn.instagram,
.icon-btn.tiktok {
  background: var(--color-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
}
.icon-btn:hover { transform: translateY(-2px); }

.studio-block { text-align: center; }
.studio-block h3 { font-size: 20px; font-style: italic; margin-bottom: 8px; }
.studio-block p { color: var(--color-text-secondary); font-size: 14px; max-width: 420px; margin: 0 auto 12px; }
address { font-style: normal; font-size: 14px; margin-bottom: 20px; line-height: 1.6; }
.maps-link { display: inline-block; text-decoration: none; color: var(--color-text-primary); }
.maps-link img { width: 100%; max-width: 400px; border-radius: 12px; display: block; margin: 0 auto 8px; }
.maps-link span { font-size: 13px; font-weight: 600; color: var(--color-sakura-text); }
</style>