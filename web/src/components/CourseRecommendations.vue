<template>
    <div class="course-recommendations">
      <h2>Recommended Courses for Next Semester</h2>
      <div v-if="loading" class="loading">
        <LoadingSpinner />
        <p>Generating recommendations...</p>
      </div>
      <div v-else-if="error" class="error-message">
        {{ error }}
      </div>
      <div v-else-if="recommendations.length === 0" class="no-recommendations">
        <p>No course recommendations available at this time.</p>
      </div>
      <div v-else class="recommendations-list">
        <div v-for="course in recommendations" :key="course.id" class="course-card">
          <h3>{{ course.code }}: {{ course.name }}</h3>
          <p><strong>Credits:</strong> {{ course.credits }}</p>
          <p><strong>Description:</strong> {{ course.description }}</p>
          <p><strong>Prerequisites:</strong> {{ course.prerequisites.join(', ') || 'None' }}</p>
          <p><strong>Reason for recommendation:</strong> {{ course.reason }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { getCourseRecommendations } from '../services/courseService';
  
  export default {
    name: 'CourseRecommendations',
    props: {
      major: {
        type: String,
        required: true
      },
      minors: {
        type: Array,
        default: () => []
      },
      transcript: {
        type: Object,
        required: true
      },
      credits: {
        type: String,
        required: true
      },
      comments: {
        type: String,
        default: ''
      }
    },
    setup(props) {
      const recommendations = ref([]);
      const loading = ref(true);
      const error = ref(null);
  
      const fetchRecommendations = async () => {
        try {
          loading.value = true;
          error.value = null;
          recommendations.value = await getCourseRecommendations(props.major, props.minors, props.transcript);
        } catch (err) {
          error.value = 'Failed to fetch course recommendations. Please try again later.';
          console.error('Error fetching recommendations:', err);
        } finally {
          loading.value = false;
        }
      };
  
      onMounted(fetchRecommendations);
  
      return {
        recommendations,
        loading,
        error
      };
    }
  }
  </script>
  
  <style scoped>
  .course-recommendations {
    margin-top: 30px;
  }
  
  .loading, .no-recommendations {
    text-align: center;
    padding: 20px;
  }
  
  .recommendations-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }
  
  .course-card {
    background-color: rgba(0, 0, 0, 0.062);
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .course-card h3 {
    margin-top: 0;
    color: #ffdb00;
  }
  
  /* TODO: Customize these styles to match your university's branding */
  </style>
  