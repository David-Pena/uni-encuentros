<script setup lang="ts">
import { ref } from "vue";
import { SignedOut, SignedIn, UserButton, SignInButton, SignUpButton } from "vue-clerk";
import Hero from "../components/Hero.vue";
import Footer from "../components/landing/Footer.vue";
import ThemeToggle from "../components/ThemeToggle.vue";

const features = ref([
  {
    title: "Gestión de Eventos",
    description: "Crea y gestiona eventos universitarios con facilidad",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>`,
  },
  {
    title: "Invitaciones Inteligentes",
    description: "Envía y rastrea invitaciones automáticamente",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>`,
  },
  {
    title: "Gestión de Presentadores",
    description: "Organiza y coordina con los presentadores del evento",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
        clip-rule="evenodd"
      />
    </svg>`,
  },
]);
</script>

<template>
  <div class="min-h-screen">
    <!-- Navbar -->
    <nav class="bg-transparent backdrop-blur-sm border-gray-200 fixed w-full z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0 flex items-center">
              <span
                class="ml-2 text-xl font-bold text-gray-900 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text"
              >
                Uni<span class="text-primary">Encuentros</span>
              </span>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <SignedOut>
              <SignInButton
                mode="modal"
                class="btn bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Iniciar Sesión
              </SignInButton>
              <SignUpButton mode="modal" class="btn btn-primary"> Registrarse </SignUpButton>
            </SignedOut>
            <SignedIn>
              <router-link to="/dashboard" class="btn btn-primary mr-4">
                Panel de Control
              </router-link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <Hero />

    <!-- Features Section -->
    <div id="features" class="py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900">
            Todo lo que necesitas para gestionar eventos universitarios
          </h2>
          <p class="mt-4 text-xl text-gray-600">
            Herramientas potentes diseñadas específicamente para la gestión de eventos
            académicos
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="p-6 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200"
          >
            <div
              class="w-12 h-12 bg-gradient-to-r from-primary via-primary-light to-secondary rounded-lg flex items-center justify-center text-white mb-4"
              v-html="feature.icon"
            ></div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>
