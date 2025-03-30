<template>
  <div class="major-minor-selector">
    <div class="form-group">
      <label for="major">Major *</label>
      <select 
        id="major" 
        v-model="selectedMajor" 
        class="form-control"
        :class="{ 'is-invalid': majorError }"
        @change="onMajorChange"
      >
        <option value="" disabled>Select your major</option>
        <option 
          v-for="major in availableMajors" 
          :key="major.id" 
          :value="major.id"
        >
          {{ major.name }}
        </option>
      </select>
      <div v-if="majorError" class="error-message">
        {{ majorError }}
      </div>
    </div>
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
          >
            <option value="" disabled>Select a minor</option>
            <option 
              v-for="minorOption in availableMinorsFiltered" 
              :key="minorOption.id" 
              :value="minorOption.id"
              :disabled="isMinorSelected(minorOption.id) && selectedMinors[index] !== minorOption.id"
            >
              {{ minorOption.name }}
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
</div>

</template>

  
  <script>
  import { ref, computed, watch } from 'vue';
  
  export default {
    name: 'MajorMinorSelector',
    props: {
      // Maximum number of minors a student can select
      maxMinors: {
        type: Number,
        default: 3
      }
    },
    emits: ['update:major', 'update:minors'],
    
    setup(props, { emit }) {
      // Available majors and minors (would typically come from an API)
      // TODO: Replace with actual data from your backend
      const availableMajors = ref([
        { id: 'CS', name: 'Computer Science' },
        { id: 'MATH', name: 'Mathematics' },
        { id: 'BIO', name: 'Biology' },
        { id: 'CHEM', name: 'Chemistry' },
        { id: 'PHYS', name: 'Physics' },
        { id: 'ENG', name: 'English' },
        { id: 'HIST', name: 'History' },
        { id: 'PSYCH', name: 'Psychology' },
        { id: 'ECON', name: 'Economics' },
        { id: 'BUS', name: 'Business Administration' }
      ]);
      
      const availableMinors = ref([
        { id: 'CS_MINOR', name: 'Computer Science' },
        { id: 'MATH_MINOR', name: 'Mathematics' },
        { id: 'BIO_MINOR', name: 'Biology' },
        { id: 'CHEM_MINOR', name: 'Chemistry' },
        { id: 'PHYS_MINOR', name: 'Physics' },
        { id: 'ENG_MINOR', name: 'English' },
        { id: 'HIST_MINOR', name: 'History' },
        { id: 'PSYCH_MINOR', name: 'Psychology' },
        { id: 'ECON_MINOR', name: 'Economics' },
        { id: 'DATA_MINOR', name: 'Data Science' },
        { id: 'STATS_MINOR', name: 'Statistics' },
        { id: 'CYBER_MINOR', name: 'Cybersecurity' }
      ]);
      
      const selectedMajor = ref('');
      const selectedMinors = ref([]);
      const majorError = ref('');
      const minorError = ref('');
      
      // Filter out already selected minors
      const availableMinorsFiltered = computed(() => {
        return availableMinors.value;
      });
      
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
        
        if (!selectedMajor.value) {
          majorError.value = 'Please select a major.';
          isValid = false;
        }
        
        return isValid;
      };
          // Watch for changes in selections and validate
    watch([selectedMajor, selectedMinors], () => {
      validate();
    });

    return {
      availableMajors,
      availableMinorsFiltered,
      selectedMajor,
      selectedMinors,
      majorError,
      minorError,
      canAddMoreMinors,
      onMajorChange,
      onMinorChange,
      addMinor,
      removeMinor,
      isMinorSelected,
      validate
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
}

.minor-selection {
  color:#ff5252;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;
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

/* TODO: Customize these styles to match your university's branding */
</style>

  