<template>
  <div class="space-y-6">
    <h2 class="text-3xl font-bold text-gray-900 mb-4">Upravljanje tagovima</h2>
    <RouterLink to="/postavke" class="btn btn-secondary">Vrati se na odabir postavki</RouterLink>
    <div>
      <Card>
        <h2 class="text-lg font-medium text-gray-900 mb-4">Tagovi</h2>
        <div v-if="isLoading" class="text-center py-4">
          <span class="text-gray-600">Učitavanje tagova...</span>
        </div>
        <div v-else-if="error" class="text-center py-4">
          <span class="text-red-600">{{ error }}</span>
        </div>
        <transition-group v-else name="fade" tag="div" class="flex flex-wrap gap-4 overflow-x-auto">
          <div
            v-for="tag in tags"
            :key="`tag-${tag.id}`"
            class="group flex items-center px-3 py-1 rounded-full md:text-md text-sm font-medium bg-green-100 text-green-800"
          >
            <template v-if="editingTagId === tag.id">
              <input
                type="text"
                v-model="editedTagName"
                maxlength="50"
                class="px-2 py-1 border border-gray-300 rounded"
                @keyup.enter="saveEdit(tag)"
                ref="editInput"
                @focus="$event.target.select()"
              />
              <button
                type="button"
                @click="saveEdit(tag)"
                class="ml-2 text-lg transition-opacity duration-200 text-blue-500 hover:text-blue-700 focus:outline-none"
                title="Spremi promjene"
                :disabled="isEditing"
              >
                <span v-if="isEditing">...</span>
                <span v-else>&#10003;</span>
              </button>
              <button
                type="button"
                @click="cancelEdit"
                class="ml-2 text-lg transition-opacity duration-200 text-gray-500 hover:text-gray-700 focus:outline-none"
                title="Otkaži"
                :disabled="isEditing"
              >
                &#10005;
              </button>
            </template>
            <template v-else>
              <span>{{ tag.naziv }}</span>
              <button
                type="button"
                @click="startEdit(tag)"
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
                :disabled="isDeleting === tag.id"
              >
                <span v-if="isDeleting === tag.id">...</span>
                <span v-else>&times;</span>
              </button>
            </template>
          </div>
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
              :disabled="!canAdd || isAdding"
              class="-ml-px inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="isAdding">Dodavanje...</span>
              <span v-else>Dodaj tag</span>
            </button>
          </div>
        </form>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, nextTick } from 'vue'
import api from '../api/axiosInstance.ts'
import Card from '@/components/CardComponent.vue'
import { RouterLink } from 'vue-router'

interface Tag {
  id: number
  naziv: string
}

const tags = ref<Tag[]>([])
const newTag = ref('')
const canAdd = computed(() => newTag.value.trim().length > 0)
const editingTagId = ref<number | null>(null)
const editedTagName = ref('')
const editInput = ref<HTMLInputElement | null>(null)

const isLoading = ref(true)
const error = ref('')
const isAdding = ref(false)
const isDeleting = ref<number | null>(null)
const isEditing = ref(false)

async function loadTags(): Promise<void> {
  isLoading.value = true
  error.value = ''
  try {
    const response = await api.get('/api/tag')
    tags.value = response.data
  } catch (err) {
    error.value = 'Greška pri učitavanju tagova. Molimo pokušajte ponovno.'
    console.error('Failed to load tags:', err)
  } finally {
    isLoading.value = false
  }
}

const addTag = async (): Promise<void> => {
  const trimmedTag = newTag.value.trim()
  if (!trimmedTag) return

  isAdding.value = true
  try {
    const response = await api.post('/api/tag', { naziv: trimmedTag })
    tags.value = [...tags.value, response.data]
    newTag.value = ''
  } catch (err) {
    error.value = 'Greška pri dodavanju taga. Molimo pokušajte ponovno.'
    console.error('Neuspješno dodavanje taga:', err)
  } finally {
    isAdding.value = false
  }
}

const deleteTag = async (tagToDelete: Tag): Promise<void> => {
  isDeleting.value = tagToDelete.id
  try {
    await api.delete(`/api/tag/${tagToDelete.id}`)
    tags.value = tags.value.filter((tag) => tag.id !== tagToDelete.id)
  } catch (err) {
    error.value = 'Greška pri brisanju taga. Molimo pokušajte ponovno.'
    console.error('Greška pri brisanju taga:', err)
  } finally {
    isDeleting.value = null
  }
}

const startEdit = async (tag: Tag): Promise<void> => {
  editingTagId.value = tag.id
  editedTagName.value = tag.naziv
  await nextTick()
  if (editInput.value) {
    editInput.value.focus()
  }
}

const saveEdit = async (tag: Tag): Promise<void> => {
  const newTagValue = editedTagName.value.trim()
  if (!newTagValue || newTagValue === tag.naziv) {
    editingTagId.value = null
    return
  }

  isEditing.value = true
  try {
    const response = await api.put(`/api/tag/${tag.id}`, {
      id: tag.id,
      naziv: newTagValue,
    })

    // Find the index of the tag we're updating
    const tagIndex = tags.value.findIndex((t) => t.id === tag.id)
    if (tagIndex !== -1) {
      // Create a new array with the updated tag
      const updatedTags = [...tags.value]
      updatedTags[tagIndex] = { ...response.data }
      // tags.value = updatedTags
      tags.value[tagIndex] = { ...tags.value[tagIndex], naziv: newTagValue }
    }

    editingTagId.value = null
    editedTagName.value = ''
  } catch (err) {
    error.value = 'Greška pri ažuriranju taga. Molimo pokušajte ponovno.'
    console.error('Neuspješno ažuriranje taga:', err)
  } finally {
    isEditing.value = false
  }
}

const cancelEdit = (): void => {
  editingTagId.value = null
  editedTagName.value = ''
}

onMounted(() => {
  loadTags()
})
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
