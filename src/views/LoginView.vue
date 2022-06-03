<script setup>
  import RegisterUser from '../components/RegisterUser.vue'
  import LoginUser from '../components/LoginUser.vue'
</script>

<template>
  <main class="forms card mx-auto mt-4 p-4">
    <RegisterUser />
    <LoginUser />
  </main>
</template>
<style scoped>
.forms {
    width: 500px;
}
</style>
