<template>
  <div class="dashboard">
    <h1 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Dashboard</h1>

    <!-- Stats -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      <div
        v-for="item in stats"
        :key="item.name"
        class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
      >
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <component :is="item" class="h-6 w-6 text-gray-400" aria-hidden="true" />
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  {{ item.name }}
                </dt>
                <dd>
                  <div class="text-lg font-medium text-gray-900 dark:text-white">
                    {{ item.stat }}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-700 px-5 py-3">
          <div class="text-sm">
            <a
              :href="item.href"
              class="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
              >View all</a
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Partners Growth</h2>
        <PartnersChart />
      </div>
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Contacts Distribution
        </h2>
        <ContactsChart />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const stats = ref([
  { name: 'Total Contacts', stat: '0', href: '/contacts' },
  { name: 'Total Partners', stat: '0', href: '/partners' },
])

onMounted(async () => {
  // Fetch dashboard data from API
  // This is a placeholder. Replace with actual API call.
  stats.value = [
    { name: 'Total Contacts', stat: '1,234', href: '/contacts' },
    { name: 'Total Partners', stat: '120', href: '/partners' },
  ]
})
</script>
