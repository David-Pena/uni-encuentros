<script setup lang="ts">
import { watch } from "vue";
import { useRouter } from "vue-router";
import { SignIn, useAuth } from "vue-clerk";

const router = useRouter();
const { isSignedIn } = useAuth();

watch(isSignedIn, (newValue) => {
  if (newValue) {
    router.push({ name: "events" });
  }
});
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center px-4"
  >
    <div class="max-w-md w-full">
      <div class="text-center mb-8">
        <div
          class="w-12 h-12 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-xl mx-auto"
        >
          U
        </div>
        <h2 class="mt-4 text-3xl font-bold text-gray-900">Welcome back</h2>
        <p class="mt-2 text-gray-600">Sign in to your account to continue</p>
      </div>

      <SignIn />
    </div>
  </div>
</template>
