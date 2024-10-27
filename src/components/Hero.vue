<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "vue-clerk";
import { useParallax } from "@vueuse/core";

const router = useRouter();
const { isSignedIn } = useAuth();

const targetRef = ref(null);
const { tilt, roll } = useParallax(targetRef);

const navigateToLogin = () => {
  if (isSignedIn.value) {
    router.push("/dashboard");
  }
};
</script>

<template>
  <div class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div
      ref="targetRef"
      class="relative text-center px-4 mt-16 z-20"
      :style="{
        transform: `perspective(1000px) rotateX(${tilt * 10}deg) rotateY(${roll * 10}deg)`,
        transition: 'transform 0.3s ease-out',
      }"
    >
      <h2 class="text-6xl md:text-7xl font-bold text-accent-white mb-6 drop-shadow-md">
        Uni<span class="text-primary">Encuentros</span>
      </h2>
      <p class="text-xl md:text-2xl text-accent-gray mb-12 max-w-2xl mx-auto">
        Transformando la gestión de eventos académicos con herramientas intuitivas y eficientes
        para una experiencia universitaria más conectada.
      </p>
      <div class="space-x-4">
        <a
          href="javascript:void(0)"
          class="bg-primary hover:bg-primary-light text-light px-8 py-3 rounded-full text-lg transition-colors inline-flex items-center group font-bold"
        >
          Ingresar
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
