<template>
  <div class="space-y-6">
    <!-- Loading and error messages -->
    <div v-if="isLoading" class="text-center text-gray-600">Učitavam kontakte...</div>
    <div v-if="errorMessage" class="text-center text-red-600">
      {{ errorMessage }}
    </div>

    <!-- Header and Add Contact Button (hidden while loading) -->
    <div v-if="!isLoading" class="sm:flex sm:items-center">
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
    <Card v-if="!isLoading && contacts.length > 0">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                Ime
              </th>
              <th class="py-3.5 text-left text-sm font-semibold text-gray-900">Prezime</th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Telefon</th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Mobitel</th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Pozicija</th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Aktivan</th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Napomena</th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Partneri</th>
              <th class="py-3.5 pl-3 pr-4 sm:pr-6">
                <span class="sr-only">Uredi / Izbriši</span>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="contact in contacts" :key="contact.id">
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6">
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
                {{ contact.jeAktivan ? 'Da' : 'Ne' }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {{ contact.napomena }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <!-- Read-only dropdown displaying contact.parnteri -->
                <PartnerDropdown
                  v-model="contact.parnteri"
                  :availablePartners="availablePartners"
                  :editable="false"
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
                <button
                  @click.prevent="deleteContact(contact)"
                  class="ml-2 text-red-600 hover:text-red-900"
                >
                  Izbriši
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
    <Card v-if="!isLoading && contacts.length === 0" class="text-center p-4">
      Nema kontakata.
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
                v-model="newContact.jeAktivan"
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
              <label class="block text-sm font-medium text-gray-700"> Partneri </label>
              <!-- Editable dropdown in modal -->
              <PartnerDropdown
                v-model="newContact.parnteri"
                :availablePartners="availablePartners"
                :editable="true"
              />
            </div>
            <div class="flex justify-end mt-4">
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
                :disabled="isSubmitting"
              >
                <span v-if="isSubmitting">Spremanje...</span>
                <span v-else>Spremi</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '../api/axiosInstance'
import Card from '@/components/CardComponent.vue'
import PartnerDropdown from '@/components/PartnerDropdown.vue'
import { jwtDecode } from 'jwt-decode'

interface IPartnerData {
  nazivPartnera: string
  vatBroj: string
}

interface Contact {
  id: number
  ime: string
  prezime: string
  email: string
  telefon: string
  mobitel: string
  pozicija: string
  jeAktivan: boolean
  napomena: string
  parnteri: IPartnerData[]
  KontaktPartneri?: { partner: IPartnerData }[]
}

interface IJwtPayload {
  nameid?: string
  sub?: string
}

const contacts = ref<Contact[]>([])
const availablePartners = ref<IPartnerData[]>([])

const showContactModal = ref(false)
const isEditing = ref(false)
const isLoading = ref(false)
const isSubmitting = ref(false)
const errorMessage = ref('')

const newContact = ref<Contact>({
  id: 0,
  ime: '',
  prezime: '',
  email: '',
  telefon: '',
  mobitel: '',
  pozicija: '',
  jeAktivan: false,
  napomena: '',
  parnteri: [],
})

// Load contacts and flatten KontaktPartneri into parnteri.
async function loadContacts() {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const response = await api.get('/api/contact')
    contacts.value = response.data.map((contact: Contact) => {
      contact.parnteri =
        (contact.KontaktPartneri || []).map((kp: { partner: IPartnerData }) => kp.partner) || []
      return contact
    })
  } catch (error: unknown) {
    console.error('Failed to load contacts:', error)
    errorMessage.value = 'Neuspješno učitavanje kontakata.'
  } finally {
    isLoading.value = false
  }
}

// Load available partners from the backend.
async function loadAvailablePartners() {
  try {
    const response = await api.get('/api/partner')
    availablePartners.value = response.data.map(
      (p: { nazivPartnera: string; vatBroj: string }) => ({
        nazivPartnera: p.nazivPartnera,
        vatBroj: p.vatBroj,
      }),
    )
  } catch (error: unknown) {
    console.error('Failed to load available partners:', error)
    errorMessage.value = 'Neuspješno učitavanje partnera.'
  }
}

function openAddContactModal() {
  resetNewContact()
  isEditing.value = false
  showContactModal.value = true
}

function openEditContactModal(contact: Contact) {
  newContact.value = JSON.parse(JSON.stringify(contact))
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
    jeAktivan: false,
    napomena: '',
    parnteri: [],
  }
}

function getUserIdFromToken(): number | null {
  const token = localStorage.getItem('token')
  if (!token) {
    console.error('Token not found in localStorage')
    return null
  }
  try {
    const decoded = jwtDecode(token) as IJwtPayload
    const userIdStr = decoded.nameid || decoded.sub
    return userIdStr ? parseInt(userIdStr, 10) : null
  } catch (error) {
    console.error('Failed to decode token:', error)
    return null
  }
}

const userId = getUserIdFromToken()

async function submitContact() {
  if (newContact.value.parnteri.length === 0) {
    alert('Molimo odaberite barem jednog partnera.')
    return
  }

  isSubmitting.value = true
  errorMessage.value = ''
  const payload = {
    ime: newContact.value.ime,
    prezime: newContact.value.prezime,
    email: newContact.value.email,
    telefon: newContact.value.telefon,
    mobitel: newContact.value.mobitel,
    pozicija: newContact.value.pozicija,
    jeAktivan: newContact.value.jeAktivan,
    napomena: newContact.value.napomena,
    CreatedById: userId,
    VATBrojeviPartnera: newContact.value.parnteri.map((p) => p.vatBroj),
  }

  try {
    if (isEditing.value) {
      await api.put(`/api/contact/${newContact.value.id}`, payload)
    } else {
      await api.post('/api/contact', payload)
    }
    await loadContacts()
    closeContactModal()
  } catch (error) {
    console.error('Failed to submit contact:', error)
    errorMessage.value = 'Neuspješno spremanje kontakta.'
  } finally {
    isSubmitting.value = false
  }
}

async function deleteContact(contact: Contact) {
  if (confirm(`Jeste li sigurni da želite izbrisati kontakt: ${contact.ime} ${contact.prezime}?`)) {
    try {
      await api.delete(`/api/contact/${contact.id}`)
      await loadContacts()
    } catch (error) {
      console.error('Failed to delete contact:', error)
      errorMessage.value = 'Neuspješno brisanje kontakta.'
    }
  }
}

onMounted(() => {
  loadContacts()
  loadAvailablePartners()
})
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #101828 transparent;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 12px;
  margin-bottom: 8px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #6a7282;
  border-radius: 12px;
  border: 2px solid transparent;
  background-clip: padding-box;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #101828;
  transition: all 0.3s ease-in-out;
}
</style>
