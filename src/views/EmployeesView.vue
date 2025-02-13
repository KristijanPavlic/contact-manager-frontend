<template>
  <div class="space-y-6">
    <h2 class="text-3xl font-bold text-gray-900 mb-4">Manage Employees</h2>
    <router-link
      to="/settings"
      class="btn btn-secondary mr-2 flex items-center gap-2 text-gray-900 hover:text-black transition-all duration-300 ease-in-out"
      >Back to settings</router-link
    >
    <div>
      <Card>
        <h2 class="text-lg font-medium text-gray-900 mb-4">Employees</h2>
        <ul class="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          <li
            v-for="employee in employees"
            :key="employee.id"
            class="bg-white shadow rounded-lg p-6"
          >
            <!-- Header: Employee image and basic info -->
            <div class="flex items-center space-x-4">
              <img
                class="h-16 w-16 rounded-full object-cover"
                :src="employee.imageUrl"
                alt="Employee Photo"
              />
              <div>
                <h3 class="text-xl font-semibold text-gray-900">
                  {{ employee.firstName }} {{ employee.lastName }}
                </h3>
                <p class="flex items-center text-sm text-gray-500 mt-1">
                  <BriefcaseIcon class="h-5 w-5 mr-1" />
                  <span>{{ employee.position }}</span>
                </p>
              </div>
            </div>

            <!-- Details: Using a two-column grid for info -->
            <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="flex items-center text-gray-600">
                <MailIcon class="h-5 w-5 mr-2" />
                <span class="text-sm">{{ employee.email }}</span>
              </div>
              <div class="flex items-center text-gray-600">
                <PhoneIcon class="h-5 w-5 mr-2" />
                <span class="text-sm">{{ employee.phone }}</span>
              </div>
              <div class="flex items-center text-gray-600">
                <DeviceMobileIcon class="h-5 w-5 mr-2" />
                <span class="text-sm">{{ employee.mobile }}</span>
              </div>
              <div class="flex items-center text-gray-600">
                <span v-if="employee.active" class="flex items-center">
                  <CheckCircleIcon class="h-5 w-5 mr-2 text-green-500" />
                  <span class="text-sm">Active</span>
                </span>
                <span v-else class="flex items-center">
                  <XCircleIcon class="h-5 w-5 mr-2 text-red-500" />
                  <span class="text-sm">Inactive</span>
                </span>
              </div>
              <div class="flex items-center text-gray-600 col-span-2" v-if="employee.note">
                <AnnotationIcon class="h-5 w-5 mr-2" />
                <span class="text-sm">{{ employee.note }}</span>
              </div>
              <div class="flex items-center text-gray-600 col-span-2" v-if="employee.partners">
                <UsersIcon class="h-5 w-5 mr-2" />
                <span class="text-sm">{{ employee.partners }}</span>
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
import {
  MailIcon,
  PhoneIcon,
  DeviceMobileIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  XCircleIcon,
  AnnotationIcon,
  UsersIcon,
} from '@heroicons/vue/outline'

interface Employee {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  mobile: string
  position: string
  active: boolean
  note?: string
  partners?: string
  imageUrl: string
}

const employees = ref<Employee[]>([
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
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
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
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 3,
    firstName: 'Pero',
    lastName: 'Perić',
    email: 'pero.peric@mail.com',
    phone: '+385 1 123 4567',
    mobile: '+385 91 000 0000',
    position: 'Voditelj kvalitete',
    active: true,
    note: 'Jako ljubazan',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 4,
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
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  // Add more employees as needed
])
</script>
