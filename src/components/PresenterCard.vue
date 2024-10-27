<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface Presenter {
  id: number | string
  name: string
  expertise?: string
  avatar: string
}

const props = defineProps<{
  presenter: Presenter
  isSelected: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle'): void
}>()
</script>

<template>
  <button
    @click="$emit('toggle')"
    class="p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 hover:shadow-md w-full"
    :class="[
      isSelected
        ? 'border-primary-500 bg-primary-50'
        : 'border-gray-200'
    ]"
  >
    <img :src="presenter.avatar" :alt="presenter.name" class="w-16 h-16 rounded-full" />
    <div class="text-left">
      <h3 class="font-medium text-gray-900">{{ presenter.name }}</h3>
      <p v-if="presenter.expertise" class="text-sm text-gray-500">{{ presenter.expertise }}</p>
    </div>
  </button>
</template>