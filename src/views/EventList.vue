<script setup lang="ts">
import { ref, computed } from "vue";
import EventCard from "../components/EventCard.vue";
import type { Event } from "../types/event";

const selectedType = ref("all");

const eventTypes = [
  { id: "all", name: "Todos" },
  { id: "seminario", name: "Seminario", icon: "🎓" },
  { id: "charla", name: "Charla", icon: "💡" },
  { id: "presentacion", name: "Presentación", icon: "📊" },
];

const events = ref<Event[]>([
  {
    id: 1,
    title: "Seminario Avanzado de Machine Learning",
    type: "seminario",
    goal: "Únete a un seminario interactivo sobre los últimos avances en machine learning.",
    date: "2024-03-20",
    time: "14:00",
    location: "Edificio de Ciencias de la Computación, Sala 401",
    presenters: [
      { name: "Dr. Jane Smith", role: "presenter" },
      { name: "Prof. John Doe", role: "organizer" },
    ],
    attendees: 45,
  },
  {
    id: 2,
    title: "Taller de Metodología de Investigación",
    type: "charla",
    goal: "Aprende metodologías esenciales para el éxito académico.",
    date: "2024-03-25",
    time: "10:00",
    location: "Online",
    presenters: [
      { name: "Dr. Alice Johnson", role: "presenter" },
      { name: "Prof. John Doe", role: "organizer" },
    ],
    attendees: 30,
  },
]);

const filteredEvents = computed(() => {
  if (selectedType.value === "all") return events.value;
  return events.value.filter((event) => event.type === selectedType.value);
});

const handleEventAction = (eventId: number, action: string) => {
  if (action === "cancel") {
    console.log(`Cancelling event ${eventId}`);
  } else if (action === "close") {
    console.log(`Closing event ${eventId}`);
  }
};
</script>

<template>
  <div class="space-y-8">
    <div class="flex justify-between items-center">
      <h1 class="page-title">Eventos</h1>
      <RouterLink to="/dashboard/create" class="btn btn-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg>
        Crear Evento
      </RouterLink>
    </div>

    <!-- Type Filter -->
    <div class="flex gap-2">
      <button
        v-for="type in eventTypes"
        :key="type.id"
        @click="selectedType = type.id"
        class="px-4 py-2 rounded-lg font-medium transition-all duration-200"
        :class="[
          selectedType === type.id
            ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700',
        ]"
      >
        {{ type.icon }} {{ type.name }}
      </button>
    </div>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <EventCard
        v-for="event in filteredEvents"
        :key="event.id"
        :event="event"
        @action="handleEventAction"
      />
    </div>
  </div>
</template>
