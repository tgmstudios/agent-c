// src/services/courseConnectService.js
import axios from 'axios';

const API_BASE_URL = 'https://courseconnect.study/api/v1';
let sessionId = null;

// Initialize session
const initSession = async (forceNew = false) => {
  try {
    // If forceNew is true or no session exists, create a new one
    if (forceNew || !sessionId) {
      const response = await axios.get(`${API_BASE_URL}/session`);
      sessionId = response.data.session_id;
      
      // Store in cookie with expiration (30 days)
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 30);
      document.cookie = `session_id=${sessionId}; expires=${expirationDate.toUTCString()}; path=/`;
      
      return sessionId;
    }
    
    return sessionId;
  } catch (error) {
    console.error('Error initializing session:', error);
    throw error;
  }
};

// Get session ID (create one if it doesn't exist)
const getSessionId = async () => {
  if (!sessionId) {
    // Try to get from cookie first
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('session_id='))
      ?.split('=')[1];
      
    if (cookieValue) {
      sessionId = cookieValue;
    } else {
      // If not in cookie, create new session
      return await initSession();
    }
  }
  return sessionId;
};

// Get all colleges
const getColleges = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/programs`);
    return response.data;
  } catch (error) {
    console.error('Error fetching colleges:', error);
    throw error;
  }
};

// Get majors and minors for a specific college
const getMajorsAndMinors = async (collegeName) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/programs/${encodeURIComponent(collegeName)}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching majors and minors for ${collegeName}:`, error);
    throw error;
  }
};

// Update user preferences
const updatePreferences = async (preferences) => {
  try {
    const sid = await getSessionId();
    const response = await axios.put(
      `${API_BASE_URL}/user/preferences`,
      preferences,
      {
        headers: {
          'session-id': sid
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating preferences:', error);
    throw error;
  }
};

// Get user preferences
const getPreferences = async () => {
  try {
    const sid = await getSessionId();
    const response = await axios.get(
      `${API_BASE_URL}/user/preferences`,
      {
        headers: {
          'session-id': sid
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error getting preferences:', error);
    throw error;
  }
};

// Get user data
const getUserData = async () => {
  try {
    const sid = await getSessionId();
    const response = await axios.get(
      `${API_BASE_URL}/user`,
      {
        headers: {
          'session-id': sid
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error getting user data:', error);
    throw error;
  }
};

// Update user
const updateUser = async (userData) => {
  try {
    const sid = await getSessionId();
    const response = await axios.put(
      `${API_BASE_URL}/user`,
      userData,
      {
        headers: {
          'session-id': sid
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Get recommended path
const getRecommendedPath = async () => {
  try {
    const sid = await getSessionId();
    const response = await axios.get(
      `${API_BASE_URL}/path`,
      {
        headers: {
          'session-id': sid
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error getting recommended path:', error);
    throw error;
  }
};

// Get paths for session
const getPathsForSession = async () => {
  try {
    const sid = await getSessionId();
    const response = await axios.get(
      `${API_BASE_URL}/path/session`,
      {
        headers: {
          'session-id': sid
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error getting paths for session:', error);
    throw error;
  }
};

// Get specific path by ID
const getPath = async (pathId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/path/${pathId}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting path ${pathId}:`, error);
    throw error;
  }
};

// Upload transcript
const uploadTranscript = async (file) => {
  try {
    const sid = await getSessionId();
    
    const formData = new FormData();
    formData.append('transcript', file);
    
    const response = await axios.post(
      `${API_BASE_URL}/user/transcript`,
      formData,
      {
        headers: {
          'session-id': sid,
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error uploading transcript:', error);
    throw error;
  }
};

const getSemesterSchedule = async (pathId, year, semester) => {
    try {
      const sid = await getSessionId();
      const response = await axios.get(
        `${API_BASE_URL}/schedule`,
        {
          headers: {
            'session-id': sid
          },
          params: {
            path_id: pathId,
            year: year,
            semester: semester
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error getting semester schedule:', error);
      throw error;
    }
  };

export default {
  initSession,
  getSessionId,
  getColleges,
  getMajorsAndMinors,
  updatePreferences,
  getPreferences,
  getUserData,
  updateUser,
  getRecommendedPath,
  getPathsForSession,
  getPath,
  uploadTranscript,
  getSemesterSchedule
};
