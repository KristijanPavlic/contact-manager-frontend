<template>
  <div class="space-y-6">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-3xl font-bold text-gray-900">Contacts</h1>
        <p class="mt-2 text-sm text-gray-700">
          A list of all the contacts in your account including their name, title, email and role.
        </p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto"
        >
          Add contact
        </button>
      </div>
    </div>
    <Card>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Name
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Email
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Phone
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Position
              </th>
              <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="contact in contacts" :key="contact.id">
              <td
                class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
              >
                {{ contact.name }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ contact.email }}</td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ contact.phone }}</td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {{ contact.position }}
              </td>
              <td
                class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
              >
                <a href="#" class="text-green-600 hover:text-green-900"
                  >Edit<span class="sr-only">, {{ contact.name }}</span></a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Card from '@/components/CardComponent.vue'

const contacts = ref([
  {
    id: 1,
    name: 'Jane Cooper',
    email: 'jane.cooper@example.com',
    phone: '+1 (555) 123-4567',
    position: 'CEO',
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 987-6543',
    position: 'CTO',
  },
  // Add more contacts as needed
])
</script>
