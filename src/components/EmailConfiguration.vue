<script setup lang="ts">
import { ref } from "vue";
import type { EmailConfig, EmailProvider } from "../types/email";

const emailEnabled = ref(false);

const emailConfig = ref<EmailConfig>({
  email: "",
  password: "",
  appPassword: "",
  host: "",
});

const emailProviders: EmailProvider[] = [
  {
    id: "gmail",
    name: "Gmail",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14h-2V8.38L12 13.5 6 8.38V18H4V6h1.12L12 12.62 18.88 6H20v12z"/>
    </svg>`,
  },
  {
    id: "outlook",
    name: "Outlook",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
      <path d="M21.179 4.885L14.005 0v4.198l-1.795.897v2.694l1.795-.897v4.198l7.174-4.885zm-9.073 2.895V4.198L4.821 0v4.198l1.795.897v2.694l-1.795-.897v4.198l7.285-4.885z"/>
    </svg>`,
  },
];
</script>

<template>
  <div class="card">
    <div class="p-6 flex items-center justify-between">
      <div>
        <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
          Configuración de correo electrónico
        </h2>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Configure las configuraciones de correo electrónico para las notificaciones de eventos
        </p>
      </div>
      <div class="flex items-center">
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="emailEnabled" class="sr-only peer" />
          <div
            class="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600 dark:peer-checked:bg-primary-500"
          ></div>
        </label>
      </div>
    </div>

    <div
      v-if="emailEnabled"
      class="border-t border-gray-200 dark:border-gray-700 p-6 space-y-6"
    >
      <!-- Email Provider Selection -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email Provider
        </label>
        <div class="grid grid-cols-2 gap-4">
          <button
            v-for="provider in emailProviders"
            :key="provider.id"
            @click="emailConfig.host = provider.id"
            class="p-6 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center gap-4 hover:shadow-lg dark:hover:shadow-gray-800"
            :class="[
              emailConfig.host === provider.id
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300'
                : 'border-gray-200 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-700',
            ]"
          >
            <div
              class="text-gray-600 dark:text-gray-400"
              :class="{
                'text-primary-600 dark:text-primary-400': emailConfig.host === provider.id,
              }"
              v-html="provider.icon"
            ></div>
            <span class="text-lg font-medium">{{ provider.name }}</span>
          </button>
        </div>
      </div>

      <!-- Email Configuration Form -->
      <div class="grid gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email Address
          </label>
          <input
            v-model="emailConfig.email"
            type="email"
            class="input mt-1 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
            placeholder="Enter your email address"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email Password
          </label>
          <input
            v-model="emailConfig.password"
            type="password"
            class="input mt-1 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
            placeholder="Enter your email password"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            App Password
          </label>
          <input
            v-model="emailConfig.appPassword"
            type="password"
            class="input mt-1 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
            placeholder="Enter your app password"
          />
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Required for secure authentication. Learn how to generate an app password for
            <a
              :href="
                emailConfig.host === 'gmail'
                  ? 'https://support.google.com/accounts/answer/185833?hl=en'
                  : 'https://support.microsoft.com/en-us/account-billing/create-an-app-password-for-office-365-3e7c860f-bda4-4441-a618-b53953b1c5e0'
              "
              target="_blank"
              class="text-primary hover:text-primary-light"
            >
              {{ emailConfig.host === "gmail" ? "Gmail" : "Outlook" }}
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
