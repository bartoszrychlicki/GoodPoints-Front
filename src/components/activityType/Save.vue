<script>
import axios from "axios";

const USER_ID = localStorage.getItem("user_id");
const TASKS_API_URL = import.meta.env.VITE_API_BASE_URL + "/taskTypes";
const ACTIVITY_TYPES_API_URL = import.meta.env.VITE_API_BASE_URL + "/activityTypes";

const defaultRequestConfig = {
  headers: {
    "x-auth-token": localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
};

export default {
  mounted() {
    axios
      .get(TASKS_API_URL, defaultRequestConfig)
      .then((response) => {
        this.tasks = response.data;
      })
      .catch((error) => {
        // TODO: on 403 redirect to login
        // TODO: on other errors redirect to error page
      });
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
        },
        rewards: {
            type: Array,
            default: [-1, 0, 1, 2]
        },
        selectedReward: {
          type: Number,
          default: -1,
        }
    },
  data() {
        return {
            tasks: [],
            form : {
                reward: this.selectedReward,
                task: '',
                description: '',
            },
            formError: '',
        }
    },
    methods: {
        addActivityType() {
            axios.post(ACTIVITY_TYPES_API_URL, 
                  {
                      reward: this.form.reward, 
                      tasktype: this.form.task,
                      description: this.form.description,
                  }, defaultRequestConfig)
                .then((response) => {
                    alert("new activity type added.");
                    this.$router.push({ name: "activity-types"})
                })
                .catch((error) => {
                    // TODO: on 403 redirect to login
                    // TODO: on other errors redirect to error page
                    if (error.response) {
                        this.formError = error.response.data
                    }
                })
        },
        updateTask(id) {
          axios.put(TASKS_API_URL + "/" + id, {name: this.form.name, user: USER_ID, category: this.form.category}, defaultRequestConfig)
              .then((response) => {
                  alert('task updated')
                  this.$router.push({ name: "tasks"})
              })
              .catch((error) => {
                  // TODO: on 403 redirect to login
                  // TODO: on other errors redirect to error page
                  console.log(error.response.data);
                  this.formError = error.response.data
              })
        }
    },
};
</script>
<template>
  <div class="save-task card mx-auto mt-4 p-4">
    <h1 class="green">
      {{ this.id ? "Update" : "Add New"}} Activity Type</h1>
    <div class="mb-3 mt-3" v-if="formError">
      <p class="text-danger">{{ formError }}</p>
    </div>
    <div class="mb-3 mt-3">
      <label for="name" class="form-label">Select Reward (select one):</label>
      <select
        class="form-select"
        id="sel1"
        name="sellist1"
        v-model="form.reward"
      >
        <option disabled>Select Reward</option>
        <option v-for="reward in rewards" :key="reward" v-bind:value="selectedReward">
          {{ reward }}
        </option>
      </select>
    </div>
    <div class="mb-3 mt-3">
      <label for="sel1" class="form-label">Select Task (select one):</label>
      <select
        class="form-select"
        id="sel1"
        name="sellist1"
        v-model="form.task"
      >
        <option disabled>Select Task</option>
        <option v-for="task in tasks" :key="task._id" v-bind:value="task._id">
          {{ task.name }}
        </option>
      </select>
    </div>
    <div class="mb-3 mt-3">
      <label for="sel1" class="form-label">Description:</label>
      <textarea class="form-control" rows="5" id="comment" name="text" v-model="form.description"></textarea>
    </div>
    <button type="submit" class="btn btn-primary" @click="addActivityType" v-if="this.id == ''">Save</button>
    <button type="submit" class="btn btn-primary" @click="updateTask(this.id)" v-else>Update</button>
  </div>
</template>
<style scoped>
.save-task {
  width: 500px;
}
</style>