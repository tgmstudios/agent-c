import axios from 'axios';

const API_BASE_URL = 'https://agent-c.tgm.one/api/v1';
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

// Get user data
const getUserData = async () => {
    try {
      const sid = await getSessionId();
      const response = await axios.get(`${API_BASE_URL}/user`, {
        headers: {
          'session-id': sid
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };
  
  // Update user
  const updateUser = async (userData) => {
    try {
      const sid = await getSessionId();
      const response = await axios.put(`${API_BASE_URL}/user`, userData, {
        headers: {
          'session-id': sid
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };
  
  // Get preferences
  const getPreferences = async () => {
    try {
      const sid = await getSessionId();
      const response = await axios.get(`${API_BASE_URL}/user/preferences`, {
        headers: {
          'session-id': sid
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching preferences:', error);
      throw error;
    }
  };

export default {
  initSession,
  getSessionId,
  getColleges,
  getMajorsAndMinors,
  updatePreferences,
  getUserData,
  updateUser,
  getPreferences
};
