import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const signUp = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, userData);

    if (response.data && response.data.token) {
      localStorage.setItem('jwtToken', response.data.token);

      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, userData);

    if (response.data && response.data.token) {
      localStorage.setItem('jwtToken', response.data.token);

      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};
