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
    <ul class="list-group">
        <li v-for="category in categories" class="list-group-item">
            <CategoryItem
            :name="category.name"
            @remove="$emit('category-remove', category._id)"
            @save="(name) => { $emit('category-edit', category._id, name); }"
        />
        </li>
        <li class="list-group-item">
            <CategoryInput
            ref="newCategoryInput"
            @save="addCategory"
        />
        </li>
    </ul>
  </div>
</template>
