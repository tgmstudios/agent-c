<template>
    <div class="recommendations-container">
      <div v-if="loading" class="loading-container">
        <div class="spinner"></div>
        <p>Generating your personalized academic plan...</p>
      </div>
      
      <div v-else-if="error" class="error-container">
        <h3>Error</h3>
        <p>{{ error }}</p>
        <button class="btn" @click="fetchRecommendations">Try Again</button>
      </div>
      
      <div v-else-if="recommendations" class="recommendations-content">
        <div class="recommendations-header">
          <h2>Your Personalized Academic Plan</h2>
          <div class="program-info">
            <div class="info-item">
              <span class="label">Major:</span>
              <span class="value">{{ recommendations.major }}</span>
            </div>
            <div v-if="recommendations.minors && recommendations.minors.length > 0" class="info-item">
              <span class="label">Minor(s):</span>
              <span class="value">{{ recommendations.minors.join(', ') }}</span>
            </div>
            <div class="info-item">
              <span class="label">Graduation Timeline:</span>
              <span class="value">{{ recommendations.graduation_timeline }}</span>
            </div>
          </div>
        </div>
        
        <div class="plan-container">
          <h3>Suggested Academic Plan</h3>
          <p class="plan-description">
            The course series listed below provides only one of many possible ways to move through this curriculum. 
            The University may make changes in policies, procedures, educational offerings, and requirements.
          </p>
          
          <div v-for="(yearData, yearKey) in recommendations.four_year_plan" :key="yearKey" class="year-container">
            <h4>{{ formatYearTitle(yearKey) }}</h4>
            
            <div class="semester-tables">
              <div v-for="(semesterData, semesterKey) in yearData" :key="semesterKey" class="semester-table">
                <h5>{{ formatSemesterTitle(semesterKey) }}</h5>
                <table>
                  <thead>
                    <tr>
                      <th>Course</th>
                      <th>Credits</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(course, index) in semesterData.courses" :key="index">
                      <td class="course-name">{{ course.code }}</td>
                      <td class="credits">{{ course.credits }}</td>
                    </tr>
                    <tr class="total-row">
                      <td><strong>Total Credits</strong></td>
                      <td class="credits"><strong>{{ semesterData.total_credits }}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="hasAdditionalRecommendations" class="additional-recommendations">
          <h3>Additional Recommendations</h3>
          
          <div v-if="recommendations.additional_recommendations.career_preparation && recommendations.additional_recommendations.career_preparation.length > 0" class="recommendation-section">
            <h4>Career Preparation</h4>
            <ul>
              <li v-for="(item, index) in recommendations.additional_recommendations.career_preparation" :key="index">
                {{ item }}
              </li>
            </ul>
          </div>
          
          <div v-if="recommendations.additional_recommendations.extracurricular_activities && recommendations.additional_recommendations.extracurricular_activities.length > 0" class="recommendation-section">
            <h4>Extracurricular Activities</h4>
            <ul>
              <li v-for="(item, index) in recommendations.additional_recommendations.extracurricular_activities" :key="index">
                {{ item }}
              </li>
            </ul>
          </div>
          
          <div v-if="recommendations.additional_recommendations.internships && recommendations.additional_recommendations.internships.length > 0" class="recommendation-section">
            <h4>Internships</h4>
            <ul>
              <li v-for="(item, index) in recommendations.additional_recommendations.internships" :key="index">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
        
        <div class="program-notes">
          <h3>Program Notes</h3>
          <ul>
            <li>This plan is based on your selected preferences and transcript information.</li>
            <li>Course availability may vary by semester. Always consult with your academic advisor.</li>
            <li>Prerequisites for courses should be verified in the university catalog.</li>
            <li>Some courses may be offered in different semesters than shown here.</li>
          </ul>
        </div>

        <WeeklySchedule 
          :pathId="pathId" 
          :year="recommendations?.year || '3'" 
          :semester="recommendations?.semester || 'fall'" 
        />
        
        <div class="actions">
          <button class="btn btn-primary" @click="printPlan">Print Plan</button>
          <button class="btn btn-secondary" @click="savePlan">Save Plan</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted, watch } from 'vue';
  import courseConnectService from '@/services/courseConnectService';
  import WeeklySchedule from '@/components/WeeklySchedule.vue';
  
  export default {
    name: 'CourseRecommendationsDisplay',
    components: {
      WeeklySchedule
    },
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
      },
      pathId: {
        type: String,
        required: true
      }
    },
    setup(props) {
      const recommendations = ref(null);
      const loading = ref(true);
      const error = ref(null);
      
      const hasAdditionalRecommendations = computed(() => {
        if (!recommendations.value || !recommendations.value.additional_recommendations) {
          return false;
        }
        
        const additionalRecs = recommendations.value.additional_recommendations;
        return (
          (additionalRecs.career_preparation && additionalRecs.career_preparation.length > 0) ||
          (additionalRecs.extracurricular_activities && additionalRecs.extracurricular_activities.length > 0) ||
          (additionalRecs.internships && additionalRecs.internships.length > 0)
        );
      });
      
      const fetchRecommendations = async () => {
      try {
        loading.value = true;
        error.value = null;
        
        // Get the path data using the pathId
        const response = await courseConnectService.getPath(props.pathId);
        
        // Parse the response
        let recommendation = response.response;
        if (typeof recommendation === 'string') {
          try {
            recommendation = JSON.parse(recommendation);
          } catch (e) {
            console.error('Error parsing recommendation:', e);
          }
        }
        
        recommendations.value = recommendation;
      } catch (err) {
        console.error('Error fetching recommendations:', err);
        error.value = 'Failed to generate recommendations. Please try again later.';
      } finally {
        loading.value = false;
      }
    };
    
    // Watch for changes in pathId
    watch(() => props.pathId, () => {
      if (props.pathId) {
        fetchRecommendations();
      }
    }, { immediate: true });
    
    // Keep your existing formatting methods
    const formatYearTitle = (yearKey) => {
      return yearKey.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    };
    
    const formatSemesterTitle = (semesterKey) => {
      return semesterKey.charAt(0).toUpperCase() + semesterKey.slice(1);
    };
    
    const printPlan = () => {
      window.print();
    };
    
    const savePlan = () => {
      // TODO: Implement save functionality
      alert('Plan saved successfully!');
    };
      
      onMounted(fetchRecommendations);
      
      return {
        recommendations,
        loading,
        error,
        hasAdditionalRecommendations,
        fetchRecommendations,
        formatYearTitle,
        formatSemesterTitle,
        printPlan,
        savePlan
      };
    }
  }
  </script>
  
  <style scoped>
  .recommendations-container {
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    padding: 30px;
    margin-top: 30px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
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
  
  .error-container {
    text-align: center;
    padding: 30px;
    color: #ff5252;
  }
  
  .recommendations-header {
    margin-bottom: 30px;
    border-bottom: 1px solid rgba(255, 219, 0, 0.3);
    padding-bottom: 20px;
  }
  
  .program-info {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 15px;
  }
  
  .info-item {
    display: flex;
    align-items: center;
  }
  
  .label {
    font-weight: bold;
    margin-right: 8px;
    color: rgba(255, 255, 255, 0.7);
  }
  
  .value {
    color: #ffdb00;
    font-weight: 500;
  }
  
  .plan-container {
    margin-bottom: 30px;
  }
  
  .plan-description {
    font-style: italic;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 20px;
  }
  
  .year-container {
    margin-bottom: 40px;
  }
  
  .year-container h4 {
    border-bottom: 1px solid rgba(255, 219, 0, 0.3);
    padding-bottom: 8px;
    margin-bottom: 15px;
  }
  
  .semester-tables {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
  }
  
  .semester-table {
    flex: 1;
    min-width: 300px;
  }
  
  .semester-table h5 {
    margin-bottom: 10px;
    color: #ffdb00;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  th {
    background-color: rgba(255, 219, 0, 0.1);
    color: #ffdb00;
    font-weight: bold;
  }
  
  .credits {
    text-align: center;
  }
  
  .total-row {
    background-color: rgba(255, 255, 255, 0.05);
  }
  
  .additional-recommendations {
    margin-bottom: 30px;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.03);
    border-radius: 8px;
  }
  
  .recommendation-section {
    margin-bottom: 20px;
  }
  
  .recommendation-section h4 {
    color: #ffdb00;
    margin-bottom: 10px;
  }
  
  .recommendation-section ul {
    padding-left: 20px;
  }
  
  .recommendation-section li {
    margin-bottom: 5px;
  }
  
  .program-notes {
    margin-bottom: 30px;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.03);
    border-radius: 8px;
  }
  
  .program-notes ul {
    padding-left: 20px;
  }
  
  .program-notes li {
    margin-bottom: 8px;
  }
  
  .actions {
    display: flex;
    gap: 15px;
    justify-content: center;
    margin-top: 30px;
  }
  
  .btn {
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s;
  }
  
  .btn-primary {
    background-color: #ffdb00;
    color: #080036;
    border: none;
  }
  
  .btn-primary:hover {
    background-color: #e6c500;
  }
  
  .btn-secondary {
    background-color: transparent;
    border: 1px solid #ffdb00;
    color: #ffdb00;
  }
  
  .btn-secondary:hover {
    background-color: rgba(255, 219, 0, 0.1);
  }

  .course-name {
    color: #ffffff !important;
  }
  
  @media print {
    .actions {
      display: none;
    }
    
    .recommendations-container {
      box-shadow: none;
      padding: 0;
    }
  }
  </style>
  