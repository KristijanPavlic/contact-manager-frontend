<template>
  <div class="space-y-6">
    <!-- Zaglavlje -->
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h2 class="text-3xl font-bold text-gray-900">Partneri</h2>
        <p class="mt-2 text-sm text-gray-700">
          Pregled svih partnera. Dodajte nove partnere ili uredite postojeće.
        </p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          type="button"
          @click="openAddPartnerModal"
          class="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto"
        >
          Dodaj partnera
        </button>
      </div>
    </div>

    <!-- Tablica partnera -->
    <Card>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Naziv partnera
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Adresa
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Poštanski broj
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Grad
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Država
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                VAT broj
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Kupac
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Dobavljač
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Napomena
              </th>
              <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span class="sr-only">Uredi</span>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="partner in partners" :key="partner.id">
              <td
                class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
              >
                {{ partner.nazivPartnera }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {{ partner.adresa }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {{ partner.postankiBroj }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {{ partner.grad }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {{ partner.drzava }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {{ partner.vatBroj }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {{ partner.kupac ? 'Da' : 'Ne' }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {{ partner.dobavaljac ? 'Da' : 'Ne' }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {{ partner.napomena }}
              </td>
              <td
                class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
              >
                <a
                  href="#"
                  @click.prevent="openEditPartnerModal(partner)"
                  class="text-green-600 hover:text-green-900"
                >
                  Uredi<span class="sr-only">, {{ partner.nazivPartnera }}</span>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>

    <!-- Modal za dodavanje/uređivanje partnera -->
    <teleport to="body">
      <div
        v-if="showPartnerModal"
        class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-900 bg-opacity-50"
        @click.self="closePartnerModal"
      >
        <div
          class="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-6 m-4 max-h-[calc(100vh-2rem)] overflow-y-auto"
        >
          <h3 class="text-xl font-semibold mb-4">
            {{ isEditing ? 'Uredi partnera' : 'Dodaj partnera' }}
          </h3>
          <form @submit.prevent="submitPartner">
            <div class="mb-4">
              <label for="nazivPartnera" class="block text-sm font-medium text-gray-700">
                Naziv partnera
              </label>
              <input
                type="text"
                id="nazivPartnera"
                placeholder="Unesite naziv partnera"
                v-model="newPartner.nazivPartnera"
                required
                class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div class="mb-4">
              <label for="adresa" class="block text-sm font-medium text-gray-700"> Adresa </label>
              <input
                type="text"
                id="adresa"
                placeholder="Unesite adresu"
                v-model="newPartner.adresa"
                required
                class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div class="mb-4">
              <label for="postankiBroj" class="block text-sm font-medium text-gray-700">
                Poštanski broj
              </label>
              <input
                type="text"
                id="postankiBroj"
                placeholder="Unesite poštanski broj"
                v-model="newPartner.postankiBroj"
                required
                class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div class="mb-4">
              <label for="grad" class="block text-sm font-medium text-gray-700"> Grad </label>
              <input
                type="text"
                id="grad"
                placeholder="Unesite grad"
                v-model="newPartner.grad"
                required
                class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div class="mb-4">
              <label for="drzava" class="block text-sm font-medium text-gray-700"> Država </label>
              <input
                type="text"
                id="drzava"
                placeholder="Unesite državu"
                v-model="newPartner.drzava"
                required
                class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div class="mb-4">
              <label for="vatBroj" class="block text-sm font-medium text-gray-700">
                VAT broj
              </label>
              <input
                type="text"
                id="vatBroj"
                placeholder="Unesite VAT broj"
                v-model="newPartner.vatBroj"
                required
                class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <!-- Radio buttons za odabir vrste partnera -->
            <div class="mb-4">
              <span class="block text-sm font-medium text-gray-700">Vrsta partnera</span>
              <div class="mt-2 flex items-center">
                <label class="inline-flex items-center mr-6">
                  <input
                    type="radio"
                    value="kupac"
                    v-model="newPartner.tipPartnera"
                    class="form-radio h-4 w-4 text-green-600"
                  />
                  <span class="ml-2">Kupac</span>
                </label>
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    value="dobavaljac"
                    v-model="newPartner.tipPartnera"
                    class="form-radio h-4 w-4 text-green-600"
                  />
                  <span class="ml-2">Dobavljač</span>
                </label>
              </div>
            </div>
            <div class="mb-4">
              <label for="napomena" class="block text-sm font-medium text-gray-700">
                Napomena
              </label>
              <textarea
                id="napomena"
                placeholder="Unesite napomenu"
                v-model="newPartner.napomena"
                class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                rows="3"
              ></textarea>
            </div>
            <div class="flex justify-end">
              <button
                type="button"
                @click="closePartnerModal"
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

interface Partner {
  id: number
  nazivPartnera: string
  adresa: string
  postankiBroj: string
  grad: string
  drzava: string
  vatBroj: string
  kupac: boolean
  dobavaljac: boolean
  napomena: string
}

// Statički popis partnera (kasnije možete zamijeniti s API pozivom)
const partners = ref<Partner[]>([
  {
    id: 1,
    nazivPartnera: 'Ljekarne Vaše zdravlje',
    adresa: 'Ilica 1',
    postankiBroj: '10000',
    grad: 'Zagreb',
    drzava: 'Hrvatska',
    vatBroj: '123456789123',
    kupac: true,
    dobavaljac: false,
    napomena: 'Napomena o partneru',
  },
  {
    id: 2,
    nazivPartnera: 'Oktal Pharma',
    adresa: 'Strma ulica 45',
    postankiBroj: '10000',
    grad: 'Zagreb',
    drzava: 'Hrvatska',
    vatBroj: '321987654321',
    kupac: false,
    dobavaljac: true,
    napomena: 'Napomena o partneru',
  },
  {
    id: 3,
    nazivPartnera: 'Pharma Plus',
    adresa: 'Ulica 2',
    postankiBroj: '10000',
    grad: 'Zagreb',
    drzava: 'Hrvatska',
    vatBroj: '456789123456',
    kupac: true,
    dobavaljac: false,
    napomena: 'Napomena o partneru',
  },
  {
    id: 4,
    nazivPartnera: 'Medika',
    adresa: 'Ulica 3',
    postankiBroj: '10000',
    grad: 'Zagreb',
    drzava: 'Hrvatska',
    vatBroj: '789123456789',
    kupac: false,
    dobavaljac: true,
    napomena: 'Napomena o partneru',
  },
  {
    id: 5,
    nazivPartnera: 'Ljekarne Prima',
    adresa: 'Ulica 4',
    postankiBroj: '10000',
    grad: 'Zagreb',
    drzava: 'Hrvatska',
    vatBroj: '987654321987',
    kupac: true,
    dobavaljac: false,
    napomena: 'Napomena o partneru',
  },
  {
    id: 6,
    nazivPartnera: 'Pharma Store',
    adresa: 'Ulica 5',
    postankiBroj: '10000',
    grad: 'Zagreb',
    drzava: 'Hrvatska',
    vatBroj: '654321987654',
    kupac: false,
    dobavaljac: true,
    napomena: 'Napomena o partneru',
  },
  {
    id: 7,
    nazivPartnera: 'Ljekarne Zdravlje',
    adresa: 'Ulica 6',
    postankiBroj: '10000',
    grad: 'Zagreb',
    drzava: 'Hrvatska',
    vatBroj: '321654987321',
    kupac: true,
    dobavaljac: false,
    napomena: 'Napomena o partneru',
  },
  {
    id: 8,
    nazivPartnera: 'Pharma Med',
    adresa: 'Ulica 7',
    postankiBroj: '10000',
    grad: 'Zagreb',
    drzava: 'Hrvatska',
    vatBroj: '654987321654',
    kupac: false,
    dobavaljac: true,
    napomena: 'Napomena o partneru',
  },
  {
    id: 9,
    nazivPartnera: 'Tech Solutions',
    adresa: 'Ulica 8',
    postankiBroj: '10000',
    grad: 'Zagreb',
    drzava: 'Hrvatska',
    vatBroj: '987321654987',
    kupac: true,
    dobavaljac: false,
    napomena: 'Napomena o partneru',
  },
  {
    id: 10,
    nazivPartnera: 'IT Hub',
    adresa: 'Ulica 9',
    postankiBroj: '10000',
    grad: 'Zagreb',
    drzava: 'Hrvatska',
    vatBroj: '321987654321',
    kupac: false,
    dobavaljac: true,
    napomena: 'Napomena o partneru',
  },
])

const showPartnerModal = ref(false)
const isEditing = ref(false)

const newPartner = ref({
  id: 0,
  nazivPartnera: '',
  adresa: '',
  postankiBroj: '',
  grad: '',
  drzava: '',
  vatBroj: '',
  tipPartnera: '',
  napomena: '',
})

function openAddPartnerModal() {
  resetNewPartner()
  isEditing.value = false
  showPartnerModal.value = true
}

function openEditPartnerModal(partner: Partner) {
  newPartner.value = {
    ...partner,
    tipPartnera: partner.kupac ? 'kupac' : 'dobavaljac',
  }
  isEditing.value = true
  showPartnerModal.value = true
}

function closePartnerModal() {
  showPartnerModal.value = false
}

function resetNewPartner() {
  newPartner.value = {
    id: 0,
    nazivPartnera: '',
    adresa: '',
    postankiBroj: '',
    grad: '',
    drzava: '',
    vatBroj: '',
    tipPartnera: '',
    napomena: '',
  }
}

async function submitPartner() {
  if (!newPartner.value.tipPartnera) {
    alert('Molimo odaberite vrstu partnera: Kupac ili Dobavljač.')
    return
  }

  if (isEditing.value) {
    const index = partners.value.findIndex((p) => p.id === newPartner.value.id)
    if (index !== -1) {
      partners.value[index] = {
        ...newPartner.value,
        kupac: newPartner.value.tipPartnera === 'kupac',
        dobavaljac: newPartner.value.tipPartnera === 'dobavaljac',
      }
    }
  } else {
    const newId = partners.value.length ? Math.max(...partners.value.map((p) => p.id)) + 1 : 1
    const partnerToAdd = {
      id: newId,
      nazivPartnera: newPartner.value.nazivPartnera,
      adresa: newPartner.value.adresa,
      postankiBroj: newPartner.value.postankiBroj,
      grad: newPartner.value.grad,
      drzava: newPartner.value.drzava,
      vatBroj: newPartner.value.vatBroj,
      kupac: newPartner.value.tipPartnera === 'kupac',
      dobavaljac: newPartner.value.tipPartnera === 'dobavaljac',
      napomena: newPartner.value.napomena,
    }
    partners.value.push(partnerToAdd)
  }
  closePartnerModal()
}
</script>
