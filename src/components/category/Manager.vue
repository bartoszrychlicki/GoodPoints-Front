<script>
import Item from './Item.vue';
import Input from './Input.vue';

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
    components: {Input, Item}
}
</script>

<template>
  <div class="categories card mx-auto mt-4 p-4">
    <h1 class="green">Categories</h1>
    <ul class="list-group">
        <li v-for="category in categories" class="list-group-item">
            <Item
            :name="category.name"
            @remove="$emit('category-remove', category._id)"
            @save="(name) => { $emit('category-edit', category._id, name); }"
        />
        </li>
        <li class="list-group-item">
            <Input
            ref="newCategoryInput"
            @save="addCategory"
        />
        </li>
    </ul>
  </div>
</template>

<style scoped>
.categories {
    width: 500px;
}
</style>
