import { BrowserRouter as Router, Route, Routes, Navigate, useEffect } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import About from "./components/About";
import Records from "./components/Records";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import { useState } from "react";
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check localStorage to see if user is logged in
    return localStorage.getItem("isAuthenticated") === "true";
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true"); // Save the state in local storage
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated"); // Remove it on logout
  };

  return (
    <Router>
      {isAuthenticated && <Navbar onLogout={handleLogout} />}
      <ErrorBoundary>
        <div className={isAuthenticated ? "main-content" : ""}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
            <Route path="/about" element={isAuthenticated ? <About /> : <Navigate to="/login" />} />
            <Route path="/records" element={isAuthenticated ? <Records /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
