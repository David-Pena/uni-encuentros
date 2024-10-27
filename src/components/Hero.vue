<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuth, SignInButton } from 'vue-clerk'

const router = useRouter()
const { isSignedIn } = useAuth()

const navigateToLogin = () => {
  if (isSignedIn.value) {
    router.push('/dashboard')
  }
}
</script>

<template>
  <div class="relative h-screen flex items-center justify-center">
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
        class="w-full h-full object-cover"
        alt="University background"
      />
      <div class="absolute inset-0 bg-black/60"></div>
    </div>

    <!-- Content -->
    <div class="relative text-center space-y-8 max-w-4xl px-4">
      <h1 class="text-7xl font-bold tracking-tight">
        <span class="text-white">Uni</span>
        <span class="text-[#FFD700]">Encuentros</span>
      </h1>

      <p class="text-gray-300 text-xl max-w-2xl mx-auto">
        Transformando la gestión de eventos académicos con herramientas intuitivas y eficientes para una experiencia universitaria más conectada.
      </p>

      <SignInButton mode="modal" class="px-8 py-3 text-lg font-medium bg-[#FFD700] text-gray-900 rounded-lg hover:bg-[#FFE55C] transition-colors duration-200 transform hover:scale-105">
        Ingresar
      </SignInButton>
    </div>
  </div>
</template>