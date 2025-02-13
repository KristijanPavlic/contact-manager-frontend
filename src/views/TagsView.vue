<template>
  <div class="space-y-6">
    <h2 class="text-3xl font-bold text-gray-900 mb-4">Manage Tags</h2>
    <RouterLink to="/settings" class="btn btn-secondary"> Back to settings </RouterLink>
    <div>
      <Card>
        <h2 class="text-lg font-medium text-gray-900 mb-4">Tags</h2>
        <transition-group name="fade" tag="div" class="flex flex-wrap gap-2">
          <span
            v-for="tag in tags"
            :key="tag"
            class="group inline-flex items-center px-3 py-1 rounded-full md:text-md text-sm font-medium bg-green-100 text-green-800 relative"
          >
            {{ tag }}
            <button
              type="button"
              @click="deleteTag(tag)"
              class="ml-2 text-lg transition-opacity duration-200 text-red-500 hover:text-red-700 focus:outline-none"
              title="Delete tag"
            >
              &times;
            </button>
          </span>
        </transition-group>
        <form @submit.prevent="addTag" class="mt-4">
          <div class="flex rounded-md shadow-sm">
            <input
              type="text"
              v-model.trim="newTag"
              class="pl-2 flex-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-l-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
              placeholder="New tag"
            />
            <button
              type="submit"
              :disabled="!canAdd"
              class="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add
            </button>
          </div>
        </form>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Card from '@/components/CardComponent.vue'

// Define the tags array with an explicit type.
const tags = ref<string[]>([
  'umjeravanje',
  'ovjeravanje',
  'smarthome',
  'solari',
  'lps',
  'bps',
  'farmaceutska industrija',
  'veledrogerije',
  'ljekarne',
  'prehrambena',
  'industrijsko vaganje',
  'detekcija stranih tijela',
])

const newTag = ref('')

// Computed property to determine if the "Add" button should be enabled.
const canAdd = computed(() => newTag.value.trim().length > 0)

// Function to add a tag. This function is prepared for backend integration.
const addTag = async (): Promise<void> => {
  const trimmedTag = newTag.value.trim()
  if (!trimmedTag) return

  try {
    // POST request to backend (update the URL as needed)
    await fetch('/api/tags', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tag: trimmedTag }),
    })

    // On success, update the local state.
    tags.value.push(trimmedTag)
    newTag.value = ''
  } catch (error) {
    console.error('Failed to add tag:', error)
    // Optionally, add user feedback for failure here.
  }
}

// Function to delete a tag. This function is also prepared for backend integration.
const deleteTag = async (tagToDelete: string): Promise<void> => {
  try {
    // DELETE request to backend (update the URL as needed)
    await fetch(`/api/tags/${encodeURIComponent(tagToDelete)}`, {
      method: 'DELETE',
    })

    // Remove the tag from the local state.
    tags.value = tags.value.filter((tag) => tag !== tagToDelete)
  } catch (error) {
    console.error('Failed to delete tag:', error)
    // Optionally, add user feedback for failure here.
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
