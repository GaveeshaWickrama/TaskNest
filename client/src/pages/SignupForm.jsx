import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { FaEnvelope, FaLock, FaPhone, FaUser, FaExclamationCircle, FaArrowLeft, FaCheck } from "react-icons/fa";
import Logo from "../components/Logo";
import InputField from "../components/InputField";
import ErrorAlert from "../components/ErrorAlert";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reenteredPassword, setReenteredPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  const validateName = (value) => {
    const nameFormat = /^[a-zA-Z\s]+$/;
    return nameFormat.test(value);
  };

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const validatePassword = (value) => 
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("handleSubmit triggered"); // Debug log
    console.log({ firstName, lastName, email, password, reenteredPassword }); // Debug log

    if (!firstName || !lastName || !email || !password || !reenteredPassword ) {
      setError("All fields are required.");
      return;
    }
    if (!validateName(firstName) || !validateName(lastName)) {
        setError('Name should not contain numbers.');
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
    setError(null);
    setLoading(true);
    const { error } = await signup({ email, password });
    setLoading(false);

    if (error) {
      setError(error);
    } else {
      navigate("/verify-otp");
    }
  };

  return (
    <div className="">
        <form 
            onSubmit={(e) => { 
                e.preventDefault(); 
                console.log("Form submission event captured");
                handleSubmit(e); 
            }}
            className="bg-white p-8 rounded shadow-md w-full max-w-sm my-10 relative"
        >
            <Logo />
            <h2 className="text-2xl font-bold mb-10 text-center">Sign-Up</h2>
            <div className="w-full bg-gray-200 h-1 mb-6">
                <div className="bg-blue-700 h-1" style={{ width: '100%' }}></div>
            </div>
            {loading && <LoadingSpinner message="Processing..." />}
            {!loading && (
                <>
                    <div className="flex space-x-2 mb-4">
                        <div className="flex-1">
                            <InputField
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First Name"
                            IconComponent={FaUser}
                            disabled={loading}
                            />
                        </div>
                        <div className="flex-1">
                            <InputField
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name"
                            IconComponent={FaUser}
                            disabled={loading}
                            />
                        </div>
                    </div>
                    <InputField
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    IconComponent={FaEnvelope}
                    disabled={loading}
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
                    disabled={loading}
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
                    disabled={loading}
                    className="mb-4"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-700 text-white p-2 rounded flex items-center justify-center hover:bg-blue-900 transition-colors"
                        disabled={loading}
                    >
                        <FaCheck className="mr-2" /> Signup
                    </button>
                </>
            )}
            {error && <ErrorAlert message={error} />}
            <div className="flex mt-6 text-sm text-gray-600 items-center justify-center">
                <FaExclamationCircle className="mr-1" />
                <Link to="/login" className="hover:underline">
                    Already have an account?
                </Link>
            </div>
        </form>
    </div>


  );
};

export default SignupForm;
