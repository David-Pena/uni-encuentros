<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)

const actions = [
  {
    id: 'cancel',
    name: 'Cancel Event',
    description: 'Send cancellation email to all attendees',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
    </svg>`,
    color: 'text-red-600'
  },
  {
    id: 'close',
    name: 'Close Event',
    description: 'Block all new invitation links',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
    </svg>`,
    color: 'text-yellow-600'
  }
]

defineEmits<{
  (e: 'select', action: string): void
}>()

const closePopover = () => {
  isOpen.value = false
}
</script>

<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors duration-200"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
      </svg>
    </button>

    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-72 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50"
    >
      <div class="py-1">
        <button
          v-for="action in actions"
          :key="action.id"
          @click="$emit('select', action.id); closePopover()"
          class="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 group"
        >
          <div class="flex items-start gap-3">
            <div :class="[action.color, 'mt-1']" v-html="action.icon"></div>
            <div>
              <div :class="[action.color, 'font-medium']">{{ action.name }}</div>
              <div class="text-sm text-gray-500">{{ action.description }}</div>
            </div>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>