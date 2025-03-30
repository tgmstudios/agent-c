<template>
    <div class="weekly-schedule-container">
      <h3>Fall 2025 Weekly Schedule</h3>
      
      <div v-if="!showSchedule" class="schedule-button-container">
        <button @click="loadSchedule" class="btn btn-primary">
          Show Weekly Schedule
        </button>
      </div>
      
      <div v-if="loading" class="loading-container">
        <div class="spinner"></div>
        <p>Loading your weekly schedule...</p>
      </div>
      
      <div v-else-if="error" class="error-container">
        <p>{{ error }}</p>
        <button @click="loadSchedule" class="btn">Try Again</button>
      </div>
      
      <div v-else-if="showSchedule && schedule" class="calendar-container">
        <div class="time-labels">
          <div class="time-label" v-for="hour in hours" :key="hour">
            {{ formatHour(hour) }}
          </div>
        </div>
        
        <div class="days-container">
          <div class="day-column" v-for="day in days" :key="day">
            <div class="day-header">{{ day }}</div>
            <div class="day-schedule">
              <div class="hour-row" v-for="hour in hours" :key="hour"></div>
              
              <div 
                v-for="(course, index) in getCoursesForDay(day)" 
                :key="`${day}-${course.code}-${index}`"
                class="course-block"
                :style="getCourseStyle(course, day)"
              >
                <div class="course-name">{{ course.code }}: {{ course.title }}</div>
                <div class="course-time">{{ formatCourseTime(course) }}</div>
                <div class="course-location" v-if="course.schedule && course.schedule.location">
                  {{ course.schedule.location }}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import courseConnectService from '@/services/courseConnectService';
  
  export default {
    name: 'WeeklySchedule',
    props: {
      pathId: {
        type: String,
        required: true
      }
    },
    setup(props) {
      const schedule = ref(null);
      const loading = ref(false);
      const error = ref(null);
      const showSchedule = ref(false);
      
      // Days of the week
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
      
      // Hours from 8am to 6pm
      const hours = Array.from({ length: 11 }, (_, i) => i + 8);
      
      // Course colors - will be assigned to courses
      const courseColors = [
        '#4285F4', // Blue
        '#EA4335', // Red
        '#FBBC05', // Yellow
        '#34A853', // Green
        '#8F00FF', // Purple
        '#FF6D01', // Orange
        '#00BCD4', // Cyan
        '#FF4081', // Pink
        '#009688', // Teal
        '#795548'  // Brown
      ];
      
      // Map to store course colors
      const courseColorMap = ref({});
      
      // Format hour for display (8 -> 8:00 AM)
      const formatHour = (hour) => {
        const suffix = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : hour;
        return `${displayHour}:00 ${suffix}`;
      };
      
      // Format course time for display
      const formatCourseTime = (course) => {
        if (!course.schedule || !course.schedule.time) {
          return '';
        }
        
        return course.schedule.time;
      };
      
      // Get courses for a specific day
      const getCoursesForDay = (day) => {
        if (!schedule.value || !schedule.value.semester_schedule || !schedule.value.semester_schedule.courses) {
          return [];
        }
        
        return schedule.value.semester_schedule.courses.filter(course => 
          course.schedule && course.schedule.days && 
          course.schedule.days.includes(day)
        );
      }
      
      // Get course block style (position, height, color)
      const getCourseStyle = (course, day) => {
        if (!course.schedule || !course.schedule.time) {
          return {};
        }
        
        const timeString = course.schedule.time;
        const [startTime, endTime] = timeString.split(' - ');
        
        // Parse time strings to get hours and minutes
        const startParts = startTime.match(/(\d+):(\d+)\s*([AP]M)/i);
        const endParts = endTime.match(/(\d+):(\d+)\s*([AP]M)/i);
        
        if (!startParts || !endParts) {
          return {};
        }
        
        // Convert to 24-hour format
        let startHour = parseInt(startParts[1]);
        if (startParts[3].toUpperCase() === 'PM' && startHour < 12) startHour += 12;
        if (startParts[3].toUpperCase() === 'AM' && startHour === 12) startHour = 0;
        
        let endHour = parseInt(endParts[1]);
        if (endParts[3].toUpperCase() === 'PM' && endHour < 12) endHour += 12;
        if (endParts[3].toUpperCase() === 'AM' && endHour === 12) endHour = 0;
        
        const startMinutes = parseInt(startParts[2]);
        const endMinutes = parseInt(endParts[2]);
        
        // Calculate position and height
        const startTime24 = startHour + (startMinutes / 60);
        const endTime24 = endHour + (endMinutes / 60);
        
        const top = ((startTime24 - 8) / 10) * 100; // 8am is the start, 10 hours total
        const height = ((endTime24 - startTime24) / 10) * 100; // Height based on duration
        
        // Assign a color if not already assigned
        if (!courseColorMap.value[course.code]) {
          const colorIndex = Object.keys(courseColorMap.value).length % courseColors.length;
          courseColorMap.value[course.code] = courseColors[colorIndex];
        }
        
        return {
          top: `${top}%`,
          height: `${height}%`,
          backgroundColor: courseColorMap.value[course.code]
        };
      };
      
      // Load the schedule data from API
      const loadSchedule = async () => {
        try {
          loading.value = true;
          error.value = null;
          showSchedule.value = true;
          
          // Get the schedule for Fall 2025
          const response = await courseConnectService.getSemesterSchedule(
            props.pathId,
            1, // First year
            'fall'
          );
          
          // Process the schedule data
          schedule.value = response;
          
        } catch (err) {
          console.error('Error loading schedule:', err);
          error.value = 'Failed to load your weekly schedule. Please try again.';
        } finally {
          loading.value = false;
        }
      };

      
      // Generate schedule information for a course if not provided by API
      const generateScheduleForCourse = (course) => {
        // This is a fallback if the API doesn't provide schedule information
        // In a real application, this would ideally come from the API
        
        // Randomly determine if course is MWF or TTh
        const pattern = Math.random() > 0.5 ? 'MWF' : 'TTh';
        
        // Generate a random start time between 8am and 4pm
        const startHour = 8 + Math.floor(Math.random() * 8);
        const startMinutes = Math.random() > 0.5 ? 0 : 30;
        
        // Class duration (1 to 2 hours)
        const durationHours = pattern === 'MWF' ? 1 : 1.5;
        
        // Calculate end time
        const endHour = startHour + Math.floor(durationHours);
        const endMinutes = (startMinutes + (durationHours % 1) * 60) % 60;
        
        // Format times
        const startAmPm = startHour >= 12 ? 'PM' : 'AM';
        const endAmPm = endHour >= 12 ? 'PM' : 'AM';
        const displayStartHour = startHour > 12 ? startHour - 12 : startHour;
        const displayEndHour = endHour > 12 ? endHour - 12 : endHour;
        
        const startTime = `${displayStartHour}:${startMinutes === 0 ? '00' : startMinutes} ${startAmPm}`;
        const endTime = `${displayEndHour}:${endMinutes === 0 ? '00' : endMinutes} ${endAmPm}`;
        
        // Create schedule object
        const schedule = {};
        
        if (pattern === 'MWF') {
          schedule.monday = { start: startTime, end: endTime };
          schedule.wednesday = { start: startTime, end: endTime };
          schedule.friday = { start: startTime, end: endTime };
        } else {
          schedule.tuesday = { start: startTime, end: endTime };
          schedule.thursday = { start: startTime, end: endTime };
        }
        
        return schedule;
      };
      
      return {
        schedule,
        loading,
        error,
        showSchedule,
        days,
        hours,
        formatHour,
        formatCourseTime,
        getCoursesForDay,
        getCourseStyle,
        loadSchedule
      };
    }
  }
  </script>
  
  <style scoped>
  .weekly-schedule-container {
    margin-top: 40px;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  h3 {
    margin-bottom: 20px;
    color: #ffdb00;
    text-align: center;
  }
  
  .schedule-button-container {
    display: flex;
    justify-content: center;
    margin: 30px 0;
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
  
  .calendar-container {
    display: flex;
    height: 600px;
    margin-top: 20px;
  }
  
  .time-labels {
    width: 80px;
    display: flex;
    flex-direction: column;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .time-label {
    height: 54.5px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    padding-right: 10px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
  }
  
  .days-container {
    display: flex;
    flex: 1;
  }
  
  .day-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .day-column:last-child {
    border-right: none;
  }
  
  .day-header {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    background-color: rgba(255, 219, 0, 0.1);
    color: #ffdb00;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .day-schedule {
    flex: 1;
    position: relative;
  }
  
  .hour-row {
    height: 54.5px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }
  
  .course-block {
    position: absolute;
    left: 2px;
    right: 2px;
    padding: 5px;
    border-radius: 4px;
    color: #ffffff;
    font-size: 12px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
  
  .course-name {
    font-weight: bold;
    margin-bottom: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .course-time {
    font-size: 10px;
    opacity: 0.9;
  }
  
  .course-location {
    font-size: 10px;
    opacity: 0.8;
    margin-top: 2px;
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
  </style>  