<script setup lang="ts">
import { SignedOut, SignedIn, UserButton, SignInButton, SignUpButton } from "vue-clerk";
import ThemeToggle from "../ThemeToggle.vue";
</script>

<template>
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
</template>
