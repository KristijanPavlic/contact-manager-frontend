<template>
  <div class="space-y-6">
    <!-- Header and Add Contact Button -->
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h2 class="text-3xl font-bold text-gray-900">Kontakti</h2>
        <p class="mt-2 text-sm text-gray-700">
          Lista svih kontakata u sustavu. Možete dodati, urediti ili obrisati kontakt.
        </p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          type="button"
          @click="openAddContactModal"
          class="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto"
        >
          Dodaj kontakt
        </button>
      </div>
    </div>

    <!-- Contacts Table -->
    <Card>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                Ime
              </th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Prezime</th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Telefon</th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Mobitel</th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Pozicija</th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Aktivan</th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Napomena</th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Partneri</th>
              <th class="py-3.5 pl-3 pr-4 sm:pr-6">
                <span class="sr-only">Uredi</span>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="contact in contacts" :key="contact.id">
              <td
                class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
              >
                {{ contact.ime }}
              </td>
              <td class="whitespace-nowrap py-4 text-sm text-gray-900">
                {{ contact.prezime }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {{ contact.email }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {{ contact.telefon }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {{ contact.mobitel }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {{ contact.pozicija }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {{ contact.aktivan ? 'Da' : 'Ne' }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {{ contact.napomena }}
              </td>
              <!-- Dropdown with partner count -->
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <PartnerDropdown
                  v-model="contact.parnteri"
                  :availablePartners="availablePartners"
                />
              </td>
              <td class="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <a
                  href="#"
                  @click.prevent="openEditContactModal(contact)"
                  class="text-green-600 hover:text-green-900"
                >
                  Uredi<span class="sr-only">, {{ contact.ime }}</span>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>

    <!-- Modal for Adding/Editing Contact -->
    <teleport to="body">
      <div
        v-if="showContactModal"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900 bg-opacity-50 overflow-y-auto"
        @click.self="closeContactModal"
      >
        <div
          class="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-6 m-4 max-h-[calc(100vh-2rem)] overflow-y-auto"
        >
          <h3 class="text-xl font-semibold mb-4">
            {{ isEditing ? 'Uredi kontakt' : 'Dodaj kontakt' }}
          </h3>
          <form @submit.prevent="submitContact">
            <div class="mb-4">
              <label for="ime" class="block text-sm font-medium text-gray-700"> Ime </label>
              <input
                type="text"
                id="ime"
                placeholder="Unesite ime"
                v-model="newContact.ime"
                required
                class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div class="mb-4">
              <label for="prezime" class="block text-sm font-medium text-gray-700"> Prezime </label>
              <input
                type="text"
                id="prezime"
                placeholder="Unesite prezime"
                v-model="newContact.prezime"
                required
                class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div class="mb-4">
              <label for="email" class="block text-sm font-medium text-gray-700"> Email </label>
              <input
                type="email"
                id="email"
                placeholder="Unesite email"
                v-model="newContact.email"
                class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div class="mb-4">
              <label for="telefon" class="block text-sm font-medium text-gray-700"> Telefon </label>
              <input
                type="text"
                id="telefon"
                placeholder="Unesite broj telefona"
                v-model="newContact.telefon"
                class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div class="mb-4">
              <label for="mobitel" class="block text-sm font-medium text-gray-700"> Mobitel </label>
              <input
                type="text"
                id="mobitel"
                placeholder="Unesite broj mobitela"
                v-model="newContact.mobitel"
                class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div class="mb-4">
              <label for="pozicija" class="block text-sm font-medium text-gray-700">
                Pozicija
              </label>
              <input
                type="text"
                id="pozicija"
                placeholder="Unesite poziciju"
                v-model="newContact.pozicija"
                class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div class="mb-4 flex items-center">
              <input
                type="checkbox"
                id="aktivan"
                v-model="newContact.aktivan"
                class="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label for="aktivan" class="ml-2 block text-sm text-gray-700"> Aktivan </label>
            </div>
            <div class="mb-4">
              <label for="napomena" class="block text-sm font-medium text-gray-700">
                Napomena
              </label>
              <textarea
                id="napomena"
                placeholder="Unesite napomenu"
                v-model="newContact.napomena"
                class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                rows="3"
              ></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Partneri</label>
              <PartnerDropdown
                v-model="newContact.parnteri"
                :availablePartners="availablePartners"
              />
            </div>
            <div class="flex justify-end">
              <button
                type="button"
                @click="closeContactModal"
                class="mr-2 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Odustani
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Spremi
              </button>
            </div>
          </form>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Card from '@/components/CardComponent.vue'
import PartnerDropdown from '@/components/PartnerDropdown.vue'

interface Contact {
  id: number
  ime: string
  prezime: string
  email: string
  telefon: string
  mobitel: string
  pozicija: string
  aktivan: boolean
  napomena: string
  parnteri: string[]
}

const availablePartners = [
  'Feroimpex',
  'Oktal Pharma',
  'Ljekarne Zagreb',
  'Ljekarne Vaše zdravlje',
  'Pharma Plus',
  'Medika',
  'Ljekarne Prima',
  'Pharma Store',
  'Ljekarne Zdravlje',
  'Pharma Med',
  'Tech Solutions',
  'IT Hub',
  'Finance Corp',
  'Money Matters',
  'Operations Inc',
  'Efficiency Experts',
  'Customer Care',
  'Service Solutions',
  'Logistics Plus',
  'Transport Solutions',
]

const contacts = ref<Contact[]>([
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
    parnteri: ['Feroimpex', 'Oktal Pharma'],
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
    parnteri: ['Ljekarne Zagreb', 'Ljekarne Vaše zdravlje'],
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
    parnteri: ['Pharma Plus', 'Medika'],
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
    parnteri: ['Ljekarne Prima', 'Pharma Store'],
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
    parnteri: ['Ljekarne Zdravlje', 'Pharma Med'],
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
    parnteri: ['Tech Solutions', 'IT Hub'],
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
    parnteri: ['Finance Corp', 'Money Matters'],
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
    parnteri: ['Operations Inc', 'Efficiency Experts'],
  },
  {
    id: 9,
    ime: 'Sara',
    prezime: 'Sarić',
    email: 'sara.saric@mail.com',
    telefon: '+385 1 890 1234',
    mobitel: '+385 91 777 7777',
    pozicija: 'Customer Service Manager',
    aktivan: true,
    napomena: 'Vrlo ljubazna',
    parnteri: ['Customer Care', 'Service Solutions'],
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
    parnteri: ['Logistics Plus', 'Transport Solutions'],
  },
])

const showContactModal = ref(false)
const isEditing = ref(false)

const newContact = ref<Contact>({
  id: 0,
  ime: '',
  prezime: '',
  email: '',
  telefon: '',
  mobitel: '',
  pozicija: '',
  aktivan: false,
  napomena: '',
  parnteri: [],
})

function openAddContactModal() {
  resetNewContact()
  isEditing.value = false
  showContactModal.value = true
}

function openEditContactModal(contact: Contact) {
  newContact.value = { ...contact }
  isEditing.value = true
  showContactModal.value = true
}

function closeContactModal() {
  showContactModal.value = false
}

function resetNewContact() {
  newContact.value = {
    id: 0,
    ime: '',
    prezime: '',
    email: '',
    telefon: '',
    mobitel: '',
    pozicija: '',
    aktivan: false,
    napomena: '',
    parnteri: [],
  }
}

function submitContact() {
  if (isEditing.value) {
    const index = contacts.value.findIndex((c) => c.id === newContact.value.id)
    if (index !== -1) {
      contacts.value[index] = { ...newContact.value }
    }
  } else {
    const newId = contacts.value.length ? Math.max(...contacts.value.map((c) => c.id)) + 1 : 1
    newContact.value.id = newId
    contacts.value.push({ ...newContact.value })
  }
  closeContactModal()
}
</script>
