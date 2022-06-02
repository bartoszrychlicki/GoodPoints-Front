<template>
  <div v-if="info" class="alert alert-success" role="alert">{{ info }}</div>
  <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
  <form @submit.prevent="onSubmit" v-if="!loggedIn">
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
        <label class="form-label" for="password">Password: </label>
        <input
          v-model="user.password"
          class="form-control"
          type="password"
          name="password"
          required="true"
        />
      </div>
    </div>
    <input class="btn btn-primary" type="submit" value="Log in" />
  </form>
  <div v-else>You are already logged in.</div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        user: {
          email: '',
          password: '',
        },
        info: null,
        error: null,
        loggedIn: false,
      }
    },
    mounted() {
      // check if user is logged in
      const token = localStorage.getItem('token')
      if (token != null) {
        this.loggedIn = true
      }
    },
    methods: {
      onSubmit() {
        this.error = ''
        this.info = ''
        axios
          .post(import.meta.env.VITE_API_BASE_URL + '/auth', this.user)
          .then((response) => {
            const token = response.headers['x-auth-token']
            if (!token) {
              throw new Error('No JWT token in response after registering user')
            }
            this.info = 'Hi ' + response.data.name + '! Welcome to GoodPoints.'
            localStorage.setItem('token', token)
            localStorage.setItem('user_id', response.data._id)
            this.$router.replace('home')
          })
          .catch((error) => {
            if (error.response) {
              this.error = error.response.data
            }
          })
      },
    },
  }
</script>

<style scoped></style>
