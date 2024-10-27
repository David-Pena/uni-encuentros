<script setup lang="ts">
import { ref } from "vue";

const userProfile = ref({
  name: "Dr. Smith",
  department: "Computer Science",
  email: "smith@university.edu",
  about:
    "Professor of Computer Science with focus on Machine Learning and Artificial Intelligence.",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
});

const newAvatar = ref<File | null>(null);
const previewAvatar = ref(userProfile.value.avatar);
const showSuccessMessage = ref(false);

const handleAvatarChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("Image size should be less than 2MB");
      return;
    }

    newAvatar.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      previewAvatar.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const saveProfile = () => {
  // Here you would typically make an API call to update the profile
  showSuccessMessage.value = true;
  setTimeout(() => {
    showSuccessMessage.value = false;
  }, 3000);
};
</script>

<template>
  <div class="space-y-6">
    <h1 class="page-title">My Profile</h1>

    <form @submit.prevent="saveProfile" class="space-y-6">
      <!-- Avatar Section -->
      <div class="card p-6">
        <div class="flex items-start space-x-6">
          <div class="relative group">
            <img
              :src="previewAvatar"
              alt="Profile"
              class="w-32 h-32 rounded-lg object-cover"
            />
            <label
              class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 rounded-lg cursor-pointer transition-opacity duration-200"
            >
              <span class="text-sm font-medium">Change Photo</span>
              <input
                type="file"
                class="hidden"
                accept="image/*"
                @change="handleAvatarChange"
              />
            </label>
          </div>

          <div class="flex-1">
            <h3 class="text-lg font-medium text-gray-900">Profile Photo</h3>
            <p class="mt-1 text-sm text-gray-500">JPG, PNG or GIF (max. 2MB)</p>
            <div class="mt-4">
              <label class="btn btn-secondary cursor-pointer inline-block">
                <span>Upload new photo</span>
                <input
                  type="file"
                  class="hidden"
                  accept="image/*"
                  @change="handleAvatarChange"
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Profile Information -->
      <div class="card p-6 space-y-6">
        <h3 class="text-lg font-medium text-gray-900">Profile Information</h3>

        <div class="grid grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              v-model="userProfile.name"
              type="text"
              class="input mt-1"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Department</label>
            <input
              v-model="userProfile.department"
              type="text"
              class="input mt-1"
              placeholder="Enter your department"
            />
          </div>

          <div class="col-span-2">
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="userProfile.email"
              type="email"
              class="input mt-1"
              placeholder="Enter your email"
            />
          </div>

          <div class="col-span-2">
            <label class="block text-sm font-medium text-gray-700">About</label>
            <textarea
              v-model="userProfile.about"
              rows="4"
              class="input mt-1 resize-none"
              placeholder="Write a brief description about yourself..."
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Success Message -->
      <div
        v-if="showSuccessMessage"
        class="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg"
      >
        Profile updated successfully!
      </div>
      <!-- Save Button -->
      <div class="flex justify-end">
        <button type="submit" class="btn btn-primary">Save Changes</button>
      </div>
    </form>
  </div>
</template>
