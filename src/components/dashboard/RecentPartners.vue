<template>
  <div class="space-y-8">
    <div v-for="partner in partners" :key="partner.id" class="flex items-center">
      <Avatar class="h-9 w-9">
        <AvatarImage :src="partner.image" alt="Avatar" />
        <AvatarFallback>{{ partner.name.charAt(0) }}</AvatarFallback>
      </Avatar>
      <div class="ml-4 space-y-1">
        <p class="text-sm font-medium leading-none">{{ partner.name }}</p>
        <p class="text-sm text-muted-foreground">
          {{ partner.email }}
        </p>
      </div>
      <div class="ml-auto font-medium">{{ partner.amount }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const partners = [
  {
    id: 1,
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
    image: 'https://api.dicebear.com/6.x/adventurer/svg?seed=Olivia',
  },
  {
    id: 2,
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$39.00',
    image: 'https://api.dicebear.com/6.x/adventurer/svg?seed=Jackson',
  },
  {
    id: 3,
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
    image: 'https://api.dicebear.com/6.x/adventurer/svg?seed=Isabella',
  },
  {
    id: 4,
    name: 'William Kim',
    email: 'will@email.com',
    amount: '+$99.00',
    image: 'https://api.dicebear.com/6.x/adventurer/svg?seed=William',
  },
  {
    id: 5,
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: '+$39.00',
    image: 'https://api.dicebear.com/6.x/adventurer/svg?seed=Sofia',
  },
]
</script>
