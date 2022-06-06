<script>
import Item from '../components/category/Item.vue';
import Input from '../components/category/Input.vue';
import axios from 'axios'

const USER_ID = localStorage.getItem('user_id');
const CATEGORIES_SUB_API_URL = import.meta.env.VITE_API_BASE_URL + "/categories";

const defaultRequestConfig = {
    headers: {
        'x-auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
    }
};

export default {
    mounted() {
        axios
          .get(CATEGORIES_SUB_API_URL, defaultRequestConfig)
          .then((response) => {
            this.categories = response.data;
          })
          .catch((error) => {
            // TODO: on 403 redirect to login
            // TODO: on other errors redirect to error page
          })
    },
    data() {
        return {
            nextId: 4,
            categories: [
            ],
        }
    },
    methods: {
        addCategory(name) {
            axios
                .post(CATEGORIES_SUB_API_URL, {name: name, user: USER_ID}, defaultRequestConfig)
                .then((response) => {
                    this.categories.push(response.data);
                    this.$refs.newCategoryInput.clear();
                })
                .catch((error) => {
                    // TODO: on 403 redirect to login
                    // TODO: on other errors redirect to error page
                })
        },
        _getCategoryIdx(id) {
            let idx = -1;
            for (let i = 0; i < this.categories.length; i++) {
                if (this.categories[i]._id === id) {
                    idx = i;
                    break;
                }
            }
            return idx;
        },
        removeCategory(id) {
            let idx = this._getCategoryIdx(id)
            if (idx !== -1) {
                axios
                    .delete(CATEGORIES_SUB_API_URL + "/" + this.categories[idx]._id, defaultRequestConfig)
                    .then((response) => {
                        this.categories.splice(idx, 1);
                    })
                    .catch((error) => {
                        // TODO: on 403 redirect to login
                        // TODO: on other errors redirect to error page
                    })
            }
        },
        editCategory(id, name) {
            let idx = this._getCategoryIdx(id);
            if (idx !== -1) {
                axios
                    .put(CATEGORIES_SUB_API_URL + "/" + this.categories[idx]._id, {name: name, user: USER_ID}, defaultRequestConfig)
                    .then((response) => {
                        this.categories[idx] = response.data;
                    })
                    .catch((error) => {
                        // TODO: on 403 redirect to login
                        // TODO: on other errors redirect to error page
                    })
            }
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
        <li v-for="category in categories" :key="category._id" class="list-group-item">
            <Item
            :name="category.name"
            @remove="removeCategory(category._id)"
            @save="(name) => { editCategory(category._id, name); }"
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
