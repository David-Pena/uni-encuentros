<script setup lang="ts">
import type { Event } from '../types/event';
import EventActionsPopover from './EventActionsPopover.vue';

const props = defineProps<{
  event: Event;
}>();

const emit = defineEmits<{
  (e: 'action', eventId: number, action: string): void;
}>();

const getTypeIcon = (type: string) => {
  const types = {
    seminario: "🎓",
    charla: "💡",
    presentacion: "📊",
  };
  return types[type as keyof typeof types] || "";
};

const getTypeName = (type: string) => {
  const types = {
    seminario: "Seminario",
    charla: "Charla",
    presentacion: "Presentación",
  };
  return types[type as keyof typeof types] || type;
};

const handleAction = (action: string) => {
  emit('action', props.event.id, action);
};
</script>

<template>
  <div class="card p-6 flex flex-col">
    <div class="flex items-start gap-4 mb-4">
      <div class="space-y-1 flex-1 min-w-0">
        <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-100 line-clamp-2">
          {{ event.title }}
        </h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
          {{ event.goal }}
        </p>
      </div>
      <span
        class="flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap 
               flex items-center gap-1 bg-primary-100 text-primary-800 dark:bg-primary-900/50 
               dark:text-primary-300"
      >
        {{ getTypeIcon(event.type) }} {{ getTypeName(event.type) }}
      </span>
    </div>

    <div class="space-y-3 text-gray-600 dark:text-gray-300 flex-grow">
      <div class="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-primary-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clip-rule="evenodd"
          />
        </svg>
        <span>{{ event.date }} at {{ event.time }}</span>
      </div>

      <div class="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-primary-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
            clip-rule="evenodd"
          />
        </svg>
        <span>{{ event.location }}</span>
      </div>

      <div class="flex flex-wrap gap-2">
        <span
          v-for="presenter in event.presenters"
          :key="presenter.name"
          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
          :class="{
            'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300': 
              presenter.role === 'presenter',
            'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300': 
              presenter.role === 'organizer',
          }"
        >
          {{ presenter.name }}
        </span>
      </div>

      <div class="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-primary-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.973 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
          />
        </svg>
        <span>{{ event.attendees }} Asistentes</span>
      </div>
    </div>

    <div class="mt-6 flex gap-2">
      <RouterLink
        :to="`dashboard/preview/${event.id}`"
        class="flex-1 btn bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 
               dark:text-gray-200 dark:hover:bg-gray-700 justify-center"
      >
        Previsualizar
      </RouterLink>
      <button class="flex-1 btn btn-primary justify-center">Editar</button>
      <EventActionsPopover @select="handleAction" />
    </div>
  </div>
</template>
