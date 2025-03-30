<template>
    <div class="schedule-view">
      <h1>Your Academic Plan</h1>
      
      <div v-if="loading" class="loading-container">
        <div class="spinner"></div>
        <p>Loading your academic plan...</p>
      </div>
      
      <div v-else-if="error" class="error-container">
        <h3>Error</h3>
        <p>{{ error }}</p>
        <button class="btn" @click="fetchSchedule">Try Again</button>
      </div>
      
      <div v-else-if="!pathId" class="no-schedule">
        <p>No academic plan found. Please generate a plan from the Course Planner.</p>
        <router-link to="/planner" class="btn">Go to Course Planner</router-link>
      </div>
      
      <CourseRecommendationsDisplay
        v-else
        :pathId="pathId"
      />
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import CourseRecommendationsDisplay from '@/components/CourseRecommendationsDisplay.vue';
  import courseConnectService from '@/services/courseConnectService';
  
  export default {
    name: 'ScheduleView',
    components: {
      CourseRecommendationsDisplay
    },
    setup() {
      const route = useRoute();
      const pathId = ref(null);
      const loading = ref(true);
      const error = ref(null);
      
      const fetchSchedule = async () => {
        try {
          loading.value = true;
          error.value = null;
          
          // Check if pathId is in route params
          if (route.params.pathId) {
            pathId.value = route.params.pathId;
          } else {
            // Get the most recent path ID for the current session
            const paths = await courseConnectService.getPathsForSession();
            if (paths && paths.length > 0) {
              // Sort by creation date (newest first)
              paths.sort((a, b) => new Date(b.created) - new Date(a.created));
              pathId.value = paths[0].id;
            }
          }
        } catch (err) {
          console.error('Error fetching schedule:', err);
          error.value = 'Failed to load your academic plan. Please try again.';
        } finally {
          loading.value = false;
        }
      };
      
      onMounted(fetchSchedule);
      
      return {
        pathId,
        loading,
        error,
        fetchSchedule
      };
    }
  }
  </script>
  
  <style scoped>
  .schedule-view {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h1 {
    color: #ffffff;
    margin-bottom: 30px;
    text-align: center;
  }
  
  .loading-container, .error-container, .no-schedule {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    text-align: center;
  }
  
  .spinner {
    border: 4px solid rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    border-top: 4px solid #ffdb00;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin-bottom: 20px;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
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
    margin-top: 20px;
    text-decoration: none;
    display: inline-block;
  }
  
  .btn:hover {
    background-color: #e6c500;
  }
  
  .error-container {
    color: #ff5252;
  }
  </style>
  