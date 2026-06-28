<script setup>
import AppHeader from './components/AppHeader.vue'
import HeroSection from './components/HeroSection.vue'
import GallerySection from './components/GallerySection.vue'
import PriceListSection from './components/PriceListSection.vue'
import MakeupClassSection from './components/MakeupClassSection.vue'
import WeddingPackageSection from './components/WeddingPackageSection.vue'
import BrandsSection from './components/BrandsSection.vue'
import ContactSection from './components/ContactSection.vue'
import BookingModal from './components/BookingModal.vue'
</script>

<template>
  <AppHeader />
  <BookingModal />
  <main>
    <HeroSection />
    <GallerySection />
    <PriceListSection />
    <MakeupClassSection />
    <WeddingPackageSection />
    <BrandsSection />
    <ContactSection />
  </main>
</template>