<script>
import CategoryItem from './CategoryItem.vue';
import CategoryInput from './CategoryInput.vue';

export default {
    props: {
        categories: {
            type: Array,
            default: []
        }
    },
    methods: {
        addCategory(name) {
            this.$emit('category-add', name);
            this.$refs.newCategoryInput.clear();
        }
    },
    emits: ['category-remove', 'category-add', 'category-edit'],
    components: {CategoryInput, CategoryItem}
}
</script>

<template>
  <div class="categories">
    <h1 class="green">Categories</h1>
    <div v-for="category in categories" :key="category.name">
        <CategoryItem
            :name="category.name"
            @remove="$emit('category-remove', category.id)"
            @save="(name) => { $emit('category-edit', category.id, name); }"
        />
    </div>
    <div id="new-category-container">
        <CategoryInput
            ref="newCategoryInput"
            @save="addCategory"
        />
    </div>    
  </div>
</template>
