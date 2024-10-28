<script setup lang="ts">
import { ref, computed } from "vue";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import type { Event } from "../types/event";

interface Props {
  event: Event;
  showActions?: boolean; // Controls visibility of export/share buttons
  mode?: "preview" | "invitation"; // Different modes for different contexts
}

const props = withDefaults(defineProps<Props>(), {
  showActions: false,
  mode: "preview",
});

const previewRef = ref<HTMLElement | null>(null);

const exportAsPDF = async () => {
  if (!previewRef.value) return;

  const canvas = await html2canvas(previewRef.value);
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF();

  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save("event-invitation.pdf");
};

const exportAsImage = async () => {
  if (!previewRef.value) return;

  const canvas = await html2canvas(previewRef.value);
  const link = document.createElement("a");
  link.download = "event-invitation.png";
  link.href = canvas.toDataURL();
  link.click();
};

const presentersAndOrganizers = computed(() =>
  props.event.participants.filter((p) => ["presenter", "organizer"].includes(p.role))
);

const attendeeCount = computed(
  () =>
    props.event.participants.filter((p) => p.role === "attendee" && p.status === "accepted")
      .length
);

const shareUrl = computed(() => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/invite/${props.event.id}`;
});

const copyShareLink = async () => {
  try {
    await navigator.clipboard.writeText(shareUrl.value);
    // You might want to add a toast notification here
  } catch (err) {
    console.error("Failed to copy:", err);
  }
};
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-8">
    <!-- Only show actions in preview mode with showActions prop -->
    <div v-if="showActions" class="flex justify-between items-center">
      <h1 class="page-title">{{ mode === "preview" ? "Previsualización" : "Invitación" }}</h1>
      <div class="flex space-x-4 mb-6">
        <button @click="exportAsImage" class="btn btn-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clip-rule="evenodd"
            />
          </svg>
          Exportar JPG
        </button>
        <button @click="exportAsPDF" class="btn btn-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
              clip-rule="evenodd"
            />
          </svg>
          Exportar PDF
        </button>
        <button @click="copyShareLink" class="btn btn-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"
            />
          </svg>
          Share Link
        </button>
      </div>
    </div>

    <div
      ref="previewRef"
      class="card p-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
    >
      <div class="text-center mb-12">
        <div class="mb-6">
          <div v-if="event.logo" class="h-16">
            <img :src="event.logo" alt="Event Logo" class="h-full mx-auto object-contain" />
          </div>
          <div
            v-else
            class="w-16 h-16 mx-auto rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold"
          >
            U
          </div>
        </div>
        <h2
          class="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4 leading-relaxed"
        >
          {{ event.title }}
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300">Te invitamos a asistir</p>
      </div>

      <div class="max-w-2xl mx-auto space-y-8">
        <div
          class="text-center bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700"
        >
          <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {{ event.goal }}
          </p>
        </div>

        <div class="grid grid-cols-2 gap-8">
          <div
            class="text-center p-6 bg-primary-50 dark:bg-primary-900/30 rounded-xl border border-primary-100 dark:border-primary-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 mx-auto mb-4 text-primary-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M6 2a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                clip-rule="evenodd"
              />
            </svg>
            <h3 class="font-semibold text-gray-800 dark:text-gray-100 mb-3">Fecha y Hora</h3>
            <p class="text-primary-700 dark:text-primary-300 font-medium">{{ event.date }}</p>
            <p class="text-primary-700 dark:text-primary-300 font-medium">{{ event.time }}</p>
          </div>

          <div
            class="text-center p-6 bg-secondary-50 dark:bg-secondary-900/30 rounded-xl border border-secondary-100 dark:border-secondary-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 mx-auto mb-4 text-secondary-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clip-rule="evenodd"
              />
            </svg>
            <h3 class="font-semibold text-gray-800 dark:text-gray-100 mb-3">Ubicación</h3>
            <p class="text-secondary-700 dark:text-secondary-300 font-medium">
              {{ event.location }}
            </p>
          </div>
        </div>

        <div class="space-y-4">
          <!-- Featured Participants -->
          <div
            class="text-center bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700"
          >
            <div class="flex items-center justify-center gap-2 mb-6">
              <h3 class="font-semibold text-gray-800 dark:text-gray-100">
                Total de Asistentes
              </h3>
              <span
                class="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium"
              >
                {{ attendeeCount }} Asistentes Registrados
              </span>
            </div>
            <div class="flex flex-wrap justify-center gap-4">
              <div
                v-for="participant in presentersAndOrganizers"
                :key="participant.name"
                class="flex items-center gap-2 px-4 py-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
              >
                <span class="font-medium text-gray-900 dark:text-gray-100">{{
                  participant.name
                }}</span>
                <span
                  :class="{
                    'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300':
                      participant.role === 'presenter',
                    'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300':
                      participant.role === 'organizer',
                  }"
                  class="px-2 py-0.5 rounded-full text-xs font-medium capitalize"
                >
                  {{ participant.role }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center text-sm text-gray-400 dark:text-gray-500">
          Powered by
          <span
            class="text-primary hover:text-primary-light dark:text-primary-400 dark:hover:text-primary-300"
          >
            UniEncuentros ❤️
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
