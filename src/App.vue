<script setup>
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
<nav class="navbar navbar-expand-sm navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="javascript:void(0)">GoodPoints</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="mynavbar">
      <ul class="navbar-nav me-auto" v-if="this.$route.meta.requiresAuth === true">
        <li class="nav-item">
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/edit">Categories</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/tasks">Tasks</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/logout">Log out</RouterLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
<RouterView />
</template>

<style>
  @import '@/assets/base.css';

  #app {
    width: 100%;
    max-width: 100%;
    /* margin: 0 auto; */
    /* padding: 2rem; */

    font-weight: normal;
  }

  header {
    line-height: 1.5;
    max-height: 100vh;
  }

  .logo {
    display: block;
    margin: 0 auto 2rem;
  }

  a {
    text-decoration: none !important;
  }

  a,
  .green {
    text-decoration: none;
    color: hsla(160, 100%, 37%, 1);
    transition: 0.4s;
  }

  @media (hover: hover) {
    a:hover {
      background-color: hsla(0, 0%, 0%, 0.2);
    }
  }

  nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;
  }

  nav a.router-link-exact-active {
    color: hsla(160, 100%, 37%, 1);
  }

  nav a.router-link-exact-active:hover {
    background-color: transparent;
  }

  nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
  }

  nav a:first-of-type {
    border: 0;
  }

  @media (min-width: 1024px) {
    body {
      display: flex;
      /* place-items: center; */
    }

    #app {
      /* display: grid; */
      /* grid-template-columns: 1fr 1fr; */
      /* padding: 0 2rem; */
    }

    header {
      display: flex;
      place-items: center;
      padding-right: calc(var(--section-gap) / 2);
    }

    header .wrapper {
      display: flex;
      place-items: flex-start;
      flex-wrap: wrap;
    }

    .logo {
      margin: 0 2rem 0 0;
    }

    nav {
      text-align: left;
      /* margin-left: -1rem; */
      font-size: 1rem;

      padding: 1rem 0;
      margin-top: 1rem;
    }
  }
</style>
