<script setup>
import IconTrash from '@/components/icons/IconTrash.vue'
import IconAdd from '@/components/icons/IconAdd.vue'
import { ref } from 'vue'

const newCategoryInput = ref("")

defineProps({
  categories: {
    type: Array,
    default: []
  }
})

function addCategory() {
    emit('category-add', newCategoryInput.value)
    newCategoryInput.value = ""
}

const emit = defineEmits(['category-remove', 'category-add', 'category-edit'])

</script>

<script>
</script>

<template>
  <div class="categories">
    <h1 class="green">Categories</h1>
    <div v-for="category in categories" :key="category.name">
        <span>{{ category.name }}</span><IconTrash @click="$emit('category-remove', category.id)"/>
    </div>
    <div id="new-category-container">
        <input type="text" v-model="newCategoryInput" v-on:keyup.enter="addCategory"/><IconAdd @click="addCategory"/>
    </div>    
  </div>
</template>

<style scoped>
</style>
