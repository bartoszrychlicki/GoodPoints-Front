<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-3">
      <label for="name" class="form-label">Imię:</label>
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
        <label class="form-label" for="password">Hasło </label>
        <input
          v-model="user.password"
          class="form-control"
          type="password"
          name="password"
          required="true"
        />
      </div>
      <div class="col">
        <label class="form-label" for="passsword_confirm">Powtórz hasło </label>
        <input
          v-model="user.password_confirm"
          class="form-control"
          type="password"
          name="password_confirm"
          required="true"
        />
      </div>
    </div>
    <input class="btn btn-primary" type="submit" value="Zarejestruj się" />
  </form>
</template>

<script>
  export default {
    data() {
      return {
        user: {
          name: '',
          email: '',
        },
      }
    },
    methods: {
      onSubmit() {
        // check if password match
        if (this.user.password != this.user.password_confirm) {
          console.log('Password not match')
        }
        // crete object to store in DB
        let user = {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
        }
        // send the user object to the API
        console.log(user)
      },
    },
  }
</script>

<style scoped></style>
