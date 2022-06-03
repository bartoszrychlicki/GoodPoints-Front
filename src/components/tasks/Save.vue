<script>
import axios from 'axios'

const USER_ID = localStorage.getItem('user_id');
const TASKS_API_URL = import.meta.env.VITE_API_BASE_URL + "/taskTypes";
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
  props: {
        id: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        category: {
            type: String,
            default: ''
        }
    },
  data() {
        return {
            categories: [],
            form : {
                name: '',
                category: '',// multi select box values
            },
            formError: '',
        }
    },
    methods: {
        addTask() {
            axios
                .post(TASKS_API_URL, {name: this.form.name, user: USER_ID, category: this.form.category}, defaultRequestConfig)
                .then((response) => {
                    // this.categories.push(response.data);
                    console.log("task added succuful.");
                    console.log(response);
                    
                })
                .catch((error) => {
                    // TODO: on 403 redirect to login
                    // TODO: on other errors redirect to error page
                    if (error.response) {
                        this.formError = error.response.data
                    }

                })
        }
    },
};
</script>
<template>
  <div class="save-task card mx-auto mt-4 p-4">
    <h1 class="green">Add New Tasks</h1>
    <div class="mb-3 mt-3" v-if="formError">
      <p class="text-danger">{{ formError }}</p>
    </div>
    <div class="mb-3 mt-3">
      <label for="name" class="form-label">Task Name:</label>
      <input
        type="text"
        class="form-control"
        id="name"
        placeholder="Enter task name"
        name="name"
        v-model="form.name"
      />
    </div>
    <div class="mb-3 mt-3">
      <label for="sel1" class="form-label">Select Category (select one):</label>
      <select class="form-select" id="sel1" name="sellist1" v-model="form.category">
        <option disabled>Select Category</option>
        <option v-for="category in categories" v-bind:value="category._id">
          {{ category.name }}
        </option>
      </select>
    </div>
    <button type="submit" class="btn btn-primary" @click="addTask">Save</button>
  </div>
  
</template>
<style scoped>
.save-task {
  width: 500px;
}
</style>