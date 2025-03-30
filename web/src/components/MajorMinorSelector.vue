<template>
  <div class="major-minor-selector">
    <!-- College Selection -->
    <div class="form-group">
      <label for="college">College *</label>
      <select 
        id="college" 
        v-model="selectedCollege" 
        class="form-control"
        :class="{ 'is-invalid': collegeError }"
        @change="onCollegeChange"
        style="max-width: 500px;"
        :disabled="loadingColleges"
      >
        <option value="" disabled>{{ loadingColleges ? 'Loading colleges...' : 'Select your college' }}</option>
        <option 
          v-for="college in availableColleges" 
          :key="college"
          :value="college"
        >
          {{ college }}
        </option>
      </select>
      <div v-if="collegeError" class="error-message">
        {{ collegeError }}
      </div>
    </div>

    <!-- Major Selection -->
    <div class="form-group">
      <label for="major">Major *</label>
      <select 
        id="major" 
        v-model="selectedMajor" 
        class="form-control"
        :class="{ 'is-invalid': majorError }"
        @change="onMajorChange"
        :disabled="!selectedCollege || loadingMajors"
        style="max-width: 500px;"
      >
        <option value="" disabled>{{ getMajorPlaceholder() }}</option>
        <option 
          v-for="major in availableMajors" 
          :key="major"
          :value="major"
        >
          {{ major }}
        </option>
      </select>
      <div v-if="majorError" class="error-message">
        {{ majorError }}
      </div>
    </div>

    <!-- Minor Selection -->
    <div class="form-group">
      <label for="minor">Minor(s)</label>
      <div class="minor-selection">
        <div 
          v-for="(minor, index) in selectedMinors" 
          :key="index" 
          class="selected-minor"
        >
          <select 
            v-model="selectedMinors[index]" 
            class="form-control"
            @change="onMinorChange"
            :disabled="!selectedCollege || loadingMinors"
          >
            <option value="" disabled>{{ loadingMinors ? 'Loading minors...' : 'Select a minor' }}</option>
            <option 
              v-for="minorOption in availableMinors" 
              :key="minorOption"
              :value="minorOption"
              :disabled="isMinorSelected(minorOption) && selectedMinors[index] !== minorOption"
            >
              {{ minorOption }}
            </option>
          </select>
          <button 
            v-show="selectedMinors[index]"
            type="button" 
            class="btn-remove-minor" 
            @click="removeMinor(index)"
          >
            <i class="fas fa-times"></i> Remove
          </button>
        </div>
      </div>
      
      <button 
        v-if="canAddMoreMinors" 
        type="button" 
        class="btn-add-minor" 
        @click="addMinor"
      >
        <i class="fas fa-plus"></i> Add Minor
      </button>
      
      <div v-if="minorError" class="error-message">
        {{ minorError }}
      </div>
    </div>

    <!--Credits dropdown-->
    <div class="form-group">
      <label for="credits">Desired Credits per Semester *</label>
      <select 
        id="credits" 
        v-model="selectedCredits" 
        class="form-control"
        :class="{ 'is-invalid': creditsError }"
        @change="onCreditsChange"
      >
        <option value="" disabled>Select credit range</option>
        <option value="12-15">12-15 credits</option>
        <option value="15-17">15-17 credits</option>
        <option value="17-20">17-20 credits</option>
        <option value="20+">20+ credits</option>
      </select>
      <div v-if="creditsError" class="error-message">
        {{ creditsError }}
      </div>
    </div>

    <!--Comments Box-->
    <div class="form-group">
      <label for="comments">Additional Comments (Optional)</label>
      <textarea
        id="comments"
        v-model="additionalComments"
        class="form-control"
        placeholder="Enter any specific requirements or preferences for your schedule..."
        rows="3"
        style="max-width: 500px;"
      ></textarea>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue';
import agentCService from '../services/agentCService';

