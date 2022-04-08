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
        <label class="form-label" for="password">Hasło </label>
        <input
          v-model="user.password"
          class="form-control"
          type="password"
          name="password"
          required="true"
        />
      </div>
    </div>
    <input class="btn btn-primary" type="submit" value="Zaloguj się" />
  </form>
  <div v-else>Jesteś juz zalogowany.</div>
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
      console.log(this.loggedIn)
    },
    methods: {
      onSubmit() {
        console.log('on submit')
        this.error = ''
        this.info = ''
        axios
          .post('https://mighty-peak-98894.herokuapp.com/api/auth', this.user)
          .then((response) => {
            console.log(response)
            const token = response.headers['x-auth-token']
            console.log(token)
            if (!token) {
              throw new Error('No JWT token in response after registering user')
            }
            this.info = 'Cześć ' + response.data.name + '! Witamy w GoodPoints.'
            localStorage.setItem('token', JSON.stringify(token))
            localStorage.setItem('user_id', JSON.stringify(response.data._id))
            this.$router.replace('home')
          })
          .catch((error) => {
            console.error(error)
            if (error.response) {
              this.error = error.response.data
            }
          })
      },
    },
  }
</script>

<style scoped></style>
