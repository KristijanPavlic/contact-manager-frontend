<template>
  <div ref="container" class="relative inline-block text-left">
    <button
      @click="toggleDropdown"
      type="button"
      class="inline-flex items-center justify-between w-48 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
    >
      <span class="truncate">
        {{ displayText }}
      </span>
      <svg
        class="-mr-1 ml-2 h-5 w-5 flex-shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
    <div
      v-if="open"
      class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
    >
      <div class="py-1">
        <template v-for="partner in availablePartners" :key="partner">
          <label class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <input
              type="checkbox"
              class="mr-2"
              :checked="modelValue.includes(partner)"
              @change="() => selectPartner(partner)"
            />
            <span>{{ partner }}</span>
          </label>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

interface Props {
  modelValue: string[]
  availablePartners: string[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
}>()

const open = ref(false)
const container = ref<HTMLElement | null>(null)

function toggleDropdown() {
  open.value = !open.value
}

function selectPartner(partner: string) {
  const newValue = [...props.modelValue]
  const index = newValue.indexOf(partner)
  if (index === -1) {
    newValue.push(partner)
  } else {
    newValue.splice(index, 1)
  }
  emit('update:modelValue', newValue)
}

const displayText = computed(() => {
  const count = props.modelValue.length
  if (count === 0) return 'Odaberite partnera'
  return count === 1 ? '1 partner' : `${count} partnera`
})

function handleClickOutside(event: MouseEvent) {
  if (container.value && !container.value.contains(event.target as Node)) {
    open.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
