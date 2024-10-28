<script setup lang="ts">
import { ref } from "vue";

interface PresenterFormData {
  name: string;
  about: string;
}

const props = defineProps<{
  initialData?: PresenterFormData;
  mode?: "create" | "edit";
}>();

const emit = defineEmits<{
  (e: "add", presenter: PresenterFormData): void;
  (e: "update", presenter: PresenterFormData): void;
  (e: "cancel"): void;
}>();

const name = ref(props.initialData?.name || "");
const about = ref(props.initialData?.about || "");

const handleSubmit = () => {
  if (name.value.trim()) {
    const data = {
      name: name.value.trim(),
      about: about.value.trim(),
    };
    if (props.mode === "edit") {
      emit("update", data);
    } else {
      emit("add", data);
    }
  }
};
</script>

<template>
  <div
    class="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75 flex items-center justify-center z-50"
  >
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full m-4">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        {{ mode === "edit" ? "Editar" : "Agregar" }} Presentador
      </h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Nombre</label
          >
          <input
            id="name"
            v-model="name"
            type="text"
            required
            class="input mt-1"
            placeholder="Nombre del presentador..."
          />
        </div>

        <div>
          <label for="about" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Acerca de</label
          >
          <textarea
            id="about"
            v-model="about"
            rows="4"
            class="input mt-1 resize-none"
            placeholder="Descripción breve sobre el presentador..."
          ></textarea>
        </div>

        <div class="flex justify-end space-x-3">
          <button
            type="button"
            class="btn bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            @click="emit('cancel')"
          >
            Cancelar
          </button>
          <button type="submit" class="btn btn-primary" :disabled="!name.trim()">
            {{ mode === "edit" ? "Guardar Cambios" : "Agregar Presentador" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
