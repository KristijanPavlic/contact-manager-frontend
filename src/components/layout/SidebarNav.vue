<template>
  <nav class="flex flex-col space-y-1">
    <router-link
      v-for="item in sidebarNavItems"
      :key="item.href"
      :to="item.href"
      :class="[
        'flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
        $route.path === item.href ? 'bg-accent' : 'transparent',
      ]"
    >
      <component :is="item.icon" class="mr-2 h-4 w-4" />
      {{ item.title }}
    </router-link>
  </nav>
</template>

<script setup lang="ts">
import { Icons } from '@/components/icons'

const sidebarNavItems = [
  {
    title: 'Dashboard',
    href: '/',
    icon: Icons.home,
  },
  {
    title: 'Partners',
    href: '/partners',
    icon: Icons.users,
  },
  {
    title: 'Contacts',
    href: '/contacts',
    icon: Icons.user,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Icons.settings,
  },
]
</script>
