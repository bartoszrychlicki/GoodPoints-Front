<template>
  <h1>Dashboard</h1>
</template>
<script>
  import axios from 'axios'

  const USER_ID = localStorage.getItem('user_id')
  const CATEGORIES_SUB_API_URL =
    import.meta.env.VITE_API_BASE_URL + '/categories'

  export default {
    mounted() {
      axios
        .get(
          CATEGORIES_SUB_API_URL,
          {},
          { 'x-auth-token': localStorage.getItem('token') }
        )
        .then((response) => {
          this.categories = response.data
        })
        .catch((error) => {
          // TODO: on 403 redirect to login
          // TODO: on other errors redirect to error page
        })
    },
  }
</script>
