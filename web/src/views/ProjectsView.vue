<template>
  <body>
    <div id="filter">
      <input type="text" placeholder="Search...">
    </div>
    <div id="projects">
      <ProjectWidget 
        v-for="(project, key) in projects" 
        :key="key" 
        :project="project"
        :view="'card'"
      />
    </div>
  </body>
</template>

<script>
import ProjectWidget from '@/components/ProjectWidget.vue'
import { getProjects } from '@/lib/projectsLoader.js';

export default {
  name: 'ProjectView',
  components: {
    ProjectWidget
  },
  data() {
    return {
      projects: getProjects()
    };
  }
}
</script>

<style scoped>
  body {
    display: flex;
    flex-direction: column;
    padding: 20px;
    max-width: 1300px;
    margin: 0 auto;
  }
  #projects {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 10px;
    width: 100%;
    max-width: 1000px;
    margin-right: 38px;
  }
  #filter {
    padding: 15px;
    border-radius: 18px;
    background-color: rgba(32, 33, 36, 0.8);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  @media (min-width: 768px) {
    body {
      flex-direction: row;
      padding: 38px 0;
    }

    #filter {
      width: 240px;
      height: 300px;
      margin: 0 38px;
    }

    #projects {
      width: 70%;
      margin-right: 38px;
    }
  }
</style>