import { useState } from "react";
import { auth } from "../firebase"; // Adjust the path as necessary
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import SignupModal from "./signupmodal"; // Import the modal
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import './styles/styles.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordTyped, setPasswordTyped] = useState(false); // Track if password has been typed
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin(); // Call the prop to set authenticated status
      navigate("/home"); // Redirect after successful login
    } catch (error) {
      setError("Failed to sign in");
    }
  };

  const handleShowPassword = () => {
    setShowPassword(true);
    setTimeout(() => setShowPassword(false), 800); // Hide password after 3 seconds
  };

  return (
    <ErrorBoundary>
      <div className="auth-container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Sign In</h2>
          {error && <p className="error-message">{error}</p>}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (e.target.value.length > 0) {
                  setPasswordTyped(true); // Set to true when the first character is typed
                } else {
                  setPasswordTyped(false); // Reset if empty
                }
              }}
              placeholder="Password"
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
          <button type="submit">Sign In</button>
          <p>
            Don't have an account?{" "}
            <span onClick={() => setModalOpen(true)} style={{ color: 'blue', cursor: 'pointer' }}>
              Sign Up
            </span>
          </p>
        </form>
        <SignupModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </ErrorBoundary>
  );
};

export default Login;
