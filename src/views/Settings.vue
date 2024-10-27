<script setup lang="ts">
import { ref } from 'vue';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal.vue';
import ThemeToggle from '../components/ThemeToggle.vue';
import EmailConfiguration from '../components/EmailConfiguration.vue';

const showDeleteConfirmation = ref(false);

const handleDeleteAccount = () => {
  // Here you would typically call an API to delete the account
  console.log('Deleting account...');
  showDeleteConfirmation.value = false;
};
</script>

<template>
  <div class="space-y-6">
    <h1 class="page-title">Configuración</h1>

    <div class="space-y-6">
      <!-- Email Configuration -->
      <EmailConfiguration />

      <!-- Theme Settings -->
      <div class="card p-6">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
              Configuración de tema
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Elige entre el modo claro y el modo oscuro para el sitio web
            </p>
          </div>
          <ThemeToggle />
        </div>
      </div>

      <!-- Delete Account -->
      <div class="card p-6">
        <div class="space-y-2">
          <h2 class="text-lg font-medium text-red-600 mb-5">Zona de Peligro</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Una vez que elimines tu cuenta, no podrás volver atrás. Por favor, ten cuidado.
          </p>
          <button
            @click="showDeleteConfirmation = true"
            class="mt-4 btn bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/50 
                   dark:text-red-400 dark:hover:bg-red-900"
          >
            Eliminar cuenta
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Account Confirmation Modal -->
    <DeleteConfirmationModal
      v-model:isOpen="showDeleteConfirmation"
      @confirm="handleDeleteAccount"
      @cancel="showDeleteConfirmation = false"
    />
  </div>
</template>
