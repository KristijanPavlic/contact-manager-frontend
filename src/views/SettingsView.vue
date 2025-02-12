<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold text-gray-900">Settings</h1>
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <Card>
        <h2 class="text-lg font-medium text-gray-900 mb-4">Employees</h2>
        <ul class="divide-y divide-gray-200">
          <li v-for="employee in employees" :key="employee.id" class="py-4">
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <img class="h-8 w-8 rounded-full" :src="employee.imageUrl" alt="" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">
                  {{ employee.name }}
                </p>
                <p class="text-sm text-gray-500 truncate">
                  {{ employee.position }}
                </p>
              </div>
              <div>
                <a
                  href="#"
                  class="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                >
                  Edit
                </a>
              </div>
            </div>
          </li>
        </ul>
      </Card>
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

const employees = ref([
  {
    id: 1,
    name: 'Jane Cooper',
    position: 'CEO',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 2,
    name: 'John Doe',
    position: 'CTO',
    imageUrl:
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  // Add more employees as needed
])

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
