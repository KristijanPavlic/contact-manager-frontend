<template>
  <router-link
    :to="to"
    :exact="exact"
    class="inline-flex px-1 pt-1 border-b-2 text-sm font-medium"
    :class="[
      $route.path === to
        ? 'border-green-500 text-gray-900 transition-all duration-300 ease-in-out'
        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-all duration-300 ease-in-out',
    ]"
  >
    <slot></slot>
  </router-link>
</template>

<script setup lang="ts">
defineProps<{
  to: string
  exact?: boolean
}>()
</script>
