<script>
import axios from 'axios'
import Save from '@/components/tasks/Save.vue';
import { RouterLink, RouterView } from 'vue-router'
import IconTrash from '@/components/icons/IconTrash.vue'
import IconAdd from '@/components/icons/IconAdd.vue'

const USER_ID = localStorage.getItem('user_id');
const TASKS_API_URL = import.meta.env.VITE_API_BASE_URL + "/taskTypes";
const ACTIVITY_TYPES_API_URL = import.meta.env.VITE_API_BASE_URL + "/activityTypes";

const defaultRequestConfig = {
    headers: {
        'x-auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
    }
};

export default {
    mounted() {
        axios
          .get(ACTIVITY_TYPES_API_URL, defaultRequestConfig)
          .then((response) => {
            this.activityTypes = response.data;
          })
          .catch((error) => {
            // TODO: on 403 redirect to login
            // TODO: on other errors redirect to error page
          })

        axios
          .get(TASKS_API_URL, defaultRequestConfig)
          .then((response) => {
            this.tasks = response.data;
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
            activityTypes: [],
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
    <div class="activityTypes card mx-auto mt-4 p-4">
      <div class="flex" v-if="activityTypes.length">
        <h1 class="green float-start">Activity Types</h1>
        <RouterLink to="/save-activity-type" class="btn btn-primary btn-sm float-end">Add New Activity Type</RouterLink>
      </div>
        <table class="table table-bordered" v-if="activityTypes.length">
            <thead>
                <tr>
                    <th>Reward</th>
                    <th>Task</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="activityType in activityTypes" :key="activityType._id">
                    <td>{{ activityType.reward }}</td>
                    <td>{{ activityType.task }}</td>
                    <td>{{ activityType.description }}</td>
                    <td>
                        <RouterLink :to="{ name: 'edit-task', params: {id: activityType._id, task: activityType.task, description: activityType.description } }" class="btn btn-primary btn-sm float-start">
                            <IconAdd />
                        </RouterLink>
                        <!-- <IconAdd /> -->
                        <button class="btn btn-danger btn-sm float-end" @click="deleteTask(activityType)">
                            <IconTrash />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    <div v-else>
        <p>Activity types not found</p>
        <RouterLink to="/save-activity-type" class="btn btn-primary btn-sm">Add New Activity Type</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.activityTypes {
    width: 700px;
}
</style>