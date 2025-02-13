<template>
  <div class="space-y-6">
    <h2 class="text-3xl font-bold text-gray-900">Dashboard</h2>
    <div class="grid gap-6 grid-cols-2 lg:grid-cols-4">
      <Card v-for="stat in stats" :key="stat.ime">
        <dt class="text-sm font-medium text-gray-500 truncate">
          {{ stat.ime }}
        </dt>
        <dd class="mt-1 text-3xl font-semibold text-gray-900">
          {{ stat.value }}
        </dd>
      </Card>
    </div>

    <!-- Logged-in Employee's Recent Contacts and Partners -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <h2 class="text-lg font-medium text-gray-900 mb-4">
          10 zadnje dodanih kontakata prijavljenog djelatnika
        </h2>
        <ul class="divide-y divide-gray-200">
          <li v-for="contact in myRecentContacts" :key="contact.id" class="py-4">
            <div class="flex items-center space-x-4">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">
                  {{ contact.ime }}
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
        <h2 class="text-lg font-medium text-gray-900 mb-4">
          10 zadnje dodanih partnera prijavljenog djelatnika
        </h2>
        <ul class="divide-y divide-gray-200">
          <li v-for="partner in myRecentPartners" :key="partner.id" class="py-4">
            <div class="flex items-center space-x-4">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">
                  {{ partner.ime }}
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

    <!-- Overall Recent Contacts and Partners -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <h2 class="text-lg font-medium text-gray-900 mb-4">10 zadnje dodanih kontakata ukupno</h2>
        <ul class="divide-y divide-gray-200">
          <li v-for="contact in recentContacts" :key="contact.id" class="py-4">
            <div class="flex items-center space-x-4">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">
                  {{ contact.ime }}
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
        <h2 class="text-lg font-medium text-gray-900 mb-4">10 zadnje dodanih partnera ukupno</h2>
        <ul class="divide-y divide-gray-200">
          <li v-for="partner in recentPartners" :key="partner.id" class="py-4">
            <div class="flex items-center space-x-4">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">
                  {{ partner.ime }}
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
  { ime: 'Svi kontakti', value: '1,234' },
  { ime: 'Svi Partneri', value: '120' },
  { ime: 'Aktivni kontakti', value: '1,023' },
  { ime: 'Akitvni Partneri', value: '98' },
])

// Data for overall recent contacts
const recentContacts = ref([
  {
    id: 1,
    ime: 'Jane Cooper',
    email: 'jane.cooper@example.com',
  },
  {
    id: 2,
    ime: 'John Doe',
    email: 'john.doe@example.com',
  },
  // Add more contacts as needed (up to 10)
])

// Data for overall recent partners
const recentPartners = ref([
  { id: 1, ime: 'Acme Inc', location: 'New York, NY' },
  { id: 2, ime: 'Globex Corporation', location: 'Springfield, IL' },
  // Add more partners as needed (up to 10)
])

// Data for logged-in employee's recent contacts
const myRecentContacts = ref([
  {
    id: 101,
    ime: 'Employee Jane',
    email: 'employee.jane@example.com',
  },
  {
    id: 102,
    ime: 'Employee John',
    email: 'employee.john@example.com',
  },
  // Add more employee contacts as needed (up to 10)
])

// Data for logged-in employee's recent partners
const myRecentPartners = ref([
  { id: 201, ime: 'Employee Partner A', location: 'Los Angeles, CA' },
  { id: 202, ime: 'Employee Partner B', location: 'Chicago, IL' },
  // Add more employee partners as needed (up to 10)
])
</script>
