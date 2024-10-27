<script setup lang="ts">
import { ref } from 'vue'

interface Participant {
  id: string;
  email: string;
  name: string;
  status: 'pending' | 'accepted' | 'declined';
  role: 'attendee' | 'presenter' | 'organizer';
}

const props = defineProps<{
  modelValue: Participant[];
}>()

const emit = defineEmits(['update:modelValue'])

const newParticipant = ref({
  email: '',
  name: '',
  role: 'attendee' as const
})

const addParticipant = () => {
  if (!newParticipant.value.email || !newParticipant.value.name) return
  
  emit('update:modelValue', [...props.modelValue, {
    id: crypto.randomUUID(),
    ...newParticipant.value,
    status: 'pending'
  }])
  
  newParticipant.value = {
    email: '',
    name: '',
    role: 'attendee'
  }
}

const removeParticipant = (id: string) => {
  emit('update:modelValue', props.modelValue.filter(p => p.id !== id))
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex gap-4">
      <div class="flex-1">
        <input
          v-model="newParticipant.name"
          type="text"
          placeholder="Participant Name"
          class="input"
        />
      </div>
      <div class="flex-1">
        <input
          v-model="newParticipant.email"
          type="email"
          placeholder="Email Address"
          class="input"
        />
      </div>
      <div class="w-40">
        <select v-model="newParticipant.role" class="input">
          <option value="attendee">Attendee</option>
          <option value="presenter">Presenter</option>
          <option value="organizer">Organizer</option>
        </select>
      </div>
      <button
        @click="addParticipant"
        class="btn btn-primary whitespace-nowrap"
        :disabled="!newParticipant.email || !newParticipant.name"
      >
        Add Participant
      </button>
    </div>

    <div class="bg-white rounded-lg border border-gray-200">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="participant in modelValue" :key="participant.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ participant.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ participant.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  :class="{
                    'bg-blue-100 text-blue-800': participant.role === 'attendee',
                    'bg-purple-100 text-purple-800': participant.role === 'presenter',
                    'bg-green-100 text-green-800': participant.role === 'organizer'
                  }"
                  class="px-2 py-1 rounded-full text-xs font-medium"
                >
                  {{ participant.role }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  :class="{
                    'bg-yellow-100 text-yellow-800': participant.status === 'pending',
                    'bg-green-100 text-green-800': participant.status === 'accepted',
                    'bg-red-100 text-red-800': participant.status === 'declined'
                  }"
                  class="px-2 py-1 rounded-full text-xs font-medium"
                >
                  {{ participant.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  @click="removeParticipant(participant.id)"
                  class="text-red-600 hover:text-red-900"
                >
                  Remove
                </button>
              </td>
            </tr>
            <tr v-if="modelValue.length === 0">
              <td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">
                No participants added yet
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>