import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import authService from '../../services/authService';
import { FaKey } from 'react-icons/fa';
import Logo from '../../components/Logo';
import ErrorAlert from '../../components/ErrorAlert';

const VerifyOtp = () => {
  const [otp, setOtp] = useState(new Array(4).fill(''));
  const [error, setError] = useState(null);
  const [resendMessage, setResendMessage] = useState(null);
  const { verifyOtp } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state;

  const handleChange = (element, index) => {
    const value = element.value;
    if (/^[a-zA-Z0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (element.nextSibling) {
        element.nextSibling.focus();
      }
    } else if (value === '') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);

      if (element.previousSibling) {
        element.previousSibling.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    const { user, error } = await verifyOtp({ ...userData, otp: otpCode });
    if (error) {
      setError(error);
    } else {
      navigate('/'); // Redirect to home after successful verification
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await authService.signup(userData);
      if (response.error) {
        setError(response.error || 'Failed to resend OTP. Please try again later.');
        setResendMessage(null);
      } else {
        setResendMessage(response.message || 'OTP has been resent. Please check your email.');
        setError(null); // Clear any previous errors
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 pt-4 rounded shadow-md w-full max-w-sm">
        <Logo />
        <h2 className="text-2xl font-bold mb-10 text-center">Verify your email address</h2>
        <p className="mb-4 text-center">We emailed you a 4-character code to <strong>{userData.email}</strong></p>
        <p className="mb-4 text-center">Enter the code below to confirm your email address</p>
        <div className="flex justify-center mb-4">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              name="otp"
              maxLength="1"
              className="w-12 h-12 text-center text-lg border border-gray-300 rounded mx-1 focus:outline-none focus:border-blue-500"
              value={data}
              onChange={e => handleChange(e.target, index)}
              onFocus={e => e.target.select()}
            />
          ))}
        </div>
        {error && <ErrorAlert message={error} />}
        {resendMessage && <p className="text-green-600 mb-4">{resendMessage}</p>}
        <button type="submit" className="w-full bg-blue-700 text-white p-2 rounded flex items-center justify-center hover:bg-blue-900 transition-colors">
          Verify OTP
        </button>
        <p className="text-center text-gray-600 mt-4">
          Haven’t received yet? 
          <button onClick={handleResendOtp} className="text-blue-600 hover:underline ml-1">
            Resend a new code
          </button>
        </p>
      </form>
    </div>
  );
};

export default VerifyOtp;



