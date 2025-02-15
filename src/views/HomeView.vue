<template>
  <div class="space-y-6">
    <h2 class="text-3xl font-bold text-gray-900">Dashboard</h2>
    <div class="grid gap-6 grid-cols-2 lg:grid-cols-4">
      <Card v-for="stat in stats" :key="stat.ime">
        <dt class="text-sm font-medium text-gray-500 truncate">
          <template v-if="stat.ime.includes('Svi')">
            <router-link :to="stat.ime.slice(4).toLocaleLowerCase()">{{ stat.ime }}</router-link>
          </template>
          <template v-else>
            {{ stat.ime }}
          </template>
        </dt>
        <dd class="mt-1 text-3xl font-semibold text-gray-900">
          {{ stat.value }}
        </dd>
      </Card>
    </div>

    <!-- Logged-in Employee's Recent Contacts and Partners -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card class="max-h-96 overflow-y-auto custom-scrollbar">
        <h2 class="text-lg font-medium text-gray-900 mb-4">
          10 zadnje dodanih kontakata prijavljenog djelatnika
        </h2>
        <ul class="divide-y divide-gray-200">
          <li v-for="contact in myRecentContacts" :key="contact.id" class="py-4">
            <div class="flex items-center space-x-4">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">
                  {{ contact.ime }} {{ contact.prezime }}
                </p>
                <p class="text-sm text-gray-500 truncate">
                  {{ contact.email }}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </Card>
      <Card class="max-h-96 overflow-y-auto custom-scrollbar">
        <h2 class="text-lg font-medium text-gray-900 mb-4">
          10 zadnje dodanih partnera prijavljenog djelatnika
        </h2>
        <ul class="divide-y divide-gray-200">
          <li v-for="partner in myRecentPartners" :key="partner.id" class="py-4">
            <div class="flex items-center space-x-4">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">
                  {{ partner.nazivPartnera }}
                </p>
                <p class="text-sm text-gray-500 truncate">
                  {{ partner.adresa }}, {{ partner.grad }}, {{ partner.drzava }}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </Card>
    </div>

    <!-- Overall Recent Contacts and Partners -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card class="max-h-96 overflow-y-auto custom-scrollbar">
        <h2 class="text-lg font-medium text-gray-900 mb-4">10 zadnje dodanih kontakata ukupno</h2>
        <ul class="divide-y divide-gray-200">
          <li v-for="contact in recentContacts" :key="contact.id" class="py-4">
            <div class="flex items-center space-x-4">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">
                  {{ contact.ime }} {{ contact.prezime }}
                </p>
                <p class="text-sm text-gray-500 truncate">
                  {{ contact.email }}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </Card>
      <Card class="max-h-96 overflow-y-auto custom-scrollbar">
        <h2 class="text-lg font-medium text-gray-900 mb-4">10 zadnje dodanih partnera ukupno</h2>
        <ul class="divide-y divide-gray-200">
          <li v-for="partner in recentPartners" :key="partner.id" class="py-4">
            <div class="flex items-center space-x-4">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">
                  {{ partner.nazivPartnera }}
                </p>
                <p class="text-sm text-gray-500 truncate">
                  {{ partner.adresa }}, {{ partner.grad }}, {{ partner.drzava }}
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
  { id: 1, ime: 'Pero', prezime: 'Perić', email: 'pero.peric@mail.com' },
  { id: 2, ime: 'Ivan', prezime: 'Horavt', email: 'ivan.horvat@mail.com' },
  { id: 3, ime: 'Ana', prezime: 'Anić', email: 'ana.anic@mail.com' },
  { id: 4, ime: 'Marko', prezime: 'Markić', email: 'marko.markic@mail.com' },
  { id: 5, ime: 'Ivana', prezime: 'Ivić', email: 'ivana.ivic@mail.com' },
  { id: 6, ime: 'Petar', prezime: 'Petrović', email: 'petar.petrovic@mail.com' },
  { id: 7, ime: 'Maja', prezime: 'Majić', email: 'maja.majic@mail.com' },
  { id: 8, ime: 'Luka', prezime: 'Lukić', email: 'luka.lukic@mail.com' },
  { id: 9, ime: 'Sara', prezime: 'Sarić', email: 'sara.saric@mail.com' },
  { id: 10, ime: 'Tomislav', prezime: 'Tomić', email: 'tomislav.tomic@mail.com' },
])

