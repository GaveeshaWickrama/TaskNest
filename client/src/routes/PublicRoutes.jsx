import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFoundPage from '../pages/common/NotFoundPage';
import Login from '../pages/auth/Login';
import VerifyOtp from '../pages/auth/VerifyOtp';
import Signup from '../pages/auth/SignupForm'
import PasswordResetOtp from "../pages/auth/PasswordResetOtp";


function PublicRoutes() {
  return (
    <Routes>
      
      <Route path="/login" element={<Login />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/reset-password-otp" element={<PasswordResetOtp />} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default PublicRoutes;