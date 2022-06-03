<template>
  <div v-if="info" class="alert alert-success" role="alert">{{ info }}</div>
  <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
  <form @submit.prevent="onSubmit">
    <div class="mb-3">
      <label for="name" class="form-label">Name:</label>
      <input
        v-model="user.name"
        class="form-control"
        type="text"
        name="name"
        required="true"
      />
    </div>
    <div class="mb-3">
      <label class="form-label" for="email">E-mail:</label>
      <input
        v-model="user.email"
        class="form-control"
        type="email"
        name="email"
        required="true"
      />
    </div>
    <div class="mb-3 row">
      <div class="col">
        <label class="form-label" for="password">Password </label>
        <input
          v-model="user.password"
          class="form-control"
          type="password"
          name="password"
          required="true"
        />
      </div>
      <div class="col">
        <label class="form-label" for="passsword_confirm"
          >Repeat password
        </label>
        <input
          v-model="user.password_confirm"
          class="form-control"
          type="password"
          name="password_confirm"
          required="true"
        />
      </div>
    </div>
    <input class="btn btn-primary" type="submit" value="Register" />
  </form>
</template>

<script>
  import axios from 'axios'
  import lodash from 'lodash'

  export default {
    data() {
      return {
        user: {
          name: null,
          email: null,
        },
        info: null,
        error: null,
      }
    },
    methods: {
      onSubmit() {
        // check if password match
        if (this.user.password != this.user.password_confirm) {
          this.error = 'The passwords do not match.'
          return
        }
        // crete object to store in DB
        let user = {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
        }
        // send the user object to the API
        axios
          .post(import.meta.env.VITE_API_BASE_URL + '/users', user)
          .then((response) => {
            const token = response.headers['x-auth-token']
            if (!token) {
              throw new Error('No JWT token in response after registering user')
            }
            this.info = 'A new user with ID: ' + response.data._id + 'has been added.'
            localStorage.setItem('token', JSON.stringify(token))

            // clearing the user object so the form is empty
            this.user.name = ''
            this.user.email = ''
            this.user.password = ''
            this.user.password_confirm = ''

            // cleaning errors
            this.error = null

            // all good, thank you, JWT token saved to localstorage in the browser
          })
          .catch((error) => {
            console.error('Error saving user to DB: ', error)
            if (error.response) {
              this.error = error.response.data
              console.log(error.response.data) // => the response payload
            }
          })
      },
    },
  }
</script>

<style scoped></style>
