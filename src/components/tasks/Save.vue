<script>
import axios from "axios";
import IconTrash from '@/components/icons/IconTrash.vue'
import IconAdd from '@/components/icons/IconAdd.vue'
// import form from 'vuejs-form'

const USER_ID = localStorage.getItem("user_id");
const TASKS_API_URL = import.meta.env.VITE_API_BASE_URL + "/taskTypes";
const CATEGORIES_SUB_API_URL = import.meta.env.VITE_API_BASE_URL + "/categories";
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
      .get(CATEGORIES_SUB_API_URL, defaultRequestConfig)
      .then((response) => {
        this.categories = response.data;
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
        }
    },
    components: {IconTrash, IconAdd},
  data() {
        return {
            categories: [],
            form : {
                name: this.name ? this.name : '',
                category: this.category ? this.category : '',
                activities: [{
                  reward: '',
                  description: '',
                }],
            },
            formError: '',
            activityFormError: '',
        }
    },
    methods: {
        addTask() {
          if (this.form.activities[0].reward != '' && this.form.activities[0].reward != '') {
            axios.post(
                  TASKS_API_URL, 
                  {name: this.form.name, user: USER_ID, category: this.form.category}, 
                  defaultRequestConfig
                ).then((response) => {
                    // alert("new task added.");
                    // this.$router.push({ name: "tasks"})
                    for (let index = 0; index < this.form.activities.length; index++) {
                        axios.post(ACTIVITY_TYPES_API_URL, 
                            {
                                reward: this.form.activities[index].reward, 
                                tasktype: response.data._id,
                                description: this.form.activities[index].description,
                            }, defaultRequestConfig)
                          .then((response) => {
                              alert("new task and activity types added successfully!.");
                              this.$router.push({ name: "tasks"})
                              // this.$router.push({ name: "activity-types"})
                          })
                          .catch((error) => {
                              // TODO: on 403 redirect to login
                              // TODO: on other errors redirect to error page
                              if (error.response) {
                                  console.log(error.response.data)
                              }
                          })

                    }
                })
                .catch((error) => {
                    // TODO: on 403 redirect to login
                    // TODO: on other errors redirect to error page
                    if (error.response) {
                        this.formError = error.response.data
                    }

                })
          } else {
            this.activityFormError = "Please add atleast one activity type"
          }
            
        },
        updateTask(id) {
          axios.put(TASKS_API_URL + "/" + id, {name: this.form.name, user: USER_ID, category: this.form.category}, defaultRequestConfig)
              .then((response) => {
                  // alert('task updated')
                  // this.$router.push({ name: "tasks"})
                  console.log(response.data);
              })
              .catch((error) => {
                  // TODO: on 403 redirect to login
                  // TODO: on other errors redirect to error page
                  console.log(error.response.data);
                  this.formError = error.response.data
              })
        },
        addActivity () {
          this.form.activities.push({
            reward: '',
            description: ''
          })
        },
        removeActivity (index) {
          this.form.activities.splice(index, 1)
        },
    },
};
</script>
<template>
  <div class="save-task card mx-auto mt-4 p-4">
    <h1 class="green">
      {{ this.id ? "Update" : "Add New"}} Tasks
    </h1>
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
      <select
        class="form-select"
        id="sel1"
        name="sellist1"
        v-model="form.category"
      >
        <option disabled>Select Category</option>
        <option v-for="category in categories" :key="category._id" v-bind:value="category._id">
          {{ category.name }}
        </option>
      </select>
    </div>

    <!-- Add activities for task -->

    <h1 class="green">
      {{ this.id ? "Update" : "Add"}} Activity Types
    </h1>

  <div class="mb-3 mt-3" v-if="activityFormError">
      <p class="text-danger">{{ activityFormError }}</p>
    </div>
    <div class="form-group mb-3" v-for="(activity, counter) in form.activities" v-bind:key="counter">
      <div class="mb-3 mt-3">
        <label for="name" class="form-label">Reward Points:</label>
        <input
          type="text"
          class="form-control"
          id="name"
          placeholder="Enter Reward Points"
          name="name"
          v-model="activity.reward"
        />
      </div>

      <div class="mb-3 mt-3">
        <label for="name" class="form-label">Description:</label>
        <input
          type="text"
          class="form-control"
          id="name"
          placeholder="Enter Activity description"
          name="name"
          v-model="activity.description"
        />
      </div>
      <div>
        <button 
          class="btn btn-primary btn-sm" 
          @click="addActivity(counter)"
          v-show="counter == form.activities.length-1"
        >
            <IconAdd />
        </button>
        <button 
          class="btn btn-danger btn-sm float-end" 
          @click="removeActivity(counter)" 
          v-show="counter || ( !counter && form.activities.length > 1)"
        >
            <IconTrash />
        </button>
      </div>
    </div>

    <button type="submit" class="btn btn-primary" @click="addTask" v-if="this.id == ''">Save</button>
    <button type="submit" class="btn btn-primary" @click="updateTask(this.id)" v-else>Update</button>
  </div>
</template>
<style scoped>
.save-task {
  width: 600px;
}
</style>