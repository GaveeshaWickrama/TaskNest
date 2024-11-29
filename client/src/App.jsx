import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PublicRoutes from './routes/PublicRoutes';
import UserRoutes from './routes/UserRoutes'
import NotFoundPage from './pages/common/NotFoundPage';
import Unauthorized from './pages/common/Unauthorized';
import Header from './components/Header';
import Navbar from './components/navbar'
// import './App.css';

function App() {
  const [isNavbarVisible, setNavbarVisible] = useState(false);

  const toggleNavbar = () => {
    setNavbarVisible(!isNavbarVisible);
  };

  return (
    <Router>
      <div className="flex flex-col h-full">
        <Header toggleNavbar={toggleNavbar} />
        <div className={`flex-grow flex ${isNavbarVisible ? 'ml-0' : ''}`}>
          <Navbar isVisible={isNavbarVisible} />
          <div className={`main-content flex-grow  ${isNavbarVisible ? 'ml-64' : ''}`} style={{ marginTop: '5rem' } } >
            <div>
              <Routes>
                <Route path="/*" element={<PublicRoutes />} />
                <Route path="/user/*" element={<UserRoutes />} />
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/Unauthorized" element={<Unauthorized />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
