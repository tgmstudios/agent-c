<template>
    <div class="planner-form">
      <h1>Course Planner</h1>
      <form @submit.prevent="submitForm">
        <FileUploader 
          @file-selected="handleFileUpload"
          @file-removed="handleFileRemove"
        />
        
        <MajorMinorSelector
          v-model:major="major"
          v-model:minors="minors"
          v-model:credits="credits"
          v-model:comments="comments"
        />
        
        <button type="submit" class="btn" :disabled="!isFormValid">
          Generate Recommendations
        </button>
      </form>
      

      <CourseRecommendations
        v-if="showRecommendations"
        :major="major"
        :minors="minors"
        :transcript="transcript"
        :credits="credits"
        :comments="comments"
      />
      <div v-if="apiError" class="error-message api-error">
        {{ apiError }}
        <button @click="retryApiCall" class="btn-retry">Retry</button>
      </div>

      <CourseRecommendationsDisplay
      v-if="showRecommendations"
      :major="major"
      :minors="minors"
      :transcript="transcript"
      :credits="credits"
      :comments="comments"
    />
    </div>
</template>
  
<script>
  import { ref, computed, onMounted } from 'vue';
  import FileUploader from '@/components/FileUploader.vue';
  import MajorMinorSelector from '@/components/MajorMinorSelector.vue';
  import CourseRecommendations from '@/components/CourseRecommendations.vue';
  import agentCService from '@/services/agentCService';
  import CourseRecommendationsDisplay from '@/components/CourseRecommendationsDisplay.vue';
  
  export default {
    name: 'PlannerForm',
    components: {
      FileUploader,
      MajorMinorSelector,
      CourseRecommendations,
      CourseRecommendationsDisplay
    },
    setup() {
      const transcript = ref(null);
      const major = ref('');
      const minors = ref([]);
      const credits = ref();
      const showRecommendations = ref(false);
      const comments = ref('');
  
      const isFormValid = computed(() => {
        return transcript.value && major.value && credits.value;
      });
  
  
      const handleFileUpload = (file) => {
        transcript.value = file;

        // TODO: Process the file (e.g., send to backend for parsing)
      };
  
      const handleFileRemove = () => {
        transcript.value = null;
      };
  
      const submitForm = async () => {
        if (isFormValid.value) {
          try {
            // Update user preferences
            await agentCService.updatePreferences({
              majors: [major.value],
              minors: minors.value,
              // Add other preferences as needed
            });
            
            // Show recommendations
            showRecommendations.value = true;
          } catch (error) {
            console.error('Error submitting form:', error);
            // Handle error
          }
        }
      };

      onMounted(async () => {
        try {
          // Ensure we have a session ID
          await agentCService.getSessionId();
          
          // Restore any saved state if needed
          const savedTranscript = localStorage.getItem('transcript');
          if (savedTranscript) {
            transcript.value = JSON.parse(savedTranscript);
          }
          
          // Similar for other form fields...
        } catch (error) {
          console.error('Failed to initialize session:', error);
        }
      });
  
      return {
        transcript,
        major,
        minors,
        showRecommendations,
        isFormValid,
        credits,
        comments,
        handleFileUpload,
        handleFileRemove,
        submitForm
      };
    }
  }
</script>
  
<style scoped>
.planner-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  margin-bottom: 30px;
  color: #ffffff;
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.btn {
  background-color: #00ff59;
  color: #080036;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
  margin-top: 20px;
}

.btn:hover {
  background-color: #ffffff;
}

.btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>

  