<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useUser } from "vue-clerk";
import ProfilePopup from "./ProfilePopup.vue";

const route = useRoute();
const { user } = useUser();
const showProfilePopup = ref(false);
const isCollapsed = ref(false);

const navigation = [
  {
    name: "Eventos",
    path: "/dashboard",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>`,
  },
  {
    name: "Nuevo Evento",
    path: "/dashboard/create",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
    </svg>`,
  },
  {
    name: "Presentadores",
    path: "/dashboard/presenters",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>`,
  },
  {
    name: "Logos",
    path: "/dashboard/logos",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>`,
  },
  {
    name: "Configuración",
    path: "/dashboard/settings",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>`,
  },
];
</script>

<template>
  <div class="flex h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Sidebar -->
    <div
      :class="[
        isCollapsed ? 'w-20' : 'w-64',
        'bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 ease-in-out relative',
      ]"
    >
      <!-- Collapse Toggle Button -->
      <button
        @click="isCollapsed = !isCollapsed"
        class="absolute -right-3 top-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-1.5 shadow-sm hover:shadow-md transition-all duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 text-gray-600 dark:text-gray-400"
          :class="{ 'rotate-180': isCollapsed }"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <!-- Logo -->
      <div class="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-700">
        <RouterLink to="/dashboard" class="flex items-center space-x-2">
          <span
            class="ml-2 text-xl font-bold text-gray-900 dark:text-gray-700 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text"
          >
            Uni<span v-if="!isCollapsed" class="text-primary-light">Encuentros</span>
          </span>
        </RouterLink>
      </div>

      <!-- Navigation Links -->
      <nav class="flex-1 px-4 py-6 space-y-2">
        <RouterLink
          v-for="item in navigation"
          :key="item.name"
          :to="item.path"
          :class="[
            route.path === item.path
              ? 'bg-primary-50 dark:bg-primary-900/50 text-primary-600 dark:text-primary-300'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100',
            'group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors duration-75',
            isCollapsed ? 'justify-center' : '',
          ]"
          :title="isCollapsed ? item.name : ''"
        >
          <span v-html="item.icon" class="flex-shrink-0"></span>
          <span v-if="!isCollapsed" class="ml-3 transition-all duration-300">
            {{ item.name }}
          </span>
        </RouterLink>
      </nav>

      <!-- Profile Section -->
      <div class="border-t border-gray-200 dark:border-gray-700 p-4 relative">
        <button
          @click="showProfilePopup = !showProfilePopup"
          class="w-full flex items-center px-3 py-3 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 rounded-lg transition-colors duration-75"
          :class="{ 'justify-center': isCollapsed }"
        >
          <img
            :src="user?.imageUrl"
            :alt="user?.fullName as string"
            class="w-8 h-8 rounded-full"
            :class="{ 'mr-3': !isCollapsed }"
          />
          <template v-if="!isCollapsed">
            <div class="flex-1 text-left">
              <div class="font-medium dark:text-gray-200">{{ user?.fullName }}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">
                {{ user?.primaryEmailAddress?.emailAddress }}
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              :class="{ 'transform rotate-180': showProfilePopup }"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </template>
        </button>
        <ProfilePopup
          v-if="showProfilePopup"
          :is-collapsed="isCollapsed"
          @close="showProfilePopup = false"
        />
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <main class="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 px-6 py-8">
        <slot></slot>
      </main>
    </div>
  </div>
</template>
