<template>
  <div class="space-y-6">
    <h2 class="text-3xl font-bold text-gray-900 mb-4">Upravljanje djelatnicima</h2>
    <router-link
      to="/postavke"
      class="btn btn-secondary mr-2 flex items-center gap-2 text-gray-900 hover:text-black transition-all duration-300 ease-in-out"
    >
      Vrati se na odabir postavki
    </router-link>
    <div>
      <Card>
        <h2 class="text-lg font-medium text-gray-900 mb-4">Djelatnici</h2>
        <ul class="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          <li
            v-for="employee in employees"
            :key="employee.id"
            class="bg-white shadow rounded-lg p-6"
          >
            <!-- Header: Employee image and basic info -->
            <div class="flex items-center space-x-4">
              <div class="flex justify-between w-full gap-6">
                <h3 class="text-xl font-semibold text-gray-900">
                  {{ employee.ime }} {{ employee.prezime }}
                </h3>
                <p class="flex items-center text-sm text-gray-500 mt-1">
                  <BriefcaseIcon class="h-5 w-5 mr-2" />
                  <span>{{ employee.pozicija }}</span>
                </p>
              </div>
            </div>

            <!-- Details: Using a two-column grid for info -->
            <div class="mt-8 md:grid flex flex-col md:grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="flex items-center text-gray-600">
                <MailIcon class="h-5 w-5 mr-2" />
                <span class="text-sm min-w-0 truncate" :title="employee.email">
                  {{ employee.email }}
                </span>
              </div>
              <div class="flex items-center text-gray-600">
                <PhoneIcon class="h-5 w-5 mr-2" />
                <span class="text-sm min-w-0 truncate" :title="employee.telefon">
                  {{ employee.telefon }}
                </span>
              </div>
              <div class="flex items-center text-gray-600">
                <DeviceMobileIcon class="h-5 w-5 mr-2" />
                <span class="text-sm min-w-0 truncate" :title="employee.mobitel">
                  {{ employee.mobitel }}
                </span>
              </div>
              <div class="flex items-center text-gray-600">
                <span v-if="employee.jeAktivan" class="flex items-center">
                  <CheckCircleIcon class="h-5 w-5 mr-2 text-green-500" />
                  <span class="text-sm">Aktivan</span>
                </span>
                <span v-else class="flex items-center">
                  <XCircleIcon class="h-5 w-5 mr-2 text-red-500" />
                  <span class="text-sm">Neaktivan</span>
                </span>
              </div>
              <div class="flex items-center text-gray-600 col-span-2" v-if="employee.napomena">
                <AnnotationIcon class="h-5 w-5 mr-2" />
                <span class="text-sm min-w-0 break-words" :title="employee.napomena">
                  {{ employee.napomena }}
                </span>
              </div>
            </div>
          </li>
        </ul>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '../api/axiosInstance.ts'
import Card from '@/components/CardComponent.vue'
import {
  MailIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  XCircleIcon,
  AnnotationIcon,
  DeviceMobileIcon,
  PhoneIcon,
} from '@heroicons/vue/outline'

interface Employee {
  id: number
  ime: string
  prezime: string
  email: string
  telefon: string
  mobitel: string
  pozicija: string
  jeAktivan: boolean
  napomena?: string
}

const employees = ref<Employee[]>([])

// Load all employees from the backend
async function loadEmployees() {
  try {
    const response = await api.get(`/api/employee`)
    employees.value = response.data
  } catch (error) {
    console.error('Failed to load employees:', error)
  }
}

onMounted(() => {
  loadEmployees()
})
</script>
