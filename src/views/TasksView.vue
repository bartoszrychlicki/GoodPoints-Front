<script>
import axios from 'axios'
import Save from '@/components/tasks/Save.vue';
import { RouterLink, RouterView } from 'vue-router'
import IconTrash from '@/components/icons/IconTrash.vue'
import IconAdd from '@/components/icons/IconAdd.vue'
import Modal from '@/components/modal/Modal.vue';

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

            this.resultTasks = this.tasks.reduce(function (r, a) {
                    r[a.category.name] = r[a.category.name] || [];
                    r[a.category.name].push(a);
                    return r;
                }, Object.create(null));
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
            isModalVisible: false,
            resultTasks: [],
            selectedActivityType: [],
            activityDescription: '',
        }
    },
    methods: {
        doneTaskType () {

        },
        undoneTaskType () {

        },
        showModal(activityType) {
            this.isModalVisible = true;
            this.selectedActivityType = activityType
            console.log(activityType);
        },
        closeModal() {
            this.isModalVisible = false;
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
    components: {Save, IconTrash, IconAdd, Modal}
}
</script>

<template>
    <div class="tasks card mx-auto mt-4 p-4">
      <div class="flex" v-if="tasks.length">
        <h1 class="green float-start">Tasks</h1>
        <RouterLink to="/save-tasks" class="btn btn-primary btn-sm float-end">Add New Task</RouterLink>
      </div>
        <!-- <table class="table table-bordered" v-if="tasks.length">
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
                        <IconAdd />
                        <button class="btn btn-danger btn-sm float-end" @click="deleteTask(task)">
                            <IconTrash />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>  -->
        <div v-if="tasks.length">
            <div v-for="(task, index)  in resultTasks" :key="task" class="card">
                <div class="card-body"><h2>{{ index }}</h2></div>
                <div v-for="taskType in task" :key="taskType">
                    <div class="card-header"><h5>{{ taskType.name }}</h5></div>
                    <div v-for="activityType in taskType.activitytypes" :key="activityType" class="card-body mb-3">
                        <input 
                            class="form-check-input" 
                            type="checkbox" id="check1" 
                            name="option1" 
                            value="something"
                            @change="showModal(activityType)"
                        > &nbsp;&nbsp;
                        <label class="form-check-label"> {{ activityType.description }}</label>
                    </div>
                </div>
            </div>
        </div>
    <div v-else>
        <p>Tasks not found</p>
        <RouterLink to="/save-tasks" class="btn btn-primary btn-sm">Add New Task</RouterLink>
    </div>
  </div>

    <Modal
      v-show="isModalVisible"
      @close="closeModal"
    >
        <template v-slot:header>
            Are you Sure to check done this activity type?
        </template>

        <template v-slot:body>
            <div class="mb-3 mt-3">
                <label for="name" class="form-label">Desciption:</label>
                <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="Enter activity description"
                    name="name"
                    v-model="activityDescription"
                />
            </div>
            <div>
                <button class="btn btn-primary btn-sm" @click="doneTaskType()">
                    Done
                </button>
                <button class="btn btn-danger btn-sm float-end" @click="undoneTaskType()">
                    Undone
                </button>
            </div>
        </template>
    </Modal>
</template>

<style scoped>
.tasks {
    width: 800px;
}
</style>