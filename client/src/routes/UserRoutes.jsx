import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
// import ViewProfile from '../pages/common/ViewProfile';
// import EditProfile from '../pages/common/EditProfile';
import ChangePassword from '../pages/user/ChangePassword'
import Dashboard from '../pages/user/Dashboard'
import Profile from '../pages/common/Profile'

function UserRoutes() {
  const { currentUser, loading } = useAuth();
  const allowedRoles = ['user' ];
  // console.log(currentUser);

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }

  return (
    <Routes>

      <Route path="/changePassword" element={currentUser && allowedRoles.includes(currentUser.role) ? <ChangePassword /> : <Navigate to="/Unauthorized" />} />
      <Route path="/dashboard" element={currentUser && allowedRoles.includes(currentUser.role) ? <Dashboard /> : <Navigate to="/Unauthorized" />} />
      <Route path="/ViewProfile/:id" element={currentUser && allowedRoles.includes(currentUser.role) ? <Profile /> : <Navigate to="/Unauthorized" />} />
     
    </Routes>
  );
}

export default UserRoutes;
