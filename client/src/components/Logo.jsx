import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/icons/logo.png'; // Adjust the path to your logo

const Logo = () => (
  <Link to="/">
    <div className="flex justify-center hover:scale-110 hover: duration-300">
      <img src={logo} alt="Logo" />
    </div>
  </Link>
);

export default Logo;
