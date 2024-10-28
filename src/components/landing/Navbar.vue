<script setup lang="ts">
import { ref } from "vue";
import { SignedIn, UserButton } from "vue-clerk";
import ThemeToggle from "../ThemeToggle.vue";

const isMenuOpen = ref(false);

const navigation = [
  { name: "Inicio", href: "#hero" },
  { name: "Sobre", href: "#about" },
  { name: "Demo", href: "#demo" },
];

const closeMenu = () => {
  isMenuOpen.value = false;
};

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};
</script>

<template>
  <nav
    class="fixed bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 w-full z-10"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <span
              class="text-xl font-bold text-gray-900 dark:text-light bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text"
            >
              Uni<span class="text-primary-light">Encuentros</span>
            </span>
          </div>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center justify-center flex-1">
          <div class="flex space-x-8">
            <a
              v-for="item in navigation"
              :key="item.name"
              :href="item.href"
              class="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light px-3 py-2 text-sm font-medium transition-colors"
              @click.prevent="scrollToSection(item.href.replace('#', '') || 'inicio')"
            >
              {{ item.name }}
            </a>
          </div>
        </div>

        <!-- Right side buttons -->
        <div class="hidden md:flex items-center space-x-4">
          <SignedIn>
            <router-link to="/dashboard" class="btn btn-primary"> Ingresar </router-link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <ThemeToggle />
        </div>

        <!-- Mobile menu button -->
        <div class="flex items-center md:hidden">
          <ThemeToggle />
          <button
            @click="isMenuOpen = !isMenuOpen"
            class="inline-flex items-center justify-center p-2 ml-3 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              :class="[isMenuOpen ? 'hidden' : 'block', 'h-6 w-6']"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              :class="[isMenuOpen ? 'block' : 'hidden', 'h-6 w-6']"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div
      :class="[
        isMenuOpen ? 'block' : 'hidden',
        'md:hidden absolute inset-x-0 top-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg z-50',
      ]"
    >
      <div class="px-2 pt-2 pb-3 space-y-1">
        <a
          v-for="item in navigation"
          :key="item.name"
          :href="item.href"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          @click.prevent="
            scrollToSection(item.href.replace('#', '') || 'inicio');
            closeMenu();
          "
        >
          {{ item.name }}
        </a>
        <div class="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
          <SignedIn>
            <router-link
              to="/dashboard"
              class="w-full btn btn-primary text-center"
              @click="closeMenu"
            >
              Ingresar
            </router-link>
            <div class="mt-4 flex justify-center">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
        </div>
      </div>
    </div>
  </nav>
</template>
