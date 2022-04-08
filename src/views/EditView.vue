<script>
import CategoryManager from '../components/CategoryManager.vue'
import { ref } from 'vue'

export default {
    data() {
        return {
            nextId: 4,
            categories: [
                { id: 1, name: "One" },
                { id: 2, name: "Two" },
                { id: 3, name: "Three" }
            ],
        }
    },
    methods: {
        addCategory(name) {
            let newCat = {id: this.nextId++, name: name};
            this.categories.push(newCat);
        },
        _getCategoryIdx(id) {
            let idx = -1;
            for (let i = 0; i < this.categories.length; i++) {
                if (this.categories[i].id === id) {
                    idx = i;
                    break;
                }
            }
            return idx;
        },
        removeCategory(id) {
            let idx = this._getCategoryIdx(id)
            if (idx !== -1) {
                categories.splice(idx, 1);
            }
        },
        editCategory(id, name) {
            let idx = this._getCategoryIdx(id);
            if (idx !== -1) {
                this.categories[idx].name = name;
            }
        }
    },
    components: {CategoryManager}
}
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
