import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHome, FaEye, FaEyeSlash } from "react-icons/fa";
import API_URL from "../../../config/config.js"; // Adjust the import path as necessary
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(API_URL);
      const response = await axios.post(
        `${API_URL}/login`, // Use the API URL from the configuration file
        {
          username: username,
          password: password,
        },
        { withCredentials: true }
      );

      if (response.data.token) {
        localStorage.setItem("isAuthenticated", "true");
        console.log(response.data.role);
        localStorage.setItem("user-name", username); // Store user role
        localStorage.setItem("userRole", response.data.role); // Store user role
        navigate("/admin");
      }
    } catch (error) {
      setError("Invalid credentials. Please try again.");
      setTimeout(() => setError(""), 3000);
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
