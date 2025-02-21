<template>
  <LoadingErrorWrapper
    :loading="isLoading"
    :errorMessage="errorMessage"
    loadingText="Učitavam dashboard..."
  >
    <!-- Dashboard main content -->
    <div class="space-y-6">
      <h2 class="text-3xl font-bold text-gray-900">Dashboard</h2>
      <!-- Dashboard Stats Cards -->
      <div class="grid gap-6 grid-cols-2 lg:grid-cols-4">
        <Card v-for="stat in stats" :key="stat.ime">
          <dt class="text-sm font-medium text-gray-500 truncate">
            <template v-if="stat.ime.includes('Svi')">
              <router-link :to="stat.ime.slice(4).toLocaleLowerCase()">
                {{ stat.ime }}
              </router-link>
            </template>
            <template v-else>
              {{ stat.ime }}
            </template>
          </dt>
          <dd class="mt-1 text-3xl font-semibold text-gray-900">{{ stat.value }}</dd>
        </Card>
      </div>
      <!-- Logged-in Employee's Recent Contacts and Partners -->
      <div v-if="!isLoading" class="grid grid-cols-1 gap-6 lg:grid-cols-2">
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
      <div v-if="!isLoading" class="grid grid-cols-1 gap-6 lg:grid-cols-2">
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
  </LoadingErrorWrapper>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/api/axiosInstance'
import Card from '@/components/CardComponent.vue'
import LoadingErrorWrapper from '@/components/LoadingErrorWrapper.vue'

interface IStat {
  ime: string
  value: string
}

interface IContact {
  id: number
  ime: string
  prezime: string
  email: string
  // Add additional fields as needed
}

interface IPartner {
  id: number
  nazivPartnera: string
  adresa: string
  grad: string
  drzava: string
}

// Reactive state variables
const stats = ref<IStat[]>([])
const myRecentContacts = ref<IContact[]>([])
const myRecentPartners = ref<IPartner[]>([])
const recentContacts = ref<IContact[]>([])
const recentPartners = ref<IPartner[]>([])

const isLoading = ref(false)
const errorMessage = ref('')

// Function to load dashboard data from the backend
async function loadDashboardData() {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const response = await api.get('/api/dashboard')
    const data = response.data

    myRecentContacts.value = data.myKontakti || []
    myRecentPartners.value = data.myPartneri || []
    recentContacts.value = data.allKontakti || []
    recentPartners.value = data.allPartneri || []

    stats.value = [
      { ime: 'Svi kontakti', value: data.totalKontakti || '0' },
      { ime: 'Svi Partneri', value: data.totalPartneri || '0' },
      { ime: 'Aktivni kontakti', value: data.aktivniKontakti || '0' },
      { ime: 'Aktivni Partneri', value: data.aktivniPartneri || '0' },
    ]
  } catch (error: unknown) {
    console.error('Failed to load dashboard data:', error)
    errorMessage.value = 'Neuspješno učitavanje podataka. Molimo pokušajte ponovo.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadDashboardData()
})
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
