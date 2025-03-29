<template>
  <div id="app">
    <HeaderSection :logo="logoURL" :menu="headerMenu"/>
    <router-view/>
    <FooterSection :menu="headerMenu"/>
  </div>
</template>

<script>
import { ref } from 'vue';
import HeaderSection from './components/HeaderSection.vue';
import FooterSection from './components/FooterSection.vue';

export default {
  name: 'App',
  components: {
    HeaderSection,
    FooterSection,
    FileUploader
  },
  setup() {
    const logoURL = require('./assets/logo.png');
    const headerMenu = ref([
      { id: 1, url: '/', text: 'Home' },
      { id: 2, url: '/planner', text: 'Course Planner' },
      // TODO: Add more menu items as needed
    ]);

    return {
      headerMenu,
      logoURL
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ffdb00;
  background-color: #080036;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

body {
  margin: 0;
}

/* 
  TODO: Customize these variables to match your university's branding
  --primary-color: #ffdb00;
  --secondary-color: #080036;
  --accent-color: #ff5722;
  --text-color: #333333;
  --light-bg: #f5f5f5;
*/

h1, h2, h3 {
  color: #ffdb00;
}

.btn {
  background-color: #ffdb00;
  color: #080036;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #e6c500;
}

.btn-secondary {
  background-color: transparent;
  border: 2px solid #ffdb00;
  color: #ffdb00;
}

.btn-secondary:hover {
  background-color: rgba(255, 219, 0, 0.1);
}

.card {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Form styling */
.form-group {
  margin-bottom: 20px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid rgba(255, 219, 0, 0.3);
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffdb00;
}

.form-control:focus {
  outline: none;
  border-color: #ffdb00;
  box-shadow: 0 0 0 2px rgba(255, 219, 0, 0.2);
}

.error-message {
  color: #ff5252;
  font-size: 14px;
  margin-top: 5px;
}
</style>