export default {
  name: 'MajorMinorSelector',
  props: {
    maxMinors: {
      type: Number,
      default: 3
    }
  },
  emits: ['update:major', 'update:minors','update:credits','update:comments'],
  
  setup(props, { emit }) {
    // State variables
    const selectedCollege = ref('');
    const selectedMajor = ref('');
    const selectedMinors = ref([]);
    const collegeError = ref('');
    const majorError = ref('');
    const minorError = ref('');
    const selectedCredits = ref('');
    const creditsError = ref('');
    const additionalComments = ref('');
    
    // API data
    const availableColleges = ref([]);
    const availableMajors = ref([]);
    const availableMinors = ref([]);
    
    // Loading states
    const loadingColleges = ref(true);
    const loadingMajors = ref(false);
    const loadingMinors = ref(false);
    
    // Fetch colleges on component mount
    onMounted(async () => {
      try {
        loadingColleges.value = true;
        const colleges = await agentCService.getColleges();
        availableColleges.value = colleges;
      } catch (error) {
        collegeError.value = 'Failed to load colleges. Please try again.';
      } finally {
        loadingColleges.value = false;
      }
    });
    
    // Fetch majors and minors when college is selected
    const fetchMajorsAndMinors = async () => {
      if (!selectedCollege.value) return;
      
      try {
        loadingMajors.value = true;
        loadingMinors.value = true;
        
        const { majors, minors } = await agentCService.getMajorsAndMinors(selectedCollege.value);
        availableMajors.value = majors || [];
        availableMinors.value = minors || [];
      } catch (error) {
        majorError.value = 'Failed to load majors and minors. Please try again.';
      } finally {
        loadingMajors.value = false;
        loadingMinors.value = false;
      }
    };
    
    // Handle college change
    const onCollegeChange = () => {
      collegeError.value = '';
      selectedMajor.value = '';
      selectedMinors.value = [''];
      
      fetchMajorsAndMinors();
    };
    
    // Get placeholder text for major dropdown
    const getMajorPlaceholder = () => {
      if (loadingMajors.value) return 'Loading majors...';
      if (!selectedCollege.value) return 'Please select a college first';
      return 'Select your major';
    };
    
    // Check if a minor is already selected
    const isMinorSelected = (minorId) => {
      return selectedMinors.value.includes(minorId);
    };
    
    // Check if user can add more minors
    const canAddMoreMinors = computed(() => {
      return selectedMinors.value.length < props.maxMinors;
    });
    
    // Handle major change
    const onMajorChange = () => {
      majorError.value = '';
      emit('update:major', selectedMajor.value);
    };
    
    // Handle minor change
    const onMinorChange = () => {
      minorError.value = '';
      
      // Filter out empty values
      const validMinors = selectedMinors.value.filter(minor => minor);
      
      emit('update:minors', validMinors);
    };
    
    // Add a new minor selection
    const addMinor = () => {
      if (selectedMinors.value.length < props.maxMinors) {
        selectedMinors.value.push('');
      } else {
        minorError.value = `You can select a maximum of ${props.maxMinors} minors.`;
      }
    };
    
    // Remove a minor selection
    const removeMinor = (index) => {
      selectedMinors.value.splice(index, 1);
      onMinorChange();
    };
    
    // Initialize with one empty minor selection
    if (selectedMinors.value.length === 0) {
      selectedMinors.value.push('');
    }
    
    // Validate selections
    const validate = () => {
      let isValid = true;
      
      if (!selectedCollege.value) {
        collegeError.value = 'Please select a college.';
        isValid = false;
      }
      
      if (!selectedMajor.value) {
        majorError.value = 'Please select a major.';
        isValid = false;
      }

      if (!selectedCredits.value) {
        creditsError.value = 'Please select desired credits.';
        isValid = false;
      }
      
      return isValid;
    };

    const onCreditsChange = () => {
      creditsError.value = '';
      emit('update:credits', selectedCredits.value);
    };
    
    // Watch for changes in selections and validate
    watch([selectedCollege, selectedMajor, selectedMinors, selectedCredits], () => {
      validate();
    });

    watch(additionalComments, (newValue) => {
      emit('update:comments', newValue);
    });

    return {
      // State
      selectedCollege,
      selectedMajor,
      selectedMinors,
      collegeError,
      majorError,
      minorError,
      
      // Data
      availableColleges,
      availableMajors,
      availableMinors,
      
      // Loading states
      loadingColleges,
      loadingMajors,
      loadingMinors,
      
      // Methods
      onCollegeChange,
      onMajorChange,
      onMinorChange,
      addMinor,
      removeMinor,
      isMinorSelected,
      validate,
      getMajorPlaceholder,
      
      // Computed
      canAddMoreMinors,

      //credits
      selectedCredits,
      creditsError,
      onCreditsChange,

      //comments
      additionalComments,
    };
  }
}
</script>


<style scoped>
.major-minor-selector {
  color:#ffffff;
  margin-bottom: 30px;
}

.form-control{
  color: #000000;
  border-color: #000000;
  background-color:#ffffff;
  width: 300px;
}

.minor-selection {
  color:#ff5252;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
  width: 300px;
}

.selected-minor {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.btn-remove-minor {
  background-color: transparent;
  border: none;
  color: #ff5252;
  cursor: pointer;
  font-size: 18px;
  margin-left: 10px;
  padding: 5px;
}

.btn-remove-minor:hover {
  background-color: rgba(255, 82, 82, 0.2); /* Add this line */
}

.btn-add-minor {
  background-color: rgba(17, 0, 255, 0.1);
  border: 1px solid #000000;
  color: #ffffff;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-add-minor:hover {
  background-color: rgba(17, 0, 255, 0.19);
}

textarea.form-control {
  resize: vertical; /* Allow vertical resizing only */
  min-height: 80px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #000000;
}

textarea.form-control:focus {
  background-color: rgba(255, 255, 255, 0.15);
}

.form-text.text-muted {
  color: rgba(255, 255, 255, 0.7) !important;
  font-size: 0.85rem;
  margin-top: 5px;
}


/* TODO: Customize these styles to match your university's branding */
</style>

  