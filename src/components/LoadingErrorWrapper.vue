<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col justify-center items-center py-12">
      <p class="mt-4 text-lg text-gray-600">{{ loadingText || 'Loading...' }}</p>
      <!-- Spinner Container -->
      <div class="relative w-16 h-16 mt-4">
        <div class="absolute inset-0 spinner-outer"></div>
        <div class="absolute inset-2 spinner-inner"></div>
      </div>
    </div>

    <!-- Error Message -->
    <div v-else-if="errorMessage" class="text-center py-4 text-red-600 bg-red-100 rounded-lg mb-6">
      {{ errorMessage }}
    </div>

    <!-- Main Content -->
    <div v-else>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  loading: boolean
  errorMessage: string
  loadingText?: string
}

defineProps<Props>()
</script>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.spinner-outer {
  width: 100%;
  height: 100%;
  border: 4px solid #16a34a; /* Tailwind green-600 */
  border-top-color: transparent;
  border-radius: 9999px;
  animation: spin 1.5s linear infinite;
}

.spinner-inner {
  width: calc(100% - 1rem);
  height: calc(100% - 1rem);
  border: 4px solid #4ade80; /* Tailwind green-400 */
  border-top-color: transparent;
  border-radius: 9999px;
  animation: spin 1s linear reverse infinite;
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
}
</style>
