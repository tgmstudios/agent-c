<template>
    <project v-if="view === 'full'">
      <h2>{{ project.title }}</h2>
      <img :src="project.icon" :alt="project.title">
      <p>{{ project.excerpt }}</p>
      <div v-html="renderedContent"></div>
    </project>
    
    <project-card v-else-if="view === 'card'">
      <img :src="project.icon" :alt="project.title">
      <h2>{{ project.title }}</h2>
      <p class="card-excerpt">{{ project.excerpt }}</p>
    </project-card>
</template>

<script>
import MarkdownIt from 'markdown-it'

export default {
    name: 'ProjectWidget',
    props: {
        project: {
            type: Object,
            required: true
        },
        view: {
            type: String,
            default: 'full'
        }
    },
    computed: {
        renderedContent() {
            const md = new MarkdownIt()
            return md.render(this.project.content)
        }
    }
}
</script>

<style scoped>
project-card {
    width: 100%;
    min-height: 200px;
    max-height: 300px;
    padding: 20px;
    background-color: rgba(32, 33, 36, 0.8);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease;
}
project-card:hover {
    transform: translateY(-5px);
}
project-card h2 {
    margin: 0;
}
project-card img {
    width: 100%;
    height: auto;
    max-height: 50%;
    object-fit: contain;
    border-radius: 5px;
    margin-bottom: 10px;
}
.card-excerpt {
    flex-grow: 1;
    overflow: hidden;
    font-size: 0.9em;
    line-height: 1.4;
}
@media (min-width: 768px) {
    project-card {
        width: calc(50% - 50px);
    }
}
/*@media (min-width: 992px) {
    project-card {
        width: calc(33.33% - 13.33px);
    }
}*/
</style>