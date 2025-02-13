<template>
  <div>
    <h2 class="text-3xl font-bold mb-4">Postavke</h2>
    <div class="flex flex-col gap-2">
      <router-link to="/postavke/djelatnici" class="btn btn-secondary mr-2"
        >Upravljanje djelatnicima</router-link
      >
      <router-link to="/postavke/tagovi" class="btn btn-secondary"
        >Upravljanje tagovima</router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>
