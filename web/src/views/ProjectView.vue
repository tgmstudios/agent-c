<template>
  <div>
    <ProjectWidget :project="projectobj"/>
  </div>
</template>

<script>
import ProjectWidget from '@/components/ProjectWidget.vue'
import { getProjects } from '@/lib/projectsLoader.js';

export default {
  name: 'ProjectView',
  components: {
    ProjectWidget
  },
  props: {
    project: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      projectobj: getProjects()[this.project]
    };
  }
}
</script>
