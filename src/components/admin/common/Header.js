import React, { useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaUser,
  FaHome,
  FaBell,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import profileImage from "../../../assets/images/admin/uploads/profile-images/profile-deafult-female.jpg";
import useClickOutside from "../../../hooks/useClickOutside";
import "./Header.css";

const Header = ({ isCollapsed }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);

  const searchContainerRef = useRef(null);
  const userSectionRef = useRef(null);
  const navigate = useNavigate();

  const suggestions = [
    "Dashboard",
    "Users",
    "Employees",
    "Settings",
    "Profile",
    "Purchase Orders",
    "Product Listings",
  ];

  // Handle search input change
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filtered = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuggestions(filtered);
    setSearchDropdownOpen(value.length > 0);
  };

  // Handle focus on search input
  const handleFocus = () => {
    if (searchTerm) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setSearchDropdownOpen(true);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/admin/login");
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useClickOutside(userSectionRef, () => setDropdownOpen(false));
  useClickOutside(searchContainerRef, () => setSearchDropdownOpen(false));

  return (
    <header className={`header ${isCollapsed ? "collapsed" : ""}`}>
      <div className="header-right">
        <div className="link-section">
          <NavLink to="/" className="round-nav">
            <FaHome className="icon" />
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
          {searchDropdownOpen && (
            <>
              <div
                className="search-overlay"
                onClick={() => setSearchDropdownOpen(false)}
              ></div>
              <div className="search-dropdown">
                {filteredSuggestions.length > 0 &&
                  filteredSuggestions.map((suggestion, index) => (
                    <div key={index} className="search-item">
                      {suggestion}
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
        <div className="user-section" ref={userSectionRef}>
          <FaBell className="notification-icon" />
          <img
            src={profileImage}
            alt="User Profile"
            className="user-profile-img"
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <>
              <div
                className="overlay"
                onClick={() => setDropdownOpen(false)}
              ></div>
              <div
                className="dropdown-menu"
                onClick={(e) => e.stopPropagation()}
              >
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
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
