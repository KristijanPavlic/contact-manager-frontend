<template>
  <div class="space-y-6">
    <h2 class="text-3xl font-bold text-gray-900 mb-4">Manage Tags</h2>
    <router-link to="/settings" class="btn btn-secondary">Back to settings</router-link>
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <Card>
        <h2 class="text-lg font-medium text-gray-900 mb-4">Tags</h2>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in tags"
            :key="tag"
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
          >
            {{ tag }}
          </span>
        </div>
        <form @submit.prevent="addTag" class="mt-4">
          <div class="flex rounded-md shadow-sm">
            <input
              type="text"
              v-model="newTag"
              class="focus:ring-green-500 focus:border-green-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
              placeholder="New tag"
            />
            <button
              type="submit"
              class="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
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
import { ref } from 'vue'
import Card from '@/components/CardComponent.vue'

const tags = ref([
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

const addTag = () => {
  if (newTag.value.trim()) {
    tags.value.push(newTag.value.trim())
    newTag.value = ''
  }
}
</script>
