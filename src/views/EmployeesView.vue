<template>
  <div class="space-y-6">
    <h2 class="text-3xl font-bold text-gray-900 mb-4">Upravljanje djelatnicima</h2>
    <router-link
      to="/postavke"
      class="btn btn-secondary mr-2 flex items-center gap-2 text-gray-900 hover:text-black transition-all duration-300 ease-in-out"
      >Vrati se na odabir postavki</router-link
    >
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
                <span v-if="employee.aktivan" class="flex items-center">
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
import { ref } from 'vue'
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
  aktivan: boolean
  napomena?: string
}

const employees = ref<Employee[]>([
  {
    id: 1,
    ime: 'Pero',
    prezime: 'Perić',
    email: 'pero.peric@mail.com',
    telefon: '+385 1 123 4567',
    mobitel: '+385 91 000 0000',
    pozicija: 'Voditelj kvalitete',
    aktivan: true,
    napomena: 'Jako ljubazan',
  },
  {
    id: 2,
    ime: 'Ivan',
    prezime: 'Horavt',
    email: 'ivan.horvat@mail.com',
    telefon: '+385 1 564 0094',
    mobitel: '+385 95 123 4567',
    pozicija: 'Voditelj nabave',
    aktivan: false,
    napomena: 'Nepouzdan',
  },
  {
    id: 3,
    ime: 'Ana',
    prezime: 'Anić',
    email: 'ana.anic@mail.com',
    telefon: '+385 1 234 5678',
    mobitel: '+385 91 111 1111',
    pozicija: 'Marketing Manager',
    aktivan: true,
    napomena: 'Vrlo profesionalna',
  },
  {
    id: 4,
    ime: 'Marko',
    prezime: 'Markić',
    email: 'marko.markic@mail.com',
    telefon: '+385 1 345 6789',
    mobitel: '+385 91 222 2222',
    pozicija: 'Sales Manager',
    aktivan: true,
    napomena: 'Odličan pregovarač',
  },
  {
    id: 5,
    ime: 'Ivana',
    prezime: 'Ivić',
    email: 'ivana.ivic@mail.com',
    telefon: '+385 1 456 7890',
    mobitel: '+385 91 333 3333',
    pozicija: 'HR Manager',
    aktivan: true,
    napomena: 'Vrlo organizirana',
  },
  {
    id: 6,
    ime: 'Petar',
    prezime: 'Petrović',
    email: 'petar.petrovic@mail.com',
    telefon: '+385 1 567 8901',
    mobitel: '+385 91 444 4444',
    pozicija: 'IT Manager',
    aktivan: true,
    napomena: 'Vrlo tehnički potkovan',
  },
  {
    id: 7,
    ime: 'Maja',
    prezime: 'Majić',
    email: 'maja.majic@mail.com',
    telefon: '+385 1 678 9012',
    mobitel: '+385 91 555 5555',
    pozicija: 'Finance Manager',
    aktivan: true,
    napomena: 'Vrlo precizna',
  },
  {
    id: 8,
    ime: 'Luka',
    prezime: 'Lukić',
    email: 'luka.lukic@mail.com',
    telefon: '+385 1 789 0123',
    mobitel: '+385 91 666 6666',
    pozicija: 'Operations Manager',
    aktivan: true,
    napomena: 'Vrlo učinkovit',
  },
  {
    id: 10,
    ime: 'Tomislav',
    prezime: 'Tomić',
    email: 'tomislav.tomic@mail.com',
    telefon: '+385 1 901 2345',
    mobitel: '+385 91 888 8888',
    pozicija: 'Logistics Manager',
    aktivan: true,
    napomena: 'Vrlo organiziran',
  },
  // Add more employees as needed
])
</script>
