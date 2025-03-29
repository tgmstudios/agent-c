<template>
  <HeaderSection :logo="logoURL" :menu="headerMenu"/>
  <router-view/>
  <FooterSection :menu="headerMenu"/>
</template>

<script>
import { ref } from 'vue';
import HeaderSection from './components/HeaderSection.vue';
import FooterSection from './components/FooterSection.vue';

const logoURL = require('./assets/logo.png');
const headerMenu = ref([
  { id: 1, url: '/', text: 'Home' },
]);

export default {
  name: 'App',
  components: {
    HeaderSection,
    FooterSection
  },
  data () {
    return {
      headerMenu,
      logoURL
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffdb00;
  background-color: #050020;
}
body {
  margin: 0;
}
</style>
