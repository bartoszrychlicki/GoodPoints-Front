<script>
import axios from 'axios'
import Save from '@/components/tasks/Save.vue';
import { RouterLink, RouterView } from 'vue-router'
import IconTrash from '@/components/icons/IconTrash.vue'
import IconAdd from '@/components/icons/IconAdd.vue'

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
          .get(TASKS_API_URL, defaultRequestConfig)
          .then((response) => {
              console.log(response.data)
            this.tasks = response.data;
          })
          .catch((error) => {
            // TODO: on 403 redirect to login
            // TODO: on other errors redirect to error page
          })

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
            tasks: [],
            categories: [],
        }
    },
    methods: {
        editTask(task) {
            
        },
        deleteTask(task) {
            if (task) {
                console.log(task);
                axios
                    .delete(TASKS_API_URL + "/" + task._id, defaultRequestConfig)
                    .then((response) => {
                        this.tasks.splice(task._id, 1);
                    })
                    .catch((error) => {
                        // TODO: on 403 redirect to login
                        // TODO: on other errors redirect to error page
                        console.log(error.response.data);
                    })
            } else {
                console.log('taks not deleted');
            }
        }
    },
    components: {Save, IconTrash, IconAdd}
}
</script>

<template>
    <div class="tasks card mx-auto mt-4 p-4">
      <div class="flex" v-if="tasks.length">
        <h1 class="green float-start">Tasks</h1>
        <RouterLink to="/save-tasks" class="btn btn-primary btn-sm float-end">Add New Task</RouterLink>
      </div>
        <table class="table table-bordered" v-if="tasks.length">
            <thead>
                <tr>
                    <th>Task</th>
                    <th>Category</th>
                    <th>Activity Types</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="task in tasks" :key="task._id">
                    <td>{{ task.name }}</td>
                    <td>{{ task.category.name }}</td>
                    <td>
                        <div>
                            <div v-for="activityType in task.activitytypes" :key="activityType">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="check1" name="option1" value="something">
                                    <label class="form-check-label">{{ activityType.description }}</label>
                                </div> 
                            </div>
                        </div>
                    </td>
                    <td>
                        <RouterLink :to="{ name: 'edit-task', params: {id: task._id, name: task.name, category: task.category._id } }" class="btn btn-primary btn-sm float-start">
                            <IconAdd />
                        </RouterLink>
                        <!-- <IconAdd /> -->
                        <button class="btn btn-danger btn-sm float-end" @click="deleteTask(task)">
                            <IconTrash />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    <div v-else>
        <p>Tasks not found</p>
        <RouterLink to="/save-tasks" class="btn btn-primary btn-sm">Add New Task</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.tasks {
    width: 800px;
}
</style>