import { useState } from "react";
import { auth } from "../firebase"; // Adjust the path as necessary
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import SignupModal from "./signupmodal"; // Import the modal
import './styles/styles.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
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
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
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
