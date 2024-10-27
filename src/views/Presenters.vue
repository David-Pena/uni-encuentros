<script setup lang="ts">
import { ref, computed } from "vue";
import NewPresenterForm from "../components/NewPresenterForm.vue";

interface Presenter {
  id: string;
  name: string;
  about?: string;
  avatar: string;
  events: number;
  lastEvent?: string;
}

const showPresenterForm = ref(false);
const editingPresenter = ref<Presenter | null>(null);
const searchQuery = ref("");

const presenters = ref<Presenter[]>([
  {
    id: "1",
    name: "Dr. Jane Smith",
    about: "Experta en Machine Learning y Redes Neuronales",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    events: 12,
    lastEvent: "2024-03-15",
  },
  {
    id: "2",
    name: "Prof. John Doe",
    about: "Especializada en Ciencia de Datos y Análisis de Big Data",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    events: 8,
    lastEvent: "2024-03-10",
  },
  {
    id: "3",
    name: "Dr. Alice Johnson",
    about: "Investiga en Inteligencia Artificial y Robótica",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    events: 15,
    lastEvent: "2024-03-20",
  },
]);

const filteredPresenters = computed(() => {
  if (!searchQuery.value) return presenters.value;
  const query = searchQuery.value.toLowerCase();
  return presenters.value.filter(
    (presenter) =>
      presenter.name.toLowerCase().includes(query) ||
      presenter.about?.toLowerCase().includes(query)
  );
});

const addNewPresenter = (presenter: { name: string; about: string }) => {
  const newPresenter: Presenter = {
    id: `new-${Date.now()}`,
    name: presenter.name,
    about: presenter.about,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${presenter.name}`,
    events: 0,
  };
  presenters.value.push(newPresenter);
  showPresenterForm.value = false;
};

const updatePresenter = (data: { name: string; about: string }) => {
  if (!editingPresenter.value) return;

  const index = presenters.value.findIndex((p) => p.id === editingPresenter.value?.id);
  if (index !== -1) {
    presenters.value[index] = {
      ...presenters.value[index],
      name: data.name,
      about: data.about,
    };
  }
  editingPresenter.value = null;
};

const editPresenter = (presenter: Presenter) => {
  editingPresenter.value = presenter;
};

const removePresenter = (id: string) => {
  presenters.value = presenters.value.filter((p) => p.id !== id);
};
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="page-title">Presentadores</h1>
      <button @click="showPresenterForm = true" class="btn btn-primary">
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
        Agregar Presentador
      </button>
    </div>

    <div class="card p-6">
      <div class="mb-6">
        <div class="relative flex items-center">
          <svg
            class="absolute left-3 h-5 w-5 text-gray-400 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar presentadores..."
            class="input pl-10"
          />
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Presentador
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Acerca de
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total de Eventos
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Último Evento
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="presenter in filteredPresenters" :key="presenter.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <img
                    :src="presenter.avatar"
                    :alt="presenter.name"
                    class="h-10 w-10 rounded-full"
                  />
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ presenter.name }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <p class="text-sm text-gray-500 line-clamp-2">{{ presenter.about || "-" }}</p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full"
                >
                  {{ presenter.events }} eventos
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{
                  presenter.lastEvent
                    ? new Date(presenter.lastEvent).toLocaleDateString()
                    : "No hay eventos todavía"
                }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                <button
                  @click="editPresenter(presenter)"
                  class="text-primary-600 hover:text-primary-900"
                >
                  Editar
                </button>
                <button
                  @click="removePresenter(presenter.id)"
                  class="text-red-600 hover:text-red-900"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <NewPresenterForm
      v-if="showPresenterForm"
      mode="create"
      @add="addNewPresenter"
      @cancel="showPresenterForm = false"
    />

    <NewPresenterForm
      v-if="editingPresenter"
      mode="edit"
      :initial-data="{
        name: editingPresenter.name,
        about: editingPresenter.about || '',
      }"
      @update="updatePresenter"
      @cancel="editingPresenter = null"
    />
  </div>
</template>
