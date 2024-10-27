<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useClerk } from 'vue-clerk'

const router = useRouter()
const { signOut } = useClerk()

defineProps({
  isCollapsed: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const userMenu = [
  {
    name: 'Mi Perfil',
    path: '/dashboard/profile',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
    </svg>`
  },
  {
    name: 'Cerrar Sesión',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd" />
    </svg>`
  }
]

const handleMenuClick = async (item: { name: string; path?: string }) => {
  if (item.name === 'Cerrar Sesión') {
    await signOut()
    router.push('/')
  } else if (item.path) {
    router.push(item.path)
  }
  emit('close')
}
</script>

<template>
  <div
    class="absolute bottom-20 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[200px]"
    :class="{
      'left-4 right-4': !isCollapsed,
      'left-full ml-2': isCollapsed
    }"
  >
    <div class="space-y-1">
      <button
        v-for="item in userMenu"
        :key="item.name"
        @click="handleMenuClick(item)"
        class="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
      >
        <span v-html="item.icon" class="mr-3"></span>
        {{ item.name }}
      </button>
    </div>
  </div>
</template>