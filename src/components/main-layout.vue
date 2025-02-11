<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Sidebar for desktop -->
    <aside
      class="fixed inset-y-0 left-0 hidden w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 lg:block"
    >
      <div class="flex flex-col h-full">
        <!-- Logo -->
        <div class="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-700">
          <span class="text-xl font-semibold">Contact Manager</span>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 overflow-y-auto p-4">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.to"
            class="flex items-center px-4 py-2 mt-2 text-gray-600 rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            :class="{ 'bg-gray-100 dark:bg-gray-700': isCurrentRoute(item.to) }"
          >
            <component :is="item.icon" class="w-5 h-5 mr-4" />
            {{ item.name }}
          </router-link>
        </nav>

        <!-- User profile -->
        <div class="p-4 border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center">
            <div class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-700 dark:text-gray-200">
                {{ user?.firstName }} {{ user?.lastName }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ user?.email }}</p>
            </div>
          </div>
          <button
            @click="handleLogout"
            class="mt-4 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            Logout
          </button>
        </div>
      </div>
    </aside>

    <!-- Mobile header -->
    <div class="lg:hidden">
      <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between h-16 px-4">
          <button
            @click="isMobileMenuOpen = true"
            class="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <Menu class="w-6 h-6" />
          </button>
          <span class="text-xl font-semibold">Contact Manager</span>
          <div class="w-6"></div>
          <!-- Spacer for alignment -->
        </div>
      </header>

      <!-- Mobile menu -->
      <TransitionRoot as="template" :show="isMobileMenuOpen">
        <Dialog as="div" class="relative z-50 lg:hidden" @close="isMobileMenuOpen = false">
          <TransitionChild
            as="template"
            enter="transition-opacity ease-linear duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-gray-900/80" />
          </TransitionChild>

          <div class="fixed inset-0 flex">
            <TransitionChild
              as="template"
              enter="transition ease-in-out duration-300 transform"
              enter-from="-translate-x-full"
              enter-to="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leave-from="translate-x-0"
              leave-to="-translate-x-full"
            >
              <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
                <div class="flex flex-col h-full w-full bg-white dark:bg-gray-800">
                  <!-- Close button -->
                  <div
                    class="h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-700"
                  >
                    <span class="text-xl font-semibold">Contact Manager</span>
                    <button
                      @click="isMobileMenuOpen = false"
                      class="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      <X class="w-6 h-6" />
                    </button>
                  </div>

                  <!-- Mobile navigation -->
                  <nav class="flex-1 overflow-y-auto p-4">
                    <router-link
                      v-for="item in navigation"
                      :key="item.name"
                      :to="item.to"
                      class="flex items-center px-4 py-2 mt-2 text-gray-600 rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      :class="{ 'bg-gray-100 dark:bg-gray-700': isCurrentRoute(item.to) }"
                      @click="isMobileMenuOpen = false"
                    >
                      <component :is="item.icon" class="w-5 h-5 mr-4" />
                      {{ item.name }}
                    </router-link>
                  </nav>

                  <!-- Mobile user profile -->
                  <div class="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div class="flex items-center">
                      <div class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                      <div class="ml-3">
                        <p class="text-sm font-medium text-gray-700 dark:text-gray-200">
                          {{ user?.firstName }} {{ user?.lastName }}
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">{{ user?.email }}</p>
                      </div>
                    </div>
                    <button
                      @click="handleLogout"
                      class="mt-4 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </TransitionRoot>
    </div>

    <!-- Main content -->
    <main class="lg:pl-64">
      <div class="min-h-screen p-4 lg:p-8">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { Menu, X, LayoutDashboard, Users, Building2, Settings } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const isMobileMenuOpen = ref(false)

const user = computed(() => authStore.user)

const navigation = [
  { name: 'Dashboard', to: '/', icon: LayoutDashboard },
  { name: 'Partners', to: '/partners', icon: Building2 },
  { name: 'Contacts', to: '/contacts', icon: Users },
  { name: 'Settings', to: '/settings', icon: Settings },
]

const isCurrentRoute = (path: string) => {
  return route.path === path
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
