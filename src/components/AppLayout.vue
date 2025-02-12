<template>
  <div class="min-h-screen bg-green-50">
    <nav class="bg-white shadow-sm" v-if="authStore.isAuthenticated">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <router-link to="/" class="flex-shrink-0 flex items-center">
              <img class="h-8 w-auto" src="#" alt="Logo" />
              <span class="ml-2 text-xl font-semibold text-green-700">Contact Manager</span>
            </router-link>
            <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              <NavLink to="/" :exact="true">Dashboard</NavLink>
              <NavLink to="/partners">Partners</NavLink>
              <NavLink to="/contacts">Contacts</NavLink>
              <NavLink to="/settings">Settings</NavLink>
            </div>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:items-center">
            <button
              @click="logout"
              class="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="py-10">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import NavLink from '../components/NavLink.vue'

const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
