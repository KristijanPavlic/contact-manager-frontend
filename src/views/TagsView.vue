<template>
  <div class="space-y-6">
    <h2 class="text-3xl font-bold text-gray-900 mb-4">Upravljanje tagovima</h2>
    <RouterLink to="/postavke" class="btn btn-secondary">Vrati se na odabir postavki</RouterLink>
    <div>
      <Card>
        <h2 class="text-lg font-medium text-gray-900 mb-4">Tagovi</h2>
        <transition-group name="fade" tag="div" class="flex flex-wrap gap-4 overflow-x-auto">
          <span
            v-for="(tag, index) in tags"
            :key="tag"
            class="group flex items-center px-3 py-1 rounded-full md:text-md text-sm font-medium bg-green-100 text-green-800"
          >
            <!-- Ako je ovaj tag u načinu uređivanja -->
            <template v-if="editingIndex === index">
              <input
                type="text"
                v-model.trim="editedTag"
                maxlength="50"
                class="px-2 py-1 border border-gray-300 rounded"
              />
              <button
                type="button"
                @click="saveEdit(index)"
                class="ml-2 text-lg transition-opacity duration-200 text-blue-500 hover:text-blue-700 focus:outline-none"
                title="Spremi promjene"
              >
                &#10003;
              </button>
              <button
                type="button"
                @click="cancelEdit"
                class="ml-2 text-lg transition-opacity duration-200 text-gray-500 hover:text-gray-700 focus:outline-none"
                title="Otkaži"
              >
                &#10005;
              </button>
            </template>
            <!-- Normalan prikaz taga -->
            <template v-else>
              {{ tag }}
              <button
                type="button"
                @click="startEdit(index)"
                class="ml-2 text-lg transition-opacity duration-200 text-blue-500 hover:text-blue-700 focus:outline-none"
                title="Uredi tag"
              >
                &#9998;
              </button>
              <button
                type="button"
                @click="deleteTag(tag)"
                class="ml-2 text-lg transition-opacity duration-200 text-red-500 hover:text-red-700 focus:outline-none"
                title="Izbriši tag"
              >
                &times;
              </button>
            </template>
          </span>
        </transition-group>
        <form @submit.prevent="addTag" class="mt-4">
          <div class="flex rounded-md shadow-sm">
            <input
              type="text"
              maxlength="50"
              v-model.trim="newTag"
              class="pl-2 flex-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-l-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
              placeholder="Novi tag"
            />
            <button
              type="submit"
              :disabled="!canAdd"
              class="-ml-px inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Dodaj tag
            </button>
          </div>
        </form>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Card from '@/components/CardComponent.vue'

// Lista tagova
const tags = ref<string[]>([
  'umjeravanje',
  'ovjeravanje',
  'smarthome',
  'solari',
  'lps',
  'bps',
  'farmaceutska industrija',
  'veledrogerije',
  'ljekarne',
  'prehrambena',
  'industrijsko vaganje',
  'detekcija stranih tijela',
])

const newTag = ref('')

// Omogućuje "Dodaj tag" gumb ako input nije prazan.
const canAdd = computed(() => newTag.value.trim().length > 0)

// Stanja za uređivanje taga
const editingIndex = ref<number | null>(null)
const editedTag = ref('')

// Dodavanje novog taga.
const addTag = async (): Promise<void> => {
  const trimmedTag = newTag.value.trim()
  if (!trimmedTag) return

  try {
    // Primjer POST zahtjeva za backend (prilagodite URL po potrebi)
    await fetch('/api/tags', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tag: trimmedTag }),
    })

    // Na uspjeh, ažuriramo lokalno stanje.
    tags.value.push(trimmedTag)
    newTag.value = ''
  } catch (error) {
    console.error('Neuspješno dodavanje taga:', error)
    // Po želji, dodajte feedback korisniku.
  }
}

// Brisanje taga.
const deleteTag = async (tagToDelete: string): Promise<void> => {
  try {
    // Primjer DELETE zahtjeva (prilagodite URL po potrebi)
    await fetch(`/api/tags/${encodeURIComponent(tagToDelete)}`, {
      method: 'DELETE',
    })

    // Ažuriranje lokalnog stanja.
    tags.value = tags.value.filter((tag) => tag !== tagToDelete)
  } catch (error) {
    console.error('Greška pri brisanju taga:', error)
    // Po želji, dodajte feedback korisniku.
  }
}

// Inicira uređivanje određenog taga.
const startEdit = (index: number): void => {
  editingIndex.value = index
  editedTag.value = tags.value[index]
}

// Spremanje izmjena u tagu.
const saveEdit = async (index: number): Promise<void> => {
  const oldTag = tags.value[index]
  const newTagValue = editedTag.value.trim()
  if (!newTagValue || newTagValue === oldTag) {
    editingIndex.value = null
    return
  }
  try {
    // Primjer PUT zahtjeva za ažuriranje taga (prilagodite URL po potrebi)
    await fetch(`/api/tags/${encodeURIComponent(oldTag)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tag: newTagValue }),
    })

    // Ažuriramo lokalno stanje.
    tags.value[index] = newTagValue
    editingIndex.value = null
  } catch (error) {
    console.error('Neuspješno ažuriranje taga:', error)
    // Po želji, dodajte feedback korisniku.
  }
}

// Prekid uređivanja.
const cancelEdit = (): void => {
  editingIndex.value = null
  editedTag.value = ''
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
