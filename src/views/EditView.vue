<script>
import CategoryManager from '../components/category/Manager.vue'
import axios from 'axios'

const USER_ID = localStorage.getItem('user_id');
const CATEGORIES_SUB_API_URL = import.meta.env.VITE_API_BASE_URL + "/categories";

export default {
    mounted() {
        axios
          .get(CATEGORIES_SUB_API_URL, {}, {'x-auth-token': localStorage.getItem('token')})
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
                .post(CATEGORIES_SUB_API_URL, {name: name, user: USER_ID}, {'x-auth-token': localStorage.getItem('token')})
                .then((response) => {
                    this.categories.push(response.data);
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
                    .delete(CATEGORIES_SUB_API_URL + "/" + this.categories[idx]._id, {}, {'x-auth-token': localStorage.getItem('token')})
                    .then((response) => {
                        categories.splice(idx, 1);
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
                    .put(CATEGORIES_SUB_API_URL + "/" + this.categories[idx]._id, {name: name, user: USER_ID}, {'x-auth-token': localStorage.getItem('token')})
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
