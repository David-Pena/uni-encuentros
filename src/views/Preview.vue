<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import EventPreview from "../components/EventPreview.vue";
import type { Event } from "../types/event";

const route = useRoute();
const event = ref<Event | null>(null);
const isLoading = ref(true);

onMounted(async () => {
  try {
    // Here you would fetch the event data using the ID from route.params.id
    // For now using mock data
    event.value = {
      id: Number(route.params.id),
      title: "Seminario Interactivo de Machine Learning Avanzado",
      type: "seminar",
      goal: "Únete a nosotros para un seminario interactivo sobre los últimos avances en machine learning y sus aplicaciones en escenarios del mundo real.",
      date: "Marzo 20, 2024",
      time: "2:00 PM - 4:00 PM",
      location: "Computer Science Building - Room 401",
      presenters: [],
      attendees: 0,
      participants: [
        {
          email: "jane@university.edu",
          name: "Dr. Jane Smith",
          role: "presenter",
          status: "accepted",
        },
        {
          email: "john@university.edu",
          name: "Prof. John Doe",
          role: "organizer",
          status: "accepted",
        },
      ],
    };
  } catch (error) {
    console.error("Error fetching event:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="isLoading" class="flex justify-center items-center min-h-[400px]">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>

    <div v-else-if="event">
      <EventPreview :event="event" :showActions="true" mode="preview" />
    </div>

    <div v-else class="text-center py-12">
      <h2 class="text-2xl font-semibold text-gray-700">Event not found</h2>
      <p class="text-gray-500 mt-2">
        The event you're looking for doesn't exist or has been removed.
      </p>
    </div>
  </div>
</template>
