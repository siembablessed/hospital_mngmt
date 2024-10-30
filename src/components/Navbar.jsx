import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase'; // Adjust the path as necessary
import { signOut } from 'firebase/auth';
import './styles/navbar.css';

const Navbar = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout(); // Call the prop to update authentication status
    } catch (error) {
      console.error("Failed to sign out", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>CIMAS HEALTHATHON'24</h2>
      </div>
      <ul className={isOpen ? "nav-links open" : "nav-links"}>
        <li>
          <Link to="/home" className="nav-link" onClick={toggleMenu}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="nav-link" onClick={toggleMenu}>
            About
          </Link>
        </li>
        <li>
          <Link to="/records" className="nav-link" onClick={toggleMenu}>
            Patient Records
          </Link>
        </li>
        <li>
          <Link onClick={handleLogout} className="nav-link">
            Logout
          </Link>
        </li>
      </ul>
      <div className="hamburger" onClick={toggleMenu}>
        <span className={isOpen ? "bar open" : "bar"}></span>
        <span className={isOpen ? "bar open" : "bar"}></span>
        <span className={isOpen ? "bar open" : "bar"}></span>
      </div>
    </nav>
  );
};

export default Navbar;
