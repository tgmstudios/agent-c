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
      />
      <p>hell0</p>
    </div>
</template>
  
<script>
  import { ref, computed } from 'vue';
  import FileUploader from '@/components/FileUploader.vue';
  import MajorMinorSelector from '@/components/MajorMinorSelector.vue';
  import CourseRecommendations from '@/components/CourseRecommendations.vue';
  
  export default {
    name: 'PlannerForm',
    components: {
      FileUploader,
      MajorMinorSelector,
      CourseRecommendations
    },
    setup() {
      const transcript = ref(null);
      const major = ref('');
      const minors = ref([]);
      const showRecommendations = ref(false);
  
      const isFormValid = computed(() => {
        return transcript.value && major.value;
      });
  
      const handleFileUpload = (file) => {
        transcript.value = file;

        // TODO: Process the file (e.g., send to backend for parsing)
      };
  
      const handleFileRemove = () => {
        transcript.value = null;
      };
  
      const submitForm = () => {
        if (isFormValid.value) {
          showRecommendations.value = true;
          // TODO: Handle form submission (e.g., send data to backend)
        }
      };
  
      return {
        transcript,
        major,
        minors,
        showRecommendations,
        isFormValid,
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

  