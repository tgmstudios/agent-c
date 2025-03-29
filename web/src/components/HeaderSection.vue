<template>
    <header>
      <router-link :key="1" :to="'/'" class="logo"><img :src="logo"></router-link>
      <nav>
        <router-link v-for="link in menu" :key="link.id" :to="link.url">{{link.text}}</router-link>
      </nav>
      <a href="#" class="account">
        <font-awesome-icon :icon="['fas', 'user']" />
      </a>
    </header>  
  </template>
  
  <script>
  export default {
    name: 'HeaderSection',
    props: {
      menu: Array,
      logo: String
    }
  }
  </script>
  
  <style scoped>
  header {
    display: flex;
    justify-content: space-between;
    padding: 0px 20px;
  }
  .logo img, .account img {
    width: 67px;
  }
  .account svg {
    width: 30px;
    height: auto;
    color: #E5DED4;
    margin-top:50%;
  }
  
  nav {
    padding: 30px;
  }
  nav a {
      font-weight: 800;
      letter-spacing: 1.1px;
      font-size: 16px;
      text-transform: uppercase;
      text-underline-offset: 8px;
      text-decoration: none;
      padding: 12px;
      color: #E5DED4;
  }
  nav a:hover {
      color: #0054ff;
      text-decoration: underline;
      text-decoration-thickness: 1px;
  }
  nav a.router-link-exact-active {
      color: #ffdb00;
      text-decoration: underline;
      text-decoration-thickness: 2px;
  }
  </style>