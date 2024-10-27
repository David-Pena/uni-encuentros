<script setup lang="ts">
import { ref } from 'vue'
import { SignedOut, SignedIn, UserButton, SignInButton, SignUpButton } from 'vue-clerk'
import Hero from '../components/Hero.vue'
  
const features = ref([
  {
    title: 'Event Management',
    description: 'Create and manage university events with ease',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>`
  },
  {
    title: 'Smart Invitations',
    description: 'Send and track invitations automatically',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>`
  },
  {
    title: 'Presenter Management',
    description: 'Organize and coordinate with event presenters',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>`
  }
])
</script>

<template>
  <div class="min-h-screen">
    <!-- Navbar -->
    <nav class="bg-white/80 backdrop-blur-sm border-b border-gray-200 fixed w-full z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0 flex items-center">
              <div class="w-8 h-8 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold">
                U
              </div>
              <span class="ml-2 text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                UniEvents
              </span>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <SignedOut>
              <SignInButton mode="modal" class="btn bg-gray-100 text-gray-700 hover:bg-gray-200">
                Sign In
              </SignInButton>
              <SignUpButton mode="modal" class="btn btn-primary">
                Sign Up
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <router-link to="/dashboard" class="btn btn-primary mr-4">
                Dashboard
              </router-link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <Hero />

    <!-- Features Section -->
    <div id="features" class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900">
            Everything you need to manage university events
          </h2>
          <p class="mt-4 text-xl text-gray-600">
            Powerful tools designed specifically for academic event management
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="p-6 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200"
          >
            <div class="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center text-white mb-4" v-html="feature.icon"></div>
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

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <div class="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white font-bold">
              U
            </div>
            <span class="ml-2 text-xl font-bold">UniEvents</span>
          </div>
          <div class="text-gray-400">
            © {{ new Date().getFullYear() }} UniEvents. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>