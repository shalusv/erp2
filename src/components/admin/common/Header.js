import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaUser,
  FaHome,
  FaBell,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
  FaMoon,
} from "react-icons/fa";
import profileImage from "../../../assets/images/admin/uploads/profile-images/profile-deafult-female.jpg";

const Header = ({ isCollapsed }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const searchContainerRef = useRef(null);
  const userSectionRef = useRef(null);
  const navigate = useNavigate(); // useNavigate hook for redirection

  const suggestions = [
    "Dashboard",
    "Users",
    "Employees",
    "Settings",
    "Profile",
    "Purchase Orders",
    "Product Listings",
  ];

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filtered = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuggestions(filtered);
  };

  const handleFocus = () => {
    if (searchTerm) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    }
  };

  const handleClickOutside = (event) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target) &&
      userSectionRef.current &&
      !userSectionRef.current.contains(event.target)
    ) {
      setFilteredSuggestions([]);
      setDropdownOpen(false);
    }
  };

  const toggleDarkMode = () => {
    console.log("Dark mode toggled!");
  };

  const handleLogout = () => {
    // Perform any logout operations here (e.g., clearing user data, tokens, etc.)
    // Redirect to the login page
    localStorage.removeItem("isAuthenticated");
    navigate("/admin/login");
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className={`header ${isCollapsed ? "collapsed" : ""}`}>
      <div className="header-right">
        <div className="link-section">
          <NavLink to="/" className="link">
            <FaHome className="home-icon" />
          </NavLink>
        </div>
        <div className="search-container" ref={searchContainerRef}>
          <FaSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={handleFocus}
          />

          {filteredSuggestions.length > 0 && (
            <div className="search-dropdown">
              {filteredSuggestions.map((suggestion, index) => (
                <div key={index} className="search-item">
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          className="user-section"
          onClick={toggleDropdown}
          ref={userSectionRef}
        >
          <FaBell className="notification-icon" />
          <img
            src={profileImage}
            alt="User Profile"
            className="user-profile-img"
          />
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-header">
                <img
                  src={profileImage}
                  alt="User Profile"
                  className="dropdown-profile-img"
                />
                <div className="dropdown-user-details">
                  <span className="dropdown-user-name">John Doe</span>
                  <span className="dropdown-user-role">Admin</span>
                </div>
              </div>
              <NavLink to="/profile" className="dropdown-item">
                <FaUser className="dropdown-icon" /> Profile
              </NavLink>
              <NavLink to="/settings" className="dropdown-item">
                <FaCog className="dropdown-icon" /> Settings
              </NavLink>
              <NavLink to="/help" className="dropdown-item">
                <FaQuestionCircle className="dropdown-icon" /> Help
              </NavLink>
              <span onClick={handleLogout} className="dropdown-item">
                <FaSignOutAlt className="dropdown-icon" /> Logout
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
