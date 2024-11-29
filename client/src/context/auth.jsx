import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [emailForVerification, setEmailForVerification] = useState('');
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = authService.getCurrentUser();
      const storedToken = authService.getToken();
      setCurrentUser(user);
      setToken(storedToken);
      setLoading(false);
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    const { user, error } = await authService.login(email, password);
    if (user) {
      setCurrentUser(user);
      setToken(authService.getToken());
    }
    return { user, error };
  };

  const signup = async (userData) => {
    const { error } = await authService.signup(userData);
    if (!error) {
      setEmailForVerification(userData.email);
    }
    return { error };
  };

  const verifyOtp = async (userData) => {
    const { user, error } = await authService.verifyOtp(userData);
    if (user) {
      setCurrentUser(user);
      setToken(authService.getToken());
    }
    return { user, error };
  };

  const logout = async () => {
    await authService.logout();
    setCurrentUser(null);
    setToken(null);
  };

  const requestPasswordReset = async (email) => {
    try {
      const response = await authService.requestPasswordReset(email);
      return { error: null }; // OTP sent successfully
    } catch (error) {
      return { error: error.response?.data?.message || 'Error requesting OTP' };
    }
  };

  const resetPassword = async (email, otp, newPassword) => {
    try {
      const response = await authService.resetPassword(email, otp, newPassword);
      return { error: null }; // Password reset successfully
    } catch (error) {
      return { error: error.response?.data?.message || 'Error resetting password' };
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, token, loading, login, signup, verifyOtp, emailForVerification, logout ,  requestPasswordReset,
      resetPassword,}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

