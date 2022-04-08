<script setup>
import CategoryManager from '../components/CategoryManager.vue'
import { ref } from 'vue'

function addCategory(name) {
    let newCat = {id: nextId++, name: name};
    categories.value.push(newCat);
}

function _getCategoryIdx(id) {
    let idx = -1;
    for (let i = 0; i < categories.value.length; i++) {
        if (categories.value[i].id === id) {
            idx = i;
            break;
        }
    }
    return idx;
}

function removeCategory(id) {
    let idx = _getCategoryIdx(id)
    if (idx !== -1) {
        categories.value.splice(idx, 1);
    }
}

function editCategory(id, name) {
    let idx = _getCategoryIdx(id);
    if (idx !== -1) {
        categories.value[idx].name = name;
    }
}

let nextId = 4;

const categories = ref([
    { id: 1, name: "One" },
    { id: 2, name: "Two" },
    { id: 3, name: "Three" }
]);

</script>

<template>
  <main>
    <CategoryManager
        :categories="categories"
        @category-add="addCategory"
        @category-remove="removeCategory"
        @category-edit="editCategory"
    />
  </main>
</template>
