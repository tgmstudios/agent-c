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
    <Transition name="fade">
  <div v-if="submitting" class="loading-overlay">
    <div class="loading-container">
      <div class="loading-icon">
        <div class="loading-pulse"></div>
        <div class="loading-circle"></div>
      </div>
      <div class="loading-text">Generating Your Course Plan</div>
      <div class="loading-progress">
        <div class="loading-progress-bar"></div>
      </div>
      <div class="loading-steps">
        <div class="loading-step" :class="{ active: currentStep >= 1, completed: currentStep > 1 }">
          1. Processing transcript data...
        </div>
        <div class="loading-step" :class="{ active: currentStep >= 2, completed: currentStep > 2 }">
          2. Analyzing major requirements...
        </div>
        <div class="loading-step" :class="{ active: currentStep >= 3, completed: currentStep > 3 }">
          3. Finding optimal course paths...
        </div>
        <div class="loading-step" :class="{ active: currentStep >= 4, completed: currentStep > 4 }">
          4. Generating personalized recommendations...
        </div>
      </div>
    </div>
  </div>
</Transition>
    
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
      
const currentStep = ref(1);
  
      const isFormValid = computed(() => {
        return transcript.value && major.value && credits.value;
      });
  
  
      const handleFileUpload = (file) => {
        transcript.value = file;
        // Log to verify file is captured correctly
        console.log("File selected:", file);
      };
  
      const handleFileRemove = () => {
        transcript.value = null;
      };
  
      const submitForm = async () => {
  if (!transcript.value) {
    showFileError.value = true;
    return;
  }
  
  if (isFormValid.value) {
    try {
      submitting.value = true;
      apiError.value = '';
      currentStep.value = 1;
      
      // Step 1: Update user preferences
      await courseConnectService.updatePreferences({
        majors: [major.value],
        minors: minors.value,
        credits: [credits.value]
      });
      
      currentStep.value = 2;
      // Artificial delay to show the animation steps
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Step 2: Upload transcript
      if (transcript.value) {
        await courseConnectService.uploadTranscript(transcript.value);
      }
      
      currentStep.value = 3;
      // Artificial delay to show the animation steps
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Step 3: Generate recommendations
      const pathResponse = await courseConnectService.getRecommendedPath();
      
      currentStep.value = 4;
      // Artificial delay to show the animation steps
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Step 4: Navigate to the schedule view with the path ID
      if (pathResponse && pathResponse.id) {
        router.push(`/schedule/${pathResponse.id}`);
      } else {
        router.push('/schedule');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      apiError.value = 'Failed to generate recommendations. Please try again.';
    } finally {
      submitting.value = false;
      currentStep.value = 1;
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
        currentStep,
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

@keyframes pulse {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(0.98);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes shimmer {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(8, 0, 54, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  text-align: center;
}

.loading-icon {
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
  position: relative;
}

.loading-circle {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 4px solid rgba(0, 255, 89, 0.2);
  border-top: 4px solid #00ff59;
  border-radius: 50%;
  animation: spin 1.5s linear infinite;
}

.loading-pulse {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: rgba(0, 255, 89, 0.2);
  animation: pulse 2s ease-in-out infinite;
}

.loading-text {
  color: #ffffff;
  font-size: 1.5rem;
  margin-bottom: 15px;
}

.loading-progress {
  width: 300px;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 15px;
}

.loading-progress-bar {
  height: 100%;
  width: 100%;
  background: linear-gradient(
    to right,
    rgba(0, 255, 89, 0.2),
    #00ff59,
    rgba(0, 255, 89, 0.2)
  );
  background-size: 468px 8px;
  animation: shimmer 2s linear infinite;
}

.loading-steps {
  color: #ffffff;
  text-align: left;
  width: 100%;
}

.loading-step {
  margin-bottom: 8px;
  opacity: 0.7;
  transition: opacity 0.3s;
}

.loading-step.active {
  opacity: 1;
  color: #00ff59;
}

.loading-step.completed {
  opacity: 0.9;
  text-decoration: line-through;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>

  