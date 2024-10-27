<script setup lang="ts">
import { ref } from 'vue'
import Navigation from '../components/Navigation.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Navigation />
    <div class="flex-1 flex flex-col overflow-hidden">
      <main class="flex-1 overflow-y-auto bg-gray-50 px-6 py-8">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>