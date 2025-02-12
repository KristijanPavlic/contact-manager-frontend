<template>
  <AppLayout v-if="authStore.isAuthenticated">
    <router-view></router-view>
  </AppLayout>
  <router-view v-else></router-view>
</template>

<script setup lang="ts">
import { useAuthStore } from './stores/auth'
import AppLayout from '@/components/AppLayout.vue'

const authStore = useAuthStore()
</script>
