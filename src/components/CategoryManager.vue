<script setup>
import IconTrash from '@/components/icons/IconTrash.vue'
import IconAdd from '@/components/icons/IconAdd.vue'
defineProps({
  categories: {
    type: Array,
    required: false,
    default: [
        { name: "One" },
        { name: "Two" }
    ]
  }
})
</script>

<template>
  <div class="categories">
    <h1 class="green">Categories</h1>
    <div v-for="category in categories" :key="category.name">
        <span>{{ category.name }}</span><IconTrash />
    </div>
    <div id="new-category-container">
        <input type="text" id="new-category-input"/><IconAdd />
    </div>    
  </div>
</template>

<style scoped>
</style>
