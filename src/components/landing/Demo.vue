<script setup lang="ts">
import { ref } from "vue";

// You could replace this with an actual video URL
const demoVideoUrl = ref();
</script>

<template>
  <div id="demo" class="py-16 md:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12 md:mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-light">
          Mira UniEncuentros en acción
        </h2>
        <p class="mt-4 text-lg md:text-xl text-gray-600 dark:text-muted">
          Descubre cómo nuestra plataforma simplifica la gestión de eventos académicos
        </p>
      </div>

      <div class="relative max-w-5xl mx-auto">
        <!-- Browser-like frame -->
        <div class="rounded-xl shadow-2xl overflow-hidden bg-white dark:bg-gray-900">
          <!-- Browser header -->
          <div class="bg-gray-100 dark:bg-gray-800 px-4 py-3 flex items-center gap-2">
            <div class="flex gap-2">
              <div class="w-3 h-3 rounded-full bg-red-500"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div class="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div class="flex-1 mx-4">
              <div class="bg-white dark:bg-gray-700 rounded-md h-6 w-full"></div>
            </div>
          </div>

          <!-- Video/Demo content -->
          <div class="aspect-video bg-gray-900 relative">
            <video
              class="w-full h-full object-cover"
              autoplay
              loop
              muted
              playsinline
              :src="demoVideoUrl"
            >
              <source :src="demoVideoUrl" type="video/mp4" />
              Tu navegador no soporta el elemento de video.
            </video>

            <!-- Fallback image or loading state -->
            <div
              v-if="!demoVideoUrl"
              class="absolute inset-0 flex items-center justify-center bg-gray-800"
            >
              <div class="text-center text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-16 w-16 mx-auto mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <p class="text-lg">Video próximamente</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Decorative gradient -->
        <div
          class="absolute left-0 right-0 -bottom-20 h-64 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent z-0 md:-inset-x-20"
        ></div>
      </div>
    </div>
  </div>
</template>
