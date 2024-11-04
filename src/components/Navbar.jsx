import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase'; // Adjust the path as necessary
import { signOut } from 'firebase/auth';
import { FaHome, FaInfoCircle, FaUserAlt, FaSignOutAlt } from 'react-icons/fa';
import './styles/navbar.css';

const Navbar = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout(); // Call the prop to update authentication status
    } catch (error) {
      console.error("Failed to sign out", error);
    }
  };

  return (
    <nav className="navbar sidebar">
      <div className="navbar-logo">
        <h2>CIMAS</h2>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/home" className="nav-link">
            <FaHome className="icon" /> Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="nav-link">
            <FaInfoCircle className="icon" /> About
          </Link>
        </li>
        <li>
          <Link to="/records" className="nav-link">
            <FaUserAlt className="icon" /> Patient Records
          </Link>
        </li>
      </ul>
      <div className="nav-link logout" onClick={handleLogout}>
        <FaSignOutAlt className="icon" /> Logout
      </div>
    </nav>
  );
};

export default Navbar;
