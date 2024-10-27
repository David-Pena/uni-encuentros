<script setup lang="ts">
import { ref } from 'vue'

const showDeleteConfirmation = ref(false)
const emailEnabled = ref(false)

const emailConfig = ref({
  email: '',
  password: '',
  appPassword: '',
  host: '' as 'gmail' | 'outlook' | ''
})

const emailProviders = [
  {
    id: 'gmail',
    name: 'Gmail',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14h-2V8.38L12 13.5 6 8.38V18H4V6h1.12L12 12.62 18.88 6H20v12z"/>
    </svg>`
  },
  {
    id: 'outlook',
    name: 'Outlook',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.179 4.885L14.005 0v4.198l-1.795.897v2.694l1.795-.897v4.198l7.174-4.885zm-9.073 2.895V4.198L4.821 0v4.198l1.795.897v2.694l-1.795-.897v4.198l7.285-4.885z"/>
    </svg>`
  }
]

const handleDeleteAccount = () => {
  // Here you would typically call an API to delete the account
  console.log('Deleting account...')
  showDeleteConfirmation.value = false
}
</script>

<template>
  <div class="space-y-6">
    <h1 class="page-title">Settings</h1>

    <div class="space-y-6">
      <!-- Email Configuration -->
      <div class="card">
        <div class="p-6 flex items-center justify-between">
          <div>
            <h2 class="text-lg font-medium text-gray-900">Email Configuration</h2>
            <p class="text-sm text-gray-500">Configure email settings for event notifications</p>
          </div>
          <div class="flex items-center">
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                v-model="emailEnabled"
                class="sr-only peer"
              >
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>

        <div v-if="emailEnabled" class="border-t border-gray-200 p-6 space-y-6">
          <!-- Email Provider Selection -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">
              Email Provider
            </label>
            <div class="grid grid-cols-2 gap-4">
              <button
                v-for="provider in emailProviders"
                :key="provider.id"
                @click="emailConfig.host = provider.id"
                class="p-6 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center gap-4 hover:shadow-lg"
                :class="[
                  emailConfig.host === provider.id
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-primary-200'
                ]"
              >
                <div
                  class="text-gray-600"
                  :class="{ 'text-primary-600': emailConfig.host === provider.id }"
                  v-html="provider.icon"
                ></div>
                <span class="text-lg font-medium">{{ provider.name }}</span>
              </button>
            </div>
          </div>

          <!-- Email Configuration Form -->
          <div class="grid gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                v-model="emailConfig.email"
                type="email"
                class="input mt-1"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Email Password</label>
              <input
                v-model="emailConfig.password"
                type="password"
                class="input mt-1"
                placeholder="Enter your email password"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">App Password</label>
              <input
                v-model="emailConfig.appPassword"
                type="password"
                class="input mt-1"
                placeholder="Enter your app password"
              />
              <p class="mt-2 text-sm text-gray-500">
                Required for secure authentication. Learn how to generate an app password for
                <a
                  :href="emailConfig.host === 'gmail' ? 'https://support.google.com/accounts/answer/185833?hl=en' : 'https://support.microsoft.com/en-us/account-billing/create-an-app-password-for-office-365-3e7c860f-bda4-4441-a618-b53953b1c5e0'"
                  target="_blank"
                  class="text-primary-600 hover:text-primary-700"
                >
                  {{ emailConfig.host === 'gmail' ? 'Gmail' : 'Outlook' }}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Delete Account -->
      <div class="card p-6">
        <div class="space-y-2">
          <h2 class="text-lg font-medium text-red-600 mb-5">Danger Zone</h2>
          <p class="text-sm text-gray-500">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button
            @click="showDeleteConfirmation = true"
            class="mt-4 btn bg-red-50 text-red-600 hover:bg-red-100"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Account Confirmation Modal -->
    <div
      v-if="showDeleteConfirmation"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full m-4">
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
          
          <h3 class="mt-4 text-lg font-medium text-gray-900">Delete Account</h3>
          <p class="mt-2 text-sm text-gray-500">
            Are you sure you want to delete your account? All of your data will be permanently removed.
            This action cannot be undone.
          </p>
        </div>

        <div class="mt-6 flex justify-end space-x-3">
          <button
            @click="showDeleteConfirmation = false"
            class="btn bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            @click="handleDeleteAccount"
            class="btn bg-red-600 text-white hover:bg-red-700"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  </div>
</template>