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
  FaAngleRight,
  FaAngleLeft,
} from "react-icons/fa";
import profileImage from "../../../assets/images/admin/uploads/profile-images/profile-deafult-female.jpg";
import useClickOutside from "../../../hooks/useClickOutside";
import "./Header.css";

const Header = ({ isCollapsed, onToggle }) => {
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

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filtered = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuggestions(filtered);
    setSearchDropdownOpen(value.length > 0);
  };

  const handleFocus = () => {
    if (searchTerm) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setSearchDropdownOpen(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/admin/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  useClickOutside(userSectionRef, () => setDropdownOpen(false));
  useClickOutside(searchContainerRef, () => setSearchDropdownOpen(false));

  return (
    <header className={`header ${isCollapsed ? "collapsed" : ""}`}>
      <div className="header-right">
        <div className="link-section">
          <button className="menu-toggle-btn" onClick={onToggle}>
            {isCollapsed ? <FaAngleRight /> : <FaAngleLeft />}
          </button>
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
                className="user-dropdown-menu"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="user-dropdown-header">
                  <img
                    src={profileImage}
                    alt="User Profile"
                    className="user-dropdown-profile-img"
                  />
                  <div className="user-dropdown-user-details">
                    <span className="user-dropdown-user-name">
                      {"Shalu S Vayakakdy"}
                    </span>
                    <span className="user-dropdown-user-role">
                      {"Developer"}
                    </span>
                  </div>
                </div>
                <NavLink
                  to="/admin/profile"
                  className="user-dropdown-item"
                  onClick={() => setDropdownOpen(false)}
                >
                  <FaUser className="user-dropdown-icon" /> Profile
                </NavLink>
                <NavLink to="/settings" className="user-dropdown-item">
                  <FaCog className="user-dropdown-icon" /> Settings
                </NavLink>
                <NavLink to="/help" className="user-dropdown-item">
                  <FaQuestionCircle className="user-dropdown-icon" /> Help
                </NavLink>
                <span onClick={handleLogout} className="user-dropdown-item">
                  <FaSignOutAlt className="user-dropdown-icon" /> Logout
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
