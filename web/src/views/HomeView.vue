<template>
  <div class="home-view">
    <div class="welcome-section">
      <h1>Welcome to Course Planner</h1>
      <p class="subtitle">Plan your academic journey with personalized course recommendations</p>
    </div>

    <div class="preferences-card">
      <h2>Tell Us About Yourself</h2>
      <p>Help us personalize your course recommendations by sharing your preferences.</p>

      <form @submit.prevent="savePreferences">
        <!-- Student Name -->
        <div class="form-group">
          <label for="studentName">Your Name</label>
          <input
            type="text"
            id="studentName"
            v-model="studentName"
            class="form-control"
            :class="{ 'is-invalid': nameError }"
            placeholder="Enter your name"
            style="max-width: 500px;"
          />
          <div v-if="nameError" class="error-message">
            {{ nameError }}
          </div>
        </div>

        <!-- Delivery Mode -->
        <div class="form-group">
          <label for="deliveryMode">Class Format</label>
          <select
            id="deliveryMode"
            v-model="deliveryMode"
            class="form-control"
            :class="{ 'is-invalid': deliveryError }"
            style="max-width: 500px;"
          >
            <option value="" disabled>Select class format</option>
            <option value="inperson">In-Person</option>
            <option value="online">Online</option>
            <option value="hybrid">Hybrid (Both)</option>
          </select>
          <div v-if="deliveryError" class="error-message">
            {{ deliveryError }}
          </div>
        </div>

        <!-- Preferred Class Times -->
        <div class="form-group">
          <label>Preferred Class Times</label>
          <div class="checkbox-group">
            <div class="checkbox-item">
              <input 
                type="checkbox" 
                id="morning" 
                v-model="classTimes" 
                value="morning"
              />
              <label for="morning">Morning (8AM - 12PM)</label>
            </div>
            <div class="checkbox-item">
              <input 
                type="checkbox" 
                id="midday" 
                v-model="classTimes" 
                value="midday"
              />
              <label for="midday">Midday (10AM - 3PM)</label>
            </div>
            <div class="checkbox-item">
              <input 
                type="checkbox" 
                id="afternoon" 
                v-model="classTimes" 
                value="afternoon"
              />
              <label for="afternoon">Afternoon (12PM - 5PM)</label>
            </div>
          </div>
          <div v-if="timesError" class="error-message">
            {{ timesError }}
          </div>
        </div>

        <button type="submit" class="btn" :disabled="!isFormValid">
          Save Preferences
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import agentCService from '@/services/agentCService';

export default {
  name: 'HomeView',
  setup() {
    const router = useRouter();
    const studentName = ref('');
    const deliveryMode = ref('');
    const classTimes = ref([]);
    
    // Error states
    const nameError = ref('');
    const deliveryError = ref('');
    const timesError = ref('');
    const apiError = ref('');
    
    // Form validation
    const isFormValid = computed(() => {
      return studentName.value && 
             deliveryMode.value && 
             classTimes.value.length > 0;
    });

    // Initialize session and load saved preferences if available
    onMounted(async () => {
      try {
        // Get or create session ID
        const sessionId = await agentCService.getSessionId();
        
        // Try to load existing user data
        try {
          const userData = await agentCService.getUserData();
          if (userData && userData.name) {
            studentName.value = userData.name;
          }
          
          // Try to load existing preferences
          const preferences = await agentCService.getPreferences();
          if (preferences) {
            if (preferences.delivery && preferences.delivery.length > 0) {
              deliveryMode.value = preferences.delivery[0];
            }
            if (preferences.classTimes && preferences.classTimes.length > 0) {
              classTimes.value = preferences.classTimes;
            }
          }
        } catch (err) {
          // It's okay if we can't load preferences - user might be new
          console.log('No existing preferences found');
        }
      } catch (error) {
        console.error('Error initializing session:', error);
        apiError.value = 'Failed to initialize session. Please try again.';
      }
    });

    // Save user preferences
    const savePreferences = async () => {
      // Reset error messages
      nameError.value = '';
      deliveryError.value = '';
      timesError.value = '';
      apiError.value = '';
      
      // Validate form
      let isValid = true;
      
      if (!studentName.value) {
        nameError.value = 'Please enter your name';
        isValid = false;
      }
      
      if (!deliveryMode.value) {
        deliveryError.value = 'Please select a class format';
        isValid = false;
      }
      
      if (classTimes.value.length === 0) {
        timesError.value = 'Please select at least one preferred class time';
        isValid = false;
      }
      
      if (!isValid) return;
      
      try {
        // Create/update user
        await agentCService.updateUser({
          name: studentName.value
        });
        
        // Save preferences
        await agentCService.updatePreferences({
          delivery: [deliveryMode.value],
          classTimes: classTimes.value
        });
        
        // Navigate to planner
        router.push('/planner');
      } catch (error) {
        console.error('Error saving preferences:', error);
        apiError.value = 'Failed to save preferences. Please try again.';
      }
    };

    return {
      studentName,
      deliveryMode,
      classTimes,
      nameError,
      deliveryError,
      timesError,
      apiError,
      isFormValid,
      savePreferences
    };
  }
}
</script>

<style scoped>
.home-view {
  max-width: 800px;
  margin: 0 auto;
}

.welcome-section {
  text-align: center;
  margin-bottom: 40px;
}

h1 {
  color: #ffffff;
  margin-bottom: 10px;
}

.subtitle {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.2rem;
}

.preferences-card {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #ffffff;
  margin-top: 0;
  margin-bottom: 15px;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #ffffff;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  background-color: rgb(255, 255, 255);
  color: #000000;
  width: 200px;
}

.form-control:focus {
  outline: none;
  border-color: #ffdb00;
  box-shadow: 0 0 0 2px rgba(255, 219, 0, 0.2);
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.checkbox-item {
  display: flex;
  align-items: center;
}

.checkbox-item input[type="checkbox"] {
  margin-right: 10px;
}

.checkbox-item label {
  margin-bottom: 0;
  font-weight: normal;
}

.error-message {
  color: #ff5252;
  font-size: 14px;
  margin-top: 5px;
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
