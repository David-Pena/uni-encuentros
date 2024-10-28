<script setup lang="ts">
import { ref } from "vue";
import { useParallax } from "@vueuse/core";

const targetRef = ref(null);
const { tilt, roll } = useParallax(targetRef);
</script>

<template>
  <div
    id="hero"
    class="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
  >
    <div
      ref="targetRef"
      class="relative text-center z-20 max-w-4xl mx-auto pt-16 md:pt-20"
      :style="{
        transform: `perspective(1000px) rotateX(${tilt * 10}deg) rotateY(${roll * 10}deg)`,
        transition: 'transform 0.3s ease-out',
      }"
    >
      <h2 class="text-5xl md:text-7xl font-bold text-accent-white mb-6 drop-shadow-md">
        Uni<span class="text-primary">Encuentros</span>
      </h2>
      <p class="text-lg md:text-2xl text-accent-gray mb-12 max-w-2xl mx-auto">
        Transformando la gestión de eventos académicos con herramientas intuitivas y eficientes
        para una experiencia universitaria más conectada.
      </p>
      <div class="space-x-4">
        <a
          href="#demo"
          class="bg-primary hover:bg-primary-light text-light px-6 md:px-8 py-3 rounded-full text-base md:text-lg transition-colors inline-flex items-center group font-bold"
        >
          Demo
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>
