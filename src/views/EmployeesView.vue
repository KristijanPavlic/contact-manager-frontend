<template>
  <div class="space-y-6">
    <!-- Loading and Error Messages -->
    <div v-if="isLoading" class="text-center py-4 text-gray-600">Učitavam djelatnike...</div>
    <div v-if="errorMessage" class="text-center py-4 text-red-600">
      {{ errorMessage }}
    </div>

    <!-- Employees Table (displayed only when not loading and data exists) -->
    <Card v-if="!isLoading && employees.length > 0">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                Ime
              </th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Prezime</th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">E-mail</th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Telefon</th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Mobitel</th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Pozicija</th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Aktivan</th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Napomena</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="employee in employees" :key="employee.id">
              <td
                class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
              >
                {{ employee.ime }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                {{ employee.prezime }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {{ employee.email }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {{ employee.telefon }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {{ employee.mobitel }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {{ employee.pozicija }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {{ employee.jeAktivan ? 'Da' : 'Ne' }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {{ employee.napomena }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
    <Card v-if="!isLoading && employees.length === 0" class="text-center p-4">
      Nema djelatnika.
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/api/axiosInstance'
import Card from '@/components/CardComponent.vue'

interface Employee {
  id: number
  ime: string
  prezime: string
  email: string
  telefon: string
  mobitel: string
  pozicija: string
  jeAktivan: boolean
  napomena: string
}

const employees = ref<Employee[]>([])
const isLoading = ref(false)
const errorMessage = ref('')

// Function to load employees from the backend
async function loadEmployees() {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const response = await api.get('/api/employee')
    employees.value = response.data
  } catch (error: unknown) {
    console.error('Failed to load employees:', error)
    errorMessage.value = 'Neuspješno učitavanje djelatnika. Molimo pokušajte ponovo.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadEmployees()
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
