<template>
  <LoadingErrorWrapper
    :loading="isLoading"
    :errorMessage="errorMessage"
    loadingText="Učitavam djelatnike..."
  >
    <div class="container mx-auto px-4 py-6">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">Upravljanje djelatnicima</h2>
      <RouterLink to="/postavke" class="btn btn-secondary">Vrati se na odabir postavki</RouterLink>
      <!-- Employee Cards Grid -->
      <div v-if="!isLoading && employees.length > 0" :class="gridClasses">
        <div
          v-for="employee in employees"
          :key="employee.id"
          class="bg-white rounded-lg shadow-md overflow-hidden mt-6 transition duration-300 ease-in-out hover:shadow-lg"
        >
          <div class="p-6 flex flex-col space-y-4">
            <!-- Top Section: Picture and Basic Info -->
            <div class="flex items-center space-x-4">
              <img
                :src="`https://ui-avatars.com/api/?name=${employee.ime}+${employee.prezime}&background=random`"
                :alt="`${employee.ime} ${employee.prezime}`"
                class="h-20 w-20 rounded-full object-cover"
              />
              <div class="flex-1 text-right">
                <h2 class="text-xl font-semibold text-gray-800">
                  {{ employee.ime }} {{ employee.prezime }}
                </h2>
                <p class="font-regular text-gray-600">{{ employee.pozicija }}</p>
              </div>
            </div>

            <!-- Divider -->
            <div class="border-t border-gray-200"></div>

            <!-- Details Section -->
            <div class="flex md:flex-row flex-col justify-between gap-4 w-5/6">
              <div class="flex-1 space-y-4">
                <div class="flex items-center text-gray-700">
                  <div>
                    <h4 class="text-sm font-medium text-gray-900">Email:</h4>
                    <p class="text-sm text-gray-600 mt-1">{{ employee.email }}</p>
                  </div>
                </div>
                <div class="flex items-center text-gray-700">
                  <div>
                    <h4 class="text-sm font-medium text-gray-900">Mobitel:</h4>
                    <p class="text-sm text-gray-600 mt-1">{{ employee.mobitel }}</p>
                  </div>
                </div>
                <div v-if="employee.napomena" class="mt-2">
                  <div class="flex items-start">
                    <div>
                      <h4 class="text-sm font-medium text-gray-900">Napomena:</h4>
                      <p class="text-sm text-gray-600 mt-1">{{ employee.napomena }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex flex-col space-y-4">
                <div class="flex items-center text-gray-700">
                  <div>
                    <h4 class="text-sm font-medium text-gray-900">Telefon:</h4>
                    <p class="text-sm text-gray-600 mt-1">{{ employee.telefon }}</p>
                  </div>
                </div>

                <div class="flex items-center text-gray-700">
                  <span
                    :class="[
                      'px-2 py-1 rounded-full text-xs font-medium',
                      employee.jeAktivan
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800',
                    ]"
                  >
                    {{ employee.jeAktivan ? 'Aktivan' : 'Neaktivan' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Employees Message -->
      <div
        v-if="!isLoading && employees.length === 0"
        class="bg-white rounded-lg shadow-md text-center p-8"
      >
        <p class="text-xl text-gray-600">Nema djelatnika.</p>
      </div>
    </div>
  </LoadingErrorWrapper>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import api from '@/api/axiosInstance'
import LoadingErrorWrapper from '@/components/LoadingErrorWrapper.vue'

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

// Responsive grid: 1 column on small, 2 on md, 3 on lg
const gridClasses = computed(() => {
  return 'grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
})

async function loadEmployees() {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const response = await api.get('/api/employee')
    employees.value = response.data
  } catch (error) {
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
/* Add any additional custom styles here if needed */
</style>
