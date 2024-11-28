import React, { createContext, useState } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user state to store logged in user info
  const [loading, setLoading] = useState(false); // loading state for API requests
  const [error, setError] = useState(null); // error state to handle signup errors

  // Simulated signup function (replace with actual API call)
  const signup = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      // Example signup API call (replace with real backend call)
      // const response = await api.signup(userData); // Un-comment and replace with actual API logic

      // If signup is successful:
      setUser({ email: userData.email });
      return { error: null }; // return success response
    } catch (err) {
      setError('Signup failed. Please try again.');
      return { error: 'Signup failed. Please try again.' }; // handle failure
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signup, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
