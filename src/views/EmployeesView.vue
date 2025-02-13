<template>
  <div class="space-y-6">
    <h2 class="text-3xl font-bold text-gray-900 mb-4">Manage Employees</h2>
    <router-link to="/settings" class="btn btn-secondary mr-2">Back to settings</router-link>
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
                  {{ employee.firstName }} {{ employee.lastName }}
                </p>
                <p class="text-sm text-gray-500 truncate">
                  {{ employee.position }}
                </p>
                <p class="text-sm text-gray-500 truncate">
                  {{ employee.email }}
                </p>
                <p class="text-sm text-gray-500 truncate">
                  {{ employee.phone }}
                </p>
                <p class="text-sm text-gray-500 truncate">
                  {{ employee.mobile }}
                </p>
                <p class="text-sm text-gray-500 truncate">
                  {{ employee.active }}
                </p>
                <p class="text-sm text-gray-500 truncate">
                  {{ employee.note }}
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Card from '@/components/CardComponent.vue'

const employees = ref([
  {
    id: 1,
    firstName: 'Pero',
    lastName: 'Perić',
    email: 'pero.peric@mail.com',
    phone: '+385 1 123 4567',
    mobile: '+385 91 000 0000',
    position: 'Voditelj kvalitete',
    active: true,
    note: 'Jako ljubazan',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 2,
    firstName: 'Ivan',
    lastName: 'Horavt',
    email: 'ivan.horvat@mail.com',
    phone: '+385 1 564 0094',
    mobile: '+385 95 123 4567',
    position: 'Voditelj nabave',
    active: false,
    note: 'Nepouzdan',
    partners: 'Ljekarne Zagreb, Ljekarne Vaše zdravlje',
    imageUrl:
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  // Add more employees as needed
])
</script>
