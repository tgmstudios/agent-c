import api from './api';

export const getCourseRecommendations = async (major, minors, transcript) => {
  try {
    const response = await api.post('/recommendations', {
      major,
      minors,
      transcript
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching course recommendations:', error);
    throw error;
  }
};

// TODO: Add more course-related API calls as needed
