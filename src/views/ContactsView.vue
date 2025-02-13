<template>
  <div class="space-y-6">
    <!-- Zaglavlje i gumb za dodavanje kontakta -->
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

    <!-- Tablica kontakata -->
    <Card>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Ime
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Prezime
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Email
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Telefon
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Mobitel
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Pozicija
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Aktivan
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Napomena
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Partneri
              </th>
              <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
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
              <td class="whitespace-nowrap py-4 text-sm font-medium text-gray-900">
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
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {{ contact.parnteri }}
              </td>
              <td
                class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
              >
                <a
                  href="#"
                  @click.prevent="openEditContactModal(contact)"
                  class="text-green-600 hover:text-green-900"
                  >Uredi<span class="sr-only">, {{ contact.ime }}</span></a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>

    <!-- Modal za dodavanje/uređivanje kontakta -->
    <!-- Koristimo teleport da se modal prikaže izravno u <body> i time preklopi sve elemente na stranici. -->
    <teleport to="body">
      <div
        v-if="showContactModal"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900 bg-opacity-50 overflow-y-auto"
        @click.self="closeContactModal"
      >
        <!-- Okvir modala -->
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
            <!-- Checkbox za aktivan/neaktivan kontakt -->
            <div class="mb-4 flex items-center">
              <input
                type="checkbox"
                id="aktivan"
                v-model="newContact.aktivan"
                class="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label for="aktivan" class="ml-2 block text-sm text-gray-700">Aktivan</label>
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
            <div class="mb-4">
              <label for="parnteri" class="block text-sm font-medium text-gray-700">
                Partneri
              </label>
              <input
                type="text"
                id="parnteri"
                placeholder="Unesite nazive partnera (odvojene zarezom ili sl.)"
                v-model="newContact.parnteri"
                class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
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
// import axios from 'axios'  // Otkomentirajte kada budete imali backend

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
  parnteri: string
}

// Početni popis kontakata (možete zamijeniti s pozivom prema API-ju)
const contacts = ref([
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
    parnteri: 'Feroimpex, Oktal Pharma',
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
    parnteri: 'Ljekarne Zagreb, Ljekarne Vaše zdravlje',
  },
  // Dodajte više kontakata po potrebi
])

// Kontrola modala
const showContactModal = ref(false)
const isEditing = ref(false)

// Model za novi/uređivani kontakt
const newContact = ref({
  id: 0,
  ime: '',
  prezime: '',
  email: '',
  telefon: '',
  mobitel: '',
  pozicija: '',
  aktivan: false,
  napomena: '',
  parnteri: '',
})

// Otvaranje modala za dodavanje kontakta
function openAddContactModal() {
  resetNewContact()
  isEditing.value = false
  showContactModal.value = true
}

// Otvaranje modala za uređivanje kontakta
function openEditContactModal(contact: Contact) {
  newContact.value = { ...contact }
  isEditing.value = true
  showContactModal.value = true
}

// Zatvaranje modala
function closeContactModal() {
  showContactModal.value = false
}

// Reset modela (prazni svi podaci)
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
    parnteri: '',
  }
}

// Submit forme (dodavanje ili uređivanje)
async function submitContact() {
  // Primjer integracije s backendom:
  // if (isEditing.value) {
  //   try {
  //     await axios.put(`/api/contacts/${newContact.value.id}`, newContact.value)
  //   } catch (error) {
  //     console.error('Greška pri ažuriranju kontakta:', error)
  //     return
  //   }
  // } else {
  //   try {
  //     const response = await axios.post('/api/contacts', newContact.value)
  //     newContact.value.id = response.data.id
  //   } catch (error) {
  //     console.error('Greška pri dodavanju kontakta:', error)
  //     return
  //   }
  // }

  if (isEditing.value) {
    // Ažuriranje lokalnog niza
    const index = contacts.value.findIndex((c) => c.id === newContact.value.id)
    if (index !== -1) {
      contacts.value[index] = { ...newContact.value }
    }
  } else {
    // Generiramo ID lokalno (u praksi - dohvatiti s backenda)
    const newId = contacts.value.length ? Math.max(...contacts.value.map((c) => c.id)) + 1 : 1
    newContact.value.id = newId
    contacts.value.push({ ...newContact.value })
  }

  closeContactModal()
}
</script>
