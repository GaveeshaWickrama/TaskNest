import React, { useState } from 'react';
import { FaLock, FaCheck } from 'react-icons/fa';
import InputField from '../../components/InputField'; // Assuming you have a custom InputField component
import ErrorAlert from '../../components/ErrorAlert'; // Assuming you have a custom ErrorAlert component
import LoadingSpinner from '../../components/LoadingSpinner'; // Assuming you have a LoadingSpinner component
import { useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo';
import axios from 'axios';
import { useAuth } from '../../context/auth';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reenteredPassword, setReenteredPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const { token, currentUser } = useAuth(); 
  const navigate = useNavigate();

  const validatePassword = (value) => 
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(value);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage('');

    if (!currentPassword || !newPassword || !reenteredPassword) {
      return setError('All fields are required.');
    }
    if (newPassword !== reenteredPassword) {
      return setError('New password and re-entered password do not match.');
    }
    if (!validatePassword(newPassword)) {
        setError("Password criteria is not met.");
        return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/change-password/${currentUser.id}`,
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage('Password updated successfully.');
      setShowPopup(true); // Show popup
      setCurrentPassword('');
      setNewPassword('');
      setReenteredPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    navigate('/user/dashboard'); // Redirect after closing the popup
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xl font-bold mb-4">Success</h2>
            <p className="mb-4">{successMessage}</p>
            <button
              onClick={handlePopupClose}
              className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-900 transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}
      

      <form className="bg-white p-8 py-10 rounded shadow-md w-full max-w-sm">
        <Logo className="mb-6" />
        <h2 className="text-2xl font-bold mb-4 text-center">Change Password</h2>
        {loading && <LoadingSpinner message="Processing..." />}
        {error && <ErrorAlert message={error} />}

        {!showPopup && (
  <>
    <InputField
      id="currentPassword"
      name="currentPassword"
      type="text"
      value={currentPassword}
      onChange={(e) => setCurrentPassword(e.target.value)}
      placeholder="Current Password"
      IconComponent={FaLock}
      disabled={loading}
    />
    <InputField
      id="newPassword"
      name="newPassword"
      type="password"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
      placeholder="New Password"
      IconComponent={FaLock}
      disabled={loading}
    />
    <InputField
      id="reenteredPassword"
      name="reenteredPassword"
      type="password"
      value={reenteredPassword}
      onChange={(e) => setReenteredPassword(e.target.value)}
      placeholder="Re-enter New Password"
      IconComponent={FaLock}
      disabled={loading}
    />
    <p className="text-gray-500 text-sm text-center mt-2">
      Use at least 8 characters, including letters, numbers, and symbols for a strong password.
    </p>
    <button
      onClick={handleChangePassword}
      className="w-full bg-blue-700 text-white p-2 rounded flex items-center justify-center hover:bg-blue-900 transition-colors mt-4"
      disabled={loading}
    >
      <FaCheck className="mr-2" />
      Reset Password
    </button>
  </>
)}

      </form>
    </div>
  );
};

export default ChangePassword;
