<template>
  <div class="space-y-6">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h2 class="text-3xl font-bold text-gray-900">Contacts</h2>
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
                First Name
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Last Name
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Email
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Phone
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Mobile
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Position
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Active
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Note
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Partners
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
                {{ contact.firstName }}
              </td>
              <td
                class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
              >
                {{ contact.lastName }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ contact.email }}</td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ contact.phone }}</td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {{ contact.mobile }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {{ contact.position }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {{ contact.active }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {{ contact.note }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {{ contact.partners }}
              </td>
              <td
                class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
              >
                <a href="#" class="text-green-600 hover:text-green-900"
                  >Edit<span class="sr-only">, {{ contact.firstName }}</span></a
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
    firstName: 'Pero',
    lastName: 'Perić',
    email: 'pero.peric@mail.com',
    phone: '+385 1 123 4567',
    mobile: '+385 91 000 0000',
    position: 'Voditelj kvalitete',
    active: true,
    note: 'Jako ljubazan',
    partners: 'Feroimpex, Oktal Pharma',
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
  },
  // Add more contacts as needed
])
</script>