// Data for overall recent partners
const recentPartners = ref([
  {
    id: 1,
    nazivPartnera: 'Ljekarne Vaše zdravlje',
    adresa: 'Ilica 1',
    grad: 'Zagreb',
    drzava: 'Hrvatska',
  },
  {
    id: 2,
    nazivPartnera: 'Oktal Pharma',
    adresa: 'Strma ulica 45',
    grad: 'Zagreb',
    drzava: 'Hrvatska',
  },
  { id: 3, nazivPartnera: 'Pharma Plus', adresa: 'Ulica 2', grad: 'Zagreb', drzava: 'Hrvatska' },
  { id: 4, nazivPartnera: 'Medika', adresa: 'Ulica 3', grad: 'Zagreb', drzava: 'Hrvatska' },
  { id: 5, nazivPartnera: 'Ljekarne Prima', adresa: 'Ulica 4', grad: 'Zagreb', drzava: 'Hrvatska' },
  { id: 6, nazivPartnera: 'Pharma Store', adresa: 'Ulica 5', grad: 'Zagreb', drzava: 'Hrvatska' },
  {
    id: 7,
    nazivPartnera: 'Ljekarne Zdravlje',
    adresa: 'Ulica 6',
    grad: 'Zagreb',
    drzava: 'Hrvatska',
  },
  { id: 8, nazivPartnera: 'Pharma Med', adresa: 'Ulica 7', grad: 'Zagreb', drzava: 'Hrvatska' },
  { id: 9, nazivPartnera: 'Tech Solutions', adresa: 'Ulica 8', grad: 'Zagreb', drzava: 'Hrvatska' },
  { id: 10, nazivPartnera: 'IT Hub', adresa: 'Ulica 9', grad: 'Zagreb', drzava: 'Hrvatska' },
])

// Data for logged-in employee's recent contacts
const myRecentContacts = ref([
  { id: 1, ime: 'Pero', prezime: 'Perić', email: 'pero.peric@mail.com' },
  { id: 2, ime: 'Ivan', prezime: 'Horavt', email: 'ivan.horvat@mail.com' },
  { id: 3, ime: 'Ana', prezime: 'Anić', email: 'ana.anic@mail.com' },
  { id: 4, ime: 'Marko', prezime: 'Markić', email: 'marko.markic@mail.com' },
  { id: 5, ime: 'Ivana', prezime: 'Ivić', email: 'ivana.ivic@mail.com' },
  { id: 6, ime: 'Petar', prezime: 'Petrović', email: 'petar.petrovic@mail.com' },
  { id: 7, ime: 'Maja', prezime: 'Majić', email: 'maja.majic@mail.com' },
  { id: 8, ime: 'Luka', prezime: 'Lukić', email: 'luka.lukic@mail.com' },
  { id: 9, ime: 'Sara', prezime: 'Sarić', email: 'sara.saric@mail.com' },
  { id: 10, ime: 'Tomislav', prezime: 'Tomić', email: 'tomislav.tomic@mail.com' },
])

// Data for logged-in employee's recent partners
const myRecentPartners = ref([
  {
    id: 1,
    nazivPartnera: 'Ljekarne Vaše zdravlje',
    adresa: 'Ilica 1',
    grad: 'Zagreb',
    drzava: 'Hrvatska',
  },
  {
    id: 2,
    nazivPartnera: 'Oktal Pharma',
    adresa: 'Strma ulica 45',
    grad: 'Zagreb',
    drzava: 'Hrvatska',
  },
  { id: 3, nazivPartnera: 'Pharma Plus', adresa: 'Ulica 2', grad: 'Zagreb', drzava: 'Hrvatska' },
  { id: 4, nazivPartnera: 'Medika', adresa: 'Ulica 3', grad: 'Zagreb', drzava: 'Hrvatska' },
  { id: 5, nazivPartnera: 'Ljekarne Prima', adresa: 'Ulica 4', grad: 'Zagreb', drzava: 'Hrvatska' },
  { id: 6, nazivPartnera: 'Pharma Store', adresa: 'Ulica 5', grad: 'Zagreb', drzava: 'Hrvatska' },
  {
    id: 7,
    nazivPartnera: 'Ljekarne Zdravlje',
    adresa: 'Ulica 6',
    grad: 'Zagreb',
    drzava: 'Hrvatska',
  },
  { id: 8, nazivPartnera: 'Pharma Med', adresa: 'Ulica 7', grad: 'Zagreb', drzava: 'Hrvatska' },
  { id: 9, nazivPartnera: 'Tech Solutions', adresa: 'Ulica 8', grad: 'Zagreb', drzava: 'Hrvatska' },
  { id: 10, nazivPartnera: 'IT Hub', adresa: 'Ulica 9', grad: 'Zagreb', drzava: 'Hrvatska' },
])
</script>

<style scoped>
/* Firefox scrollbar styling */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #101828 transparent;
}

/* WebKit browsers (Chrome, Safari, Edge) */
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
