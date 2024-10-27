<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import PresenterCard from '../components/PresenterCard.vue'
import NewPresenterForm from '../components/NewPresenterForm.vue'

const router = useRouter()
const currentStep = ref(1)
const totalSteps = 5
const showNewPresenterForm = ref(false)

const eventData = ref({
  title: '',
  type: '',
  goal: '',
  date: '',
  time: '',
  presenters: [] as string[]
})

const eventTypes = [
  { id: 'seminario', name: 'Seminario', icon: '🎓' },
  { id: 'charla', name: 'Charla', icon: '💡' },
  { id: 'presentacion', name: 'Presentación', icon: '📊' }
]

const availablePresenters = ref([
  { id: 1, name: 'Dr. Jane Smith', expertise: 'Machine Learning', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane' },
  { id: 2, name: 'Prof. John Doe', expertise: 'Data Science', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
  { id: 3, name: 'Dr. Alice Johnson', expertise: 'Artificial Intelligence', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice' },
  { id: 4, name: 'Prof. Robert Wilson', expertise: 'Robotics', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert' }
])

const progress = computed(() => (currentStep.value / totalSteps) * 100)

const nextStep = () => {
  if (currentStep.value < totalSteps) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const handleSubmit = () => {
  router.push('/preview/1')
}

const togglePresenter = (presenterId: string) => {
  const index = eventData.value.presenters.indexOf(presenterId)
  if (index === -1) {
    eventData.value.presenters.push(presenterId)
  } else {
    eventData.value.presenters.splice(index, 1)
  }
}

const addNewPresenter = (presenter: { name: string }) => {
  const newPresenter = {
    id: `new-${Date.now()}`,
    name: presenter.name,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${presenter.name}`
  }
  availablePresenters.value.push(newPresenter)
  eventData.value.presenters.push(newPresenter.id.toString())
  showNewPresenterForm.value = false
}

const isStepValid = computed(() => {
  switch (currentStep.value) {
    case 1:
      return eventData.value.title.length >= 3
    case 2:
      return eventData.value.type !== ''
    case 3:
      return eventData.value.goal.length >= 10
    case 4:
      return eventData.value.date !== '' && eventData.value.time !== ''
    case 5:
      return eventData.value.presenters.length > 0
    default:
      return false
  }
})
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <div class="mb-8">
      <h1 class="page-title mb-4">Create New Event</h1>
      
      <!-- Progress Bar -->
      <div class="relative pt-1">
        <div class="flex mb-2 items-center justify-between">
          <div>
            <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary-600 bg-primary-200">
              Step {{ currentStep }} of {{ totalSteps }}
            </span>
          </div>
          <div class="text-right">
            <span class="text-xs font-semibold inline-block text-primary-600">
              {{ Math.round(progress) }}%
            </span>
          </div>
        </div>
        <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-200">
          <div
            :style="{ width: `${progress}%` }"
            class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500 transition-all duration-500"
          ></div>
        </div>
      </div>
    </div>

    <div class="card p-8">
      <!-- Step 1: Event Name -->
      <div v-if="currentStep === 1" class="space-y-6">
        <h2 class="text-2xl font-bold text-gray-800">What's your event called?</h2>
        <div class="space-y-2">
          <input
            v-model="eventData.title"
            type="text"
            class="input text-2xl font-medium"
            placeholder="Enter a catchy title..."
            :class="{ 'ring-2 ring-green-500': eventData.title.length >= 3 }"
          />
          <p class="text-sm text-gray-500">Make it clear and memorable</p>
        </div>
      </div>

      <!-- Step 2: Event Type -->
      <div v-if="currentStep === 2" class="space-y-6">
        <h2 class="text-2xl font-bold text-gray-800">What type of event is this?</h2>
        <div class="grid grid-cols-3 gap-4">
          <button
            v-for="type in eventTypes"
            :key="type.id"
            @click="eventData.type = type.id"
            class="aspect-square p-6 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center gap-4 hover:shadow-lg"
            :class="[
              eventData.type === type.id
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-200 hover:border-primary-200'
            ]"
          >
            <span class="text-4xl">{{ type.icon }}</span>
            <span class="text-lg font-medium">{{ type.name }}</span>
          </button>
        </div>
      </div>

      <!-- Step 3: Event Goal -->
      <div v-if="currentStep === 3" class="space-y-6">
        <h2 class="text-2xl font-bold text-gray-800">What's the goal of this event?</h2>
        <div class="space-y-2">
          <textarea
            v-model="eventData.goal"
            rows="4"
            class="input resize-none"
            placeholder="Describe the main objectives and what attendees will learn or achieve..."
            :class="{ 'ring-2 ring-green-500': eventData.goal.length >= 10 }"
          ></textarea>
          <p class="text-sm text-gray-500">
            {{ eventData.goal.length }}/500 characters
            <span v-if="eventData.goal.length < 10" class="text-yellow-600">
              (minimum 10 characters)
            </span>
          </p>
        </div>
      </div>

      <!-- Step 4: Date and Time -->
      <div v-if="currentStep === 4" class="space-y-6">
        <h2 class="text-2xl font-bold text-gray-800">When is your event?</h2>
        <div class="grid grid-cols-2 gap-6">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Date</label>
            <input
              v-model="eventData.date"
              type="date"
              class="input"
            />
          </div>
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Time</label>
            <input
              v-model="eventData.time"
              type="time"
              class="input"
            />
          </div>
        </div>
      </div>

      <!-- Step 5: Presenters -->
      <div v-if="currentStep === 5" class="space-y-6">
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-bold text-gray-800">Who are the presenters?</h2>
          <button
            v-if="!showNewPresenterForm"
            @click="showNewPresenterForm = true"
            class="btn btn-secondary"
          >
            Add New Presenter
          </button>
        </div>

        <NewPresenterForm
          v-if="showNewPresenterForm"
          @add="addNewPresenter"
          @cancel="showNewPresenterForm = false"
        />

        <div class="grid grid-cols-2 gap-4">
          <PresenterCard
            v-for="presenter in availablePresenters"
            :key="presenter.id"
            :presenter="presenter"
            :is-selected="eventData.presenters.includes(presenter.id.toString())"
            @toggle="togglePresenter(presenter.id.toString())"
          />
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="flex justify-between mt-8 pt-6 border-t border-gray-100">
        <button
          v-if="currentStep > 1"
          @click="prevStep"
          class="btn bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          Back
        </button>
        <button
          v-if="currentStep < totalSteps"
          @click="nextStep"
          class="btn btn-primary ml-auto"
          :disabled="!isStepValid"
        >
          Continue
        </button>
        <button
          v-else
          @click="handleSubmit"
          class="btn btn-primary ml-auto"
          :disabled="!isStepValid"
        >
          Create Event
        </button>
      </div>
    </div>
  </div>
</template>