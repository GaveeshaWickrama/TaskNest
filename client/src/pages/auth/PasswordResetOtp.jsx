import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaArrowRight, FaCheck } from 'react-icons/fa';
import InputField from '../../components/InputField'; // Assuming you have a custom InputField component
import ErrorAlert from '../../components/ErrorAlert'; // Assuming you have a custom ErrorAlert component
import LoadingSpinner from '../../components/LoadingSpinner'; // Assuming you have a LoadingSpinner component
import { useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo'; // Assuming you have a Logo component
import { useAuth } from '../../context/auth'; // Import the AuthContext

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reenteredPassword, setReenteredPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [emailValidated, setEmailValidated] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const navigate = useNavigate();
  const { requestPasswordReset, resetPassword } = useAuth();

  const validatePassword = (value) => 
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(value);


  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await requestPasswordReset({ email });
      if (!result.error) {
        setEmailValidated(true);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An error occurred while requesting OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(null);

    if (newPassword !== reenteredPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!validatePassword(newPassword)) {
      setError("Password criteria is not met.");
      return;
  }

    try {
      setLoading(true);
      const result = await resetPassword(email, otp, newPassword);
      if (!result.error) {
        setShowPopup(true); // Show success popup
      } else {
        setError(result.message || 'An unexpected error occurred.');
      }
    } catch (err) {
      setError('An error occurred while resetting the password.');
    } finally {
      setLoading(false);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    navigate('/login'); // Redirect to login after closing the popup
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {showPopup && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full text-center">
      <h2 className="text-xl font-bold mb-4">Success</h2>
      <p className="mb-4">Your password has been changed successfully!</p>
      <button
        onClick={handlePopupClose}
        className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-900 transition-colors"
      >
        OK
      </button>
    </div>
  </div>
)}
{/* Add this overlay to disable interaction with the background */}
{showPopup && <div className="fixed inset-0 bg-gray-900 opacity-50 pointer-events-none z-40"></div>}

      <form className="bg-white p-8 py-10 rounded shadow-md w-full max-w-sm">
        <Logo className="mb-6" />
        <h2 className="text-2xl font-bold mb-4 text-center">Password Reset</h2>

        {!emailValidated && (
          <p className="text-gray-600 text-sm text-center mb-6">
            Enter your registered email address below. We will send you a one-time password (OTP) to reset your account's password.
          </p>
        )}

        {loading && <LoadingSpinner message="Processing..." />}
        {error && <ErrorAlert message={error} />}

        {!loading && (
          <>
            {!emailValidated ? (
              <div>
                <InputField
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  IconComponent={FaEnvelope}
                />
                <button
                  onClick={handleRequestOtp}
                  className="w-full bg-blue-700 text-white p-2 rounded flex items-center justify-center hover:bg-blue-900 transition-colors mt-4"
                >
                  <FaArrowRight className="mr-2" />
                  Request OTP
                </button>
                <p className="text-gray-500 text-sm text-center mt-4">
                  Once you've requested an OTP, please check your email inbox (or spam folder) for the verification code.
                </p>
              </div>
            ) : (
              <div>
                <InputField
                  id="otp"
                  name="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  IconComponent={FaEnvelope}
                />
                <InputField
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  IconComponent={FaLock}
                />
                <InputField
                  id="reenteredPassword"
                  name="reenteredPassword"
                  type="password"
                  value={reenteredPassword}
                  onChange={(e) => setReenteredPassword(e.target.value)}
                  placeholder="Re-enter New Password"
                  IconComponent={FaLock}
                />
                <p className="text-gray-500 text-sm text-center mt-2">
                  Use at least 8 characters, including letters, numbers, and symbols for a strong password.
                </p>
                <button
                  onClick={handleResetPassword}
                  className="w-full bg-blue-700 text-white p-2 rounded flex items-center justify-center hover:bg-blue-900 transition-colors mt-4"
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
