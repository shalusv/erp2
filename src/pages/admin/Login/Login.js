import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyUsers } from "../../../data/dummyUsers";
import { FaHome, FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = dummyUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/admin");
    } else {
      setError("Invalid credentials. Please try again.");
      setTimeout(() => setError(""), 3000); // Clear error message after 3 seconds
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="header-container">
          <h1>Welcome</h1>
          <FaHome className="home-icon" onClick={() => navigate("/")} />
        </div>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group password-group">
            <label htmlFor="password">Password:</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="password-toggle-icon"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className={`error-container ${error ? "visible" : "hidden"}`}>
          <p className="error">{error}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
