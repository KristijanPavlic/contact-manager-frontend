<template>
  <div class="min-h-screen bg-background font-sans antialiased">
    <div class="relative flex min-h-screen flex-col">
      <header
        class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div class="container flex h-14 items-center">
          <MainNav />
          <div class="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div class="w-full flex-1 md:w-auto md:flex-none">
              <CommandMenu />
            </div>
            <nav class="flex items-center space-x-1">
              <ThemeToggle />
              <UserNav />
            </nav>
          </div>
        </div>
      </header>
      <div class="flex-1">
        <div class="border-b">
          <div
            class="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10"
          >
            <aside
              class="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block"
            >
              <ScrollArea class="h-full py-6 pr-6 lg:py-8">
                <SidebarNav />
              </ScrollArea>
            </aside>
            <main class="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
              <div class="mx-auto w-full min-w-0">
                <slot></slot>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MainNav from './MainNav.vue'
import CommandMenu from './CommandMenu.vue'
import ThemeToggle from './ThemeToggle.vue'
import UserNav from './UserNav.vue'
import SidebarNav from './SidebarNav.vue'
import { ScrollArea } from '@/components/ui/scroll-area'
</script>
