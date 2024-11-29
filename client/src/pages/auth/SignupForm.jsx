import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import { FaEnvelope, FaLock, FaUser, FaCheck } from 'react-icons/fa';
import Logo from '../../components/Logo';
import InputField from '../../components/InputField';
import ErrorAlert from '../../components/ErrorAlert';
import LoadingSpinner from '../../components/LoadingSpinner';

const SignupForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reenteredPassword, setReenteredPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateName = (value) => /^[a-zA-Z\s]+$/.test(value);

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const validatePassword = (value) => 
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!firstName || !lastName || !email || !password || !reenteredPassword) {
      setError('All fields are required.');
      return;
    }
    if (!validateName(firstName) || !validateName(lastName)) {
      setError('Names should contain only letters.');
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!validatePassword(password)) {
        setError(
          "Password must be 8-12 characters, with at least one uppercase, one lowercase, one number, and one special character."
        );
        return;
    }
    if (password !== reenteredPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    // Form data
    const userData = { firstName, lastName, email, password };
    setLoading(true);
    const { error } = await signup(userData); // Assuming signup handles user registration
    setLoading(false);

    if (error) {
      setError(error);
    } else {
      navigate('/verify-otp', { state: userData });
    }
  };

  return (
    <div className="h-full bg-gray-100 flex justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm my-10">
        <Logo />
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        {loading && <LoadingSpinner message="Creating Account..." />}
        {!loading && (
          <>
            <div className="flex space-x-2 mb-4">
              <InputField
                id="firstName"
                name="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                IconComponent={FaUser}
              />
              <InputField
                id="lastName"
                name="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                IconComponent={FaUser}
              />
            </div>
            <InputField
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              IconComponent={FaEnvelope}
              className="mb-4"
            />
            <InputField
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              IconComponent={FaLock}
              className="mb-4"
            />
            <InputField
              id="reenteredPassword"
              name="reenteredPassword"
              type="password"
              value={reenteredPassword}
              onChange={(e) => setReenteredPassword(e.target.value)}
              placeholder="Re-enter Password"
              IconComponent={FaLock}
              className="mb-6"
            />
            <button
              type="submit"
              className="w-full bg-blue-700 text-white p-2 rounded hover:bg-blue-900 transition-colors flex items-center justify-center"
            >
              <FaCheck className="mr-2" /> Sign Up
            </button>
          </>
        )}
        {error && <ErrorAlert message={error} />}
        <div className="flex justify-center mt-5">
          <span className="text-sm">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-blue-500 hover:text-blue-700 transition-colors">
              Login
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
