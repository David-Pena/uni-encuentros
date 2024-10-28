<script setup lang="ts">
import Hero from "../components/Hero.vue";
import Footer from "../components/landing/Footer.vue";
import Navbar from "../components/landing/Navbar.vue";
import Features from "../components/landing/Features.vue";
import Demo from "../components/landing/Demo.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-grow">
      <Hero />
      <Features />
      <Demo />
    </main>
    <Footer />
  </div>
</template>
