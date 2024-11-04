import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import './styles/modal.css'; 

const SignupModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordTyped, setPasswordTyped] = useState(false); // Track if password has been typed
  const [confirmPasswordTyped, setConfirmPasswordTyped] = useState(false); // Track if confirm password has been typed
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isShaking, setIsShaking] = useState(false); // For shaking effect

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setIsShaking(true); // Trigger shaking effect
      return;
    }

    const errors = [];
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long.");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter.");
    }
    if (!/[\W_]/.test(password)) {
      errors.push("Password must contain at least one special character.");
    }

    if (errors.length > 0) {
      setError(errors.join(" "));
      setIsShaking(true); // Trigger shaking effect
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccessMessage("Account created successfully!");
      setTimeout(() => {
        onClose();
      }, 2000); // Auto close after 2 seconds
    } catch (err) {
      setError(err.message);
      setIsShaking(true); // Trigger shaking effect
    }
  };

  const handleShowPassword = () => {
    setShowPassword(true);
    setTimeout(() => setShowPassword(false), 800); // Hide password after 3 seconds
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(true);
    setTimeout(() => setShowConfirmPassword(false), 800); // Hide confirm password after 3 seconds
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    evaluatePasswordStrength(newPassword);
    if (newPassword.length > 0) {
      setPasswordTyped(true); // Set to true when the first character is typed
    } else {
      setPasswordTyped(false); // Reset if empty
    }
  };

  const evaluatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1; // Length check
    if (/[A-Z]/.test(password)) strength += 1; // Uppercase check
    if (/[0-9]/.test(password)) strength += 1; // Number check
    if (/[\W_]/.test(password)) strength += 1; // Special character check
    setPasswordStrength(strength);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Sign Up</h2>
        {error && (
          <ul className="error-message">
            {error.split('. ').map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        )}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleSignup} className={isShaking ? "shake" : ""}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
              onFocus={handleShowPassword} // Show password on focus
              onBlur={() => setShowPassword(false)} // Hide password on blur
            />
            {passwordTyped && ( // Show icon only if the first character is typed
              <span onClick={handleShowPassword} className="toggle-password">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            )}
          </div>
          <div className="password-strength-bar">
            <div
              className="strength-indicator"
              style={{
                width: `${(passwordStrength / 4) * 100}%`,
                backgroundColor: passwordStrength === 0 ? "#e0e0e0" :
                  passwordStrength === 1 ? "red" :
                  passwordStrength === 2 ? "orange" :
                  passwordStrength === 3 ? "yellow" : "green"
              }}
            />
          </div>
          <div className="password-container">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (e.target.value.length > 0) {
                  setConfirmPasswordTyped(true); // Set to true when the first character is typed
                } else {
                  setConfirmPasswordTyped(false); // Reset if empty
                }
              }}
              required
              onFocus={handleShowConfirmPassword} // Show confirm password on focus
              onBlur={() => setShowConfirmPassword(false)} // Hide confirm password on blur
            />
            {confirmPasswordTyped && ( // Show icon only if the first character is typed
              <span onClick={handleShowConfirmPassword} className="toggle-password">
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            )}
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <span className="close-icon" onClick={onClose}>
          &times; {/* Close icon */}
        </span>
      </div>
    </div>
  );
};

export default SignupModal;
