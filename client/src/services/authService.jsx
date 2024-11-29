import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { accessToken, user } = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', accessToken);
      return { user, error: null };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      return { user: null, error: errorMessage };
    }
  },

  signup: async (userData) => {
    try {
      await axios.post(`${API_URL}/auth/register`, userData);
      return { error: null };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Signup failed';
      return { error: errorMessage };
    }
  },

  verifyOtp: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/verify-otp`, userData);
      const { accessToken, user } = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', accessToken);
      return { user, error: null };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'OTP verification failed';
      return { user: null, error: errorMessage };
    }
  },

  logout: async () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  requestPasswordReset: async (email) => {
    try {
      const response = await authService.requestPasswordReset(email);
      if (response.error) {
        return { error: response.message };
      }
      return { error: null }; // OTP sent successfully
    } catch (error) {
      return { error: 'Error requesting OTP' };
    }
  },

  // New function to reset password using OTP
  resetPassword: async (email, otp, newPassword) => {
    try {
      const response = await authService.resetPassword(email, otp, newPassword);
      if (response.error) {
        return { error: response.message };
      }
      return { error: null }; // Password reset successfully
    } catch (error) {
      return { error: 'Error resetting password' };
    }
  }

};

export default authService;