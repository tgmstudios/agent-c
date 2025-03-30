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
        
        <button type="submit" class="btn" :disabled="!isFormValid || submitting">
        {{ submitting ? 'Generating...' : 'Generate Recommendations' }}
      </button>
    </form>
    
    <div v-if="apiError" class="error-message api-error">
      {{ apiError }}
      <button @click="retryApiCall" class="btn-retry">Retry</button>
    </div>
  </div>
</template>
  
<script>
  import { ref, computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import FileUploader from '@/components/FileUploader.vue';
  import MajorMinorSelector from '@/components/MajorMinorSelector.vue';
  import courseConnectService from '@/services/courseConnectService';
  import agentCService from '@/services/agentCService';
  
  export default {
    name: 'PlannerForm',
    components: {
      FileUploader,
      MajorMinorSelector,
    },
    setup() {
      const router = useRouter();
      const transcript = ref(null);
      const major = ref('');
      const minors = ref([]);
      const credits = ref('');
      const comments = ref('');
      const showFileError = ref(false);
      const submitting = ref(false);
      const apiError = ref('');
  
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
      // Show errors if form is invalid
      if (!transcript.value) {
        showFileError.value = true;
      }
      
      if (isFormValid.value) {
        try {
          submitting.value = true;
          
          // Update user preferences
          await courseConnectService.updatePreferences({
            majors: [major.value],
            minors: minors.value,
            credits: [credits.value]
          });
          
          // Upload transcript if needed
          // This would be implemented in your courseConnectService
          
          // Generate recommendations
          const pathResponse = await courseConnectService.getRecommendedPath();
          
          // Navigate to the schedule view with the path ID
          router.push(`/schedule`);
        } catch (error) {
          console.error('Error submitting form:', error);
          apiError.value = 'Failed to generate recommendations. Please try again.';
        } finally {
          submitting.value = false;
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
        credits,
        comments,
        showFileError,
        apiError,
        isFormValid,
        submitting,
        handleFileUpload,
        handleFileRemove,
        submitForm,
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

  