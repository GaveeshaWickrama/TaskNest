import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaArrowRight, FaCheck } from 'react-icons/fa';
import InputField from '../../components/InputField'; // Assuming you have a custom InputField component
import ErrorAlert from '../../components/ErrorAlert'; // Assuming you have a custom ErrorAlert component
import LoadingSpinner from '../../components/LoadingSpinner'; // Assuming you have a LoadingSpinner component
import { useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo'; // Assuming you have a Logo component
import { useAuth } from '../../context/auth'; // Import the AuthContext

const PasswordReset = () => {
  // State for form inputs
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reenteredPassword, setReenteredPassword] = useState('');

  // UI state management
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [emailValidated, setEmailValidated] = useState(false); // Track if email is validated
  const navigate = useNavigate();

  // Using AuthContext functions
  const { requestPasswordReset, resetPassword } = useAuth();

  // Function to request OTP and validate email
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setError(null);  // Reset errors    
    setLoading(true);  // Start loading spinner

    try {
      const result = await requestPasswordReset({email}); // Use the context function

      // Check the response for email validation
      if (!result.error) {
        // Email is valid, OTP sent
        setEmailValidated(true); // Set email validated flag
      } else {
        // Email is invalid, show error and do not proceed
        setError(result.error); // Use result.message to show exact error
      }
    } catch (err) {
      // Handle unexpected errors
      setError('An error occurred while requesting OTP.');
    } finally {
      setLoading(false); // Stop loading spinner when the request finishes
    }
  };

  // Function to reset the password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(null); // Reset any previous errors
    setLoading(true); // Start the loading spinner
  
    // Validate password match
    if (newPassword !== reenteredPassword) {
      setError('Passwords do not match.');
      setLoading(false); // Stop loading spinner
      return;
    }
  
    try {
      // Call the resetPassword function from context
      const result = await resetPassword(email, otp, newPassword);
  
      // Check the response: if error is false, proceed to login page, otherwise display error
      if (result && result.error === false) {
        // Redirect to login page after successful password reset
        navigate('/login');
      } else {
        // If error is true or result is malformed, show the error message
        setError(result?.message || 'An unexpected error occurred.');
      }
    } catch (err) {
      // Handle unexpected errors
      setError('An error occurred while resetting the password.');
    } finally {
      setLoading(false); // Stop the loading spinner
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form className="bg-white p-8 py-10 rounded shadow-md w-full max-w-sm">
        {/* Logo at the top */}
        <Logo className="mb-6" />

        <h2 className="text-2xl font-bold mb-4 text-center">Password Reset</h2>

        {/* Descriptive text for the page */}
        {!emailValidated && (
          <p className="text-gray-600 text-sm text-center mb-6">
            Enter your registered email address below. We will send you a one-time password (OTP) to reset your account's password.
          </p>
        )}

        {/* Loading spinner */}
        {loading && <LoadingSpinner message="Processing..." />}

        {/* Error message */}
        {error && <ErrorAlert message={error} />}

        {!loading && (
          <>
            {!emailValidated ? (
              // Step 1: Validate Email
              <div>
                <InputField
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  IconComponent={FaEnvelope}
                  disabled={loading} // Disable input when loading
                />
                <button
                  onClick={handleRequestOtp}
                  className="w-full bg-blue-700 text-white p-2 rounded flex items-center justify-center hover:bg-blue-900 transition-colors mt-4"
                  disabled={loading} // Disable button when loading
                >
                  <FaArrowRight className="mr-2" />
                  Request OTP
                </button>

                {/* Helpful text after OTP request */}
                <p className="text-gray-500 text-sm text-center mt-4">
                  Once you've requested an OTP, please check your email inbox (or spam folder) for the verification code.
                </p>
              </div>
            ) : (
              // Step 2: OTP and Password Reset Form
              <div>
                <InputField
                  id="otp"
                  name="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  IconComponent={FaEnvelope}
                  disabled={loading} // Disable input when loading
                />
                <InputField
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  IconComponent={FaLock}
                  disabled={loading} // Disable input when loading
                />
                <InputField
                  id="reenteredPassword"
                  name="reenteredPassword"
                  type="password"
                  value={reenteredPassword}
                  onChange={(e) => setReenteredPassword(e.target.value)}
                  placeholder="Re-enter New Password"
                  IconComponent={FaLock}
                  disabled={loading} // Disable input when loading
                />

                {/* Guide text for strong password */}
                <p className="text-gray-500 text-sm text-center mt-2">
                  Use at least 8 characters, including letters, numbers, and symbols for a strong password.
                </p>

                <button
                  onClick={handleResetPassword}
                  className="w-full bg-blue-700 text-white p-2 rounded flex items-center justify-center hover:bg-blue-900 transition-colors mt-4"
                  disabled={loading} // Disable button when loading
                >
                  <FaCheck className="mr-2" />
                  Reset Password
                </button>
              </div>
            )}
          </>
        )}
      </form>
    </div>
  );
};

export default PasswordReset;
