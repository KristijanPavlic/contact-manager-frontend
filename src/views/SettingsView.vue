<template>
  <div>
    <h2 class="text-3xl font-bold mb-4">Settings</h2>
    <div class="flex flex-col gap-2">
      <router-link to="/settings/employees" class="btn btn-secondary mr-2"
        >Manage Employees</router-link
      >
      <router-link to="/settings/tags" class="btn btn-secondary">Manage Tags</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>
