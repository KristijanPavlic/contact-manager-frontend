<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
    <div class="grid gap-6 grid-cols-2 lg:grid-cols-4">
      <Card v-for="stat in stats" :key="stat.name">
        <dt class="text-sm font-medium text-gray-500 truncate">
          {{ stat.name }}
        </dt>
        <dd class="mt-1 text-3xl font-semibold text-gray-900">
          {{ stat.value }}
        </dd>
      </Card>
    </div>
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <h2 class="text-lg font-medium text-gray-900 mb-4">Recent Contacts</h2>
        <ul class="divide-y divide-gray-200">
          <li v-for="contact in recentContacts" :key="contact.id" class="py-4">
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <img class="h-8 w-8 rounded-full" :src="contact.imageUrl" alt="" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">
                  {{ contact.name }}
                </p>
                <p class="text-sm text-gray-500 truncate">
                  {{ contact.email }}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </Card>
      <Card>
        <h2 class="text-lg font-medium text-gray-900 mb-4">Recent Partners</h2>
        <ul class="divide-y divide-gray-200">
          <li v-for="partner in recentPartners" :key="partner.id" class="py-4">
            <div class="flex items-center space-x-4">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">
                  {{ partner.name }}
                </p>
                <p class="text-sm text-gray-500 truncate">
                  {{ partner.location }}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Card from '@/components/CardComponent.vue'

const stats = ref([
  { name: 'Total Partners', value: '120' },
  { name: 'Total Contacts', value: '1,234' },
  { name: 'Active Partners', value: '98' },
  { name: 'Active Contacts', value: '1,023' },
])

const recentContacts = ref([
  {
    id: 1,
    name: 'Jane Cooper',
    email: 'jane.cooper@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'john.doe@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  // Add more contacts as needed
])

const recentPartners = ref([
  { id: 1, name: 'Acme Inc', location: 'New York, NY' },
  { id: 2, name: 'Globex Corporation', location: 'Springfield, IL' },
  // Add more partners as needed
])
</script>
