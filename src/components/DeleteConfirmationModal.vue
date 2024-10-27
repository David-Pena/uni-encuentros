<script setup lang="ts">
interface Props {
  isOpen: boolean;
  title?: string;
  message?: string;
}

interface Emits {
  (e: "confirm"): void;
  (e: "cancel"): void;
  (e: "update:isOpen", value: boolean): void;
}

withDefaults(defineProps<Props>(), {
  title: "Delete Account",
  message:
    "Are you sure you want to delete your account? All of your data will be permanently removed. This action cannot be undone.",
});

const emits = defineEmits<Emits>();

const handleCancel = () => {
  emits("cancel");
  emits("update:isOpen", false);
};

const handleConfirm = () => {
  emits("confirm");
  emits("update:isOpen", false);
};
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
  >
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full m-4">
      <div class="text-center">
        <svg
          class="mx-auto h-12 w-12 text-red-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>

        <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">{{ title }}</h3>
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {{ message }}
        </p>
      </div>

      <div class="mt-6 flex justify-center space-x-3">
        <button
          @click="handleCancel"
          class="btn bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
        <button @click="handleConfirm" class="btn bg-red-600 text-white hover:bg-red-700">
          Delete Account
        </button>
      </div>
    </div>
  </div>
</template>
