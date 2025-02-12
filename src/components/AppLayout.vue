<template>
  <div class="min-h-screen bg-green-50">
    <nav class="bg-white shadow-sm sticky top-0 z-[9999]" v-if="authStore.isAuthenticated">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <router-link to="/" class="flex-shrink-0 flex items-center" @click="closeMobileMenu">
              <img class="h-8 w-auto" src="/logo.svg" alt="Logo" />
              <span
                class="ml-8 text-xl font-semibold hover:text-green-700 transition-all duration-300 ease-in-out"
                >Contact Manager</span
              >
            </router-link>
            <div class="hidden lg:-my-px lg:ml-6 lg:flex lg:space-x-8">
              <NavLink to="/" :exact="true">Dashboard</NavLink>
              <NavLink to="/partners">Partners</NavLink>
              <NavLink to="/contacts">Contacts</NavLink>
              <NavLink to="/settings">Settings</NavLink>
            </div>
          </div>
          <div class="hidden lg:ml-6 lg:flex lg:items-center">
            <button
              @click="logout"
              class="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 ease-in-out"
            >
              Log out
            </button>
          </div>
          <div class="flex items-center lg:hidden">
            <button
              @click="toggleMobileMenu"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu, show/hide based on menu state. -->
      <div class="lg:hidden px-4" :class="{ block: isMobileMenuOpen, hidden: !isMobileMenuOpen }">
        <div
          class="pt-2 pb-3 space-y-2 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-4 gap-y-2"
        >
          <router-link
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-all duration-300 ease-in-out"
            :class="[
              $route.path === link.to
                ? 'border-green-500 text-green-700 bg-green-50 rounded-md'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 rounded-md',
            ]"
            @click="closeMobileMenu"
          >
            {{ link.text }}
          </router-link>
        </div>
        <div class="pt-4 pb-3 border-t border-gray-200">
          <div class="space-y-1">
            <button
              @click="handleMobileLogout"
              class="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-all duration-300 ease-in-out rounded-md"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="py-10 px-4">
      <div class="max-w-7xl mx-auto px-0 sm:px-4">
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import NavLink from '../components/NavLink.vue'

const authStore = useAuthStore()
const router = useRouter()

const isMobileMenuOpen = ref(false)

const navLinks = [
  { to: '/', text: 'Dashboard' },
  { to: '/partners', text: 'Partners' },
  { to: '/contacts', text: 'Contacts' },
  { to: '/settings', text: 'Settings' },
]

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const logout = () => {
  authStore.logout()
  router.push('/login')
}

const handleMobileLogout = () => {
  closeMobileMenu()
  logout()
}
</script>
