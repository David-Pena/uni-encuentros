<script setup lang="ts">
import { ref, computed } from "vue";
import EventActionsPopover from "../components/EventActionsPopover.vue";

const selectedType = ref("all");

const eventTypes = [
  { id: "all", name: "Todos" },
  { id: "seminario", name: "Seminario", icon: "🎓" },
  { id: "charla", name: "Charla", icon: "💡" },
  { id: "presentacion", name: "Presentación", icon: "📊" },
];

const events = ref([
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

const getTypeIcon = (type: string) => {
  return eventTypes.find((t) => t.id === type)?.icon || "";
};

const getTypeName = (type: string) => {
  return eventTypes.find((t) => t.id === type)?.name || type;
};

const handleEventAction = (eventId: number, action: string) => {
  if (action === "cancel") {
    // Here you would typically call an API to cancel the event and send emails
    console.log(`Cancelling event ${eventId}`);
  } else if (action === "close") {
    // Here you would typically call an API to close the event
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
            ? 'bg-primary-100 text-primary-700'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
        ]"
      >
        {{ type.icon }} {{ type.name }}
      </button>
    </div>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="event in filteredEvents" :key="event.id" class="card p-6 flex flex-col">
        <!-- Replace the existing card header with this updated version -->
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
            class="flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap flex items-center gap-1 border-[1.5px] border-primary-light"
          >
            {{ getTypeIcon(event.type) }} {{ getTypeName(event.type) }}
          </span>
        </div>

        <div class="space-y-3 text-gray-600 flex-grow">
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
                'bg-purple-100 text-purple-800': presenter.role === 'presenter',
                'bg-green-100 text-green-800': presenter.role === 'organizer',
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
            class="flex-1 btn bg-gray-100 text-gray-700 hover:bg-gray-200 justify-center"
          >
            Previsualizar
          </RouterLink>
          <button class="flex-1 btn btn-primary justify-center">Editar</button>
          <EventActionsPopover @select="(action) => handleEventAction(event.id, action)" />
        </div>
      </div>
    </div>
  </div>
</template>
