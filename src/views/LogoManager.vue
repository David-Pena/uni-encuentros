<script setup lang="ts">
import { ref } from "vue";

interface Logo {
  id: string;
  name: string;
  url: string;
  size: number;
  uploadDate: string;
}

const logos = ref<Logo[]>([]);
const dragActive = ref(false);
const errorMessage = ref("");

const handleFileDrop = (e: DragEvent) => {
  e.preventDefault();
  dragActive.value = false;

  const files = e.dataTransfer?.files;
  if (files) {
    handleFiles(Array.from(files));
  }
};

const handleFileInput = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (input.files) {
    handleFiles(Array.from(input.files));
  }
};

const handleFiles = (files: File[]) => {
  errorMessage.value = "";

  files.forEach((file) => {
    // Check file type
    if (!file.type.startsWith("image/png")) {
      errorMessage.value = "Solo se permiten archivos PNG";
      return;
    }

    // Check file size (5MB = 5 * 1024 * 1024 bytes)
    if (file.size > 5 * 1024 * 1024) {
      errorMessage.value = "El tamaño del archivo debe ser menor a 5MB";
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const newLogo: Logo = {
        id: `logo-${Date.now()}`,
        name: file.name,
        url: e.target?.result as string,
        size: file.size,
        uploadDate: new Date().toISOString(),
      };

      if (logos.value.length >= 5) {
        errorMessage.value = "Máximo 5 logos permitidos. Por favor, elimina algunos antes de agregar más.";
        return;
      }

      logos.value.push(newLogo);
    };
    reader.readAsDataURL(file);
  });
};

const removeLogo = (id: string) => {
  logos.value = logos.value.filter((logo) => logo.id !== id);
};

const formatSize = (bytes: number) => {
  const kb = bytes / 1024;
  if (kb < 1024) {
    return `${kb.toFixed(1)} KB`;
  }
  return `${(kb / 1024).toFixed(1)} MB`;
};
</script>

<template>
  <div class="space-y-6">
    <h1 class="page-title">Logo Manager</h1>

    <div
      class="card p-8"
      @dragover.prevent="dragActive = true"
      @dragleave.prevent="dragActive = false"
      @drop="handleFileDrop"
      :class="{ 'border-primary-500 bg-primary-50': dragActive }"
    >
      <div class="text-center">
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>

        <h3 class="mt-2 text-sm font-medium text-gray-900">Carga tus logos</h3>
        <p class="mt-1 text-sm text-gray-500">Solo PNG, máximo 5MB por archivo</p>

        <div class="mt-6">
          <label class="btn btn-primary cursor-pointer">
            <span>Seleccionar archivos</span>
            <input
              type="file"
              class="hidden"
              accept="image/png"
              multiple
              @change="handleFileInput"
            />
          </label>
        </div>
      </div>

      <div v-if="errorMessage" class="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
        {{ errorMessage }}
      </div>
    </div>

    <div v-if="logos.length > 0" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="logo in logos" :key="logo.id" class="card p-4">
        <img
          :src="logo.url"
          :alt="logo.name"
          class="w-full h-32 object-contain bg-gray-50 rounded-lg"
        />
        <div class="mt-4">
          <h3 class="font-medium text-gray-900">{{ logo.name }}</h3>
          <p class="text-sm text-gray-500">{{ formatSize(logo.size) }}</p>
          <p class="text-sm text-gray-500">
            Cargado el {{ new Date(logo.uploadDate).toLocaleDateString() }}
          </p>
        </div>
        <button
          @click="removeLogo(logo.id)"
          class="mt-4 w-full btn bg-red-50 text-red-600 hover:bg-red-100"
        >
          Eliminar
        </button>
      </div>
    </div>

    <div v-else class="text-center text-gray-500 mt-8">No hay logos cargados todavía</div>
  </div>
</template>
