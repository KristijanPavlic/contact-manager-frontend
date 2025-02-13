<template>
  <div class="min-h-screen bg-green-50 z-[9999]">
    <nav class="bg-white shadow-sm sticky top-0" v-if="authStore.isAuthenticated">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <router-link to="/" class="flex-shrink-0 flex items-center" @click="closeMobileMenu">
              <img class="h-8 w-auto" src="/logo.svg" alt="Logo" />
              <span
                class="ml-8 mr-6 text-xl font-semibold hover:text-green-700 transition-all duration-300 ease-in-out"
              >
                Imenik
              </span>
            </router-link>
            <!-- Desktop Navigation -->
            <div class="hidden lg:-my-px lg:ml-6 lg:flex lg:items-center lg:space-x-8">
              <NavLink to="/" :exact="true">Početna</NavLink>
              <NavLink to="/partneri">Partneri</NavLink>
              <NavLink to="/kontakti">Kontakti</NavLink>
              <!-- Settings dropdown for desktop (clickable) -->
              <div ref="desktopDropdownRef" class="relative inline-block">
                <button
                  type="button"
                  @click.stop="toggleDesktopDropdown"
                  :class="[
                    'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-semibold outline-none transition-all duration-300 ease-in-out focus:outline-none',
                    desktopDropdownOpen
                      ? 'border-green-500 text-black'
                      : 'border-transparent text-gray-600 hover:text-black hover:border-gray-400',
                  ]"
                >
                  Postavke
                  <svg class="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.88l3.71-3.65a.75.75 0 111.04 1.08l-4.25 4.19a.75.75 0 01-1.06 0L5.21 8.31a.75.75 0 01.02-1.06z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>

                <transition name="fade">
                  <div
                    v-if="desktopDropdownOpen"
                    class="absolute left-0 mt-2 w-40 rounded-md bg-white shadow-lg z-10"
                  >
                    <router-link
                      to="/postavke/djelatnici"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      @click="desktopDropdownOpen = false"
                    >
                      Djelatnici
                    </router-link>
                    <router-link
                      to="/postavke/tagovi"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      @click="desktopDropdownOpen = false"
                    >
                      Tagovi
                    </router-link>
                  </div>
                </transition>
              </div>
            </div>
          </div>
          <div class="hidden lg:ml-6 lg:flex lg:items-center">
            <button
              @click="logout"
              class="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 ease-in-out"
            >
              Odjavi se
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

      <!-- Mobile menu -->
      <div class="lg:hidden px-4" :class="{ block: isMobileMenuOpen, hidden: !isMobileMenuOpen }">
        <div class="pt-2 pb-3 space-y-2">
          <div v-for="link in navLinks" :key="link.text">
            <!-- Standard mobile nav link -->
            <div v-if="!link.children">
              <router-link
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
            <!-- Mobile dropdown for links with children (e.g., Settings) -->
            <div v-else>
              <button
                @click="toggleDropdown(link.text)"
                class="w-full text-left pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-all duration-300 ease-in-out border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 rounded-md flex justify-between items-center"
              >
                {{ link.text }}
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.88l3.71-3.65a.75.75 0 111.04 1.08l-4.25 4.19a.75.75 0 01-1.06 0L5.21 8.31a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <div v-if="openDropdown === link.text" class="ml-4 space-y-1">
                <router-link
                  v-for="child in link.children"
                  :key="child.text"
                  :to="child.to"
                  class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-all duration-300 ease-in-out"
                  :class="[
                    $route.path === child.to
                      ? 'border-green-500 text-green-700 bg-green-50 rounded-md'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 rounded-md',
                  ]"
                  @click="closeMobileMenu"
                >
                  {{ child.text }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="pt-4 pb-3 border-t border-gray-200">
          <div class="space-y-1">
            <button
              @click="handleMobileLogout"
              class="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-all duration-300 ease-in-out rounded-md"
            >
              Odjavi se
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
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import NavLink from '../components/NavLink.vue'

const authStore = useAuthStore()
const router = useRouter()

const isMobileMenuOpen = ref(false)
const openDropdown = ref<string | null>(null)
const desktopDropdownOpen = ref(false)
const desktopDropdownRef = ref<HTMLElement | null>(null)

const navLinks = [
  { to: '/', text: 'Početna' },
  { to: '/partneri', text: 'Partneri' },
  { to: '/kontakti', text: 'Kontakti' },
  {
    text: 'Postavke',
    to: '/postavke', // fallback route if needed
    children: [
      { to: '/postavke/djelatnici', text: 'Djelatnici' },
      { to: '/postavke/tagovi', text: 'Tagovi' },
    ],
  },
]

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  openDropdown.value = null
}

const toggleDropdown = (name: string) => {
  openDropdown.value = openDropdown.value === name ? null : name
}

const toggleDesktopDropdown = () => {
  desktopDropdownOpen.value = !desktopDropdownOpen.value
}

const closeDesktopDropdown = (event: Event) => {
  if (
    desktopDropdownOpen.value &&
    desktopDropdownRef.value &&
    !desktopDropdownRef.value.contains(event.target as Node)
  ) {
    desktopDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDesktopDropdown)
})
onUnmounted(() => {
  document.removeEventListener('click', closeDesktopDropdown)
})

const logout = () => {
  authStore.logout()
  router.push('/login')
}

const handleMobileLogout = () => {
  closeMobileMenu()
  logout()
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
