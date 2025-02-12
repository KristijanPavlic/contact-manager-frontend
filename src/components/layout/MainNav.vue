<template>
  <div class="mr-4 hidden md:flex">
    <router-link to="/" class="mr-6 flex items-center space-x-2">
      <Icons.logo class="h-6 w-6" />
      <span class="hidden font-bold sm:inline-block"> Contact Manager </span>
    </router-link>
    <nav class="flex items-center space-x-6 text-sm font-medium">
      <router-link
        v-for="item in items"
        :key="item.href"
        :to="item.href"
        class="transition-colors hover:text-foreground/80 text-foreground/60"
      >
        {{ item.title }}
      </router-link>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { Icons } from '@/components/icons'

const items = [
  {
    title: 'Dashboard',
    href: '/',
  },
  {
    title: 'Partners',
    href: '/partners',
  },
  {
    title: 'Contacts',
    href: '/contacts',
  },
  {
    title: 'Settings',
    href: '/settings',
  },
]
</script>
