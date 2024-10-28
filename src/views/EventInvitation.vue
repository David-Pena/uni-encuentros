<script setup lang="ts">
import { ref } from "vue";
import EventPreview from "../components/EventPreview.vue";
import type { Event } from "../types/event";

const email = ref("");
const hasJoined = ref(false);
const isLoading = ref(false);

// Mock event data - In real app, fetch from API using route.params.id
const event = ref<Event>({
  id: 1,
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
});

const handleJoin = async () => {
  if (!email.value) return;

  isLoading.value = true;
  try {
    // Here you would make an API call to register the participant
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
    hasJoined.value = true;
  } catch (error) {
    console.error("Error joining event:", error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-12 px-4">
    <div class="max-w-4xl mx-auto space-y-8">
      <EventPreview :event="event" mode="invitation" />

      <!-- Join Form -->
      <div v-if="!hasJoined" class="card p-6 max-w-md mx-auto">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Join this Event</h3>
        <form @submit.prevent="handleJoin" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              v-model="email"
              type="email"
              required
              class="input w-full"
              placeholder="Enter your email..."
            />
          </div>
          <button type="submit" class="btn btn-primary w-full" :disabled="isLoading || !email">
            <span v-if="isLoading">Joining...</span>
            <span v-else>Join Event</span>
          </button>
        </form>
      </div>

      <!-- Success Message -->
      <div v-else class="card p-6 max-w-md mx-auto text-center">
        <div class="text-green-500 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">You're In!</h3>
        <p class="text-gray-600">
          Thank you for joining. We've sent a confirmation email to {{ email }}
        </p>
      </div>
    </div>
  </div>
</template>
