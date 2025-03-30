<template>
  <header>
    <router-link :key="1" :to="'/'" class="logo"><img :src="logo"></router-link>
    <a href="#" class="account" @click.prevent="handleAccountClick">
      <font-awesome-icon :icon="['fas', 'user']" />
    </a>
  </header>  
</template>
  
<script>
import { useRouter } from 'vue-router';
import agentCService from '../services/agentCService';

export default {
  name: 'HeaderSection',
  props: {
    menu: Array,
    logo: String
  },
  setup() {
    const router = useRouter();

    const handleAccountClick = async () => {
      try {
        // Generate a new session ID
        await agentCService.initSession(true); // Pass true to force new session
        
        // Clear all user input by resetting the store or local storage
        localStorage.removeItem('transcript');
        localStorage.removeItem('major');
        localStorage.removeItem('minors');
        localStorage.removeItem('credits');
        localStorage.removeItem('comments');
        
        // Navigate to home page
        router.push('/');
      } catch (error) {
        console.error('Error initializing new session:', error);
      }
    };

    return {
      handleAccountClick
    };
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
  
  .account {
    cursor: pointer;
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