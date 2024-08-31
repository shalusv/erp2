import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaUserTie,
  FaCog,
  FaAngleLeft,
  FaAngleRight,
  FaLaptopCode,
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = ({ isCollapsed, onToggle }) => {
  const location = useLocation();
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const handleSubMenuToggle = (menu) => {
    setOpenSubMenu((prev) => (prev === menu ? null : menu));
  };

  const handleSubMenuLinkClick = () => {
    setOpenSubMenu(null); // Close the submenu when any submenu link is clicked
    console.log(openSubMenu);
  };

  return (
    <aside className={`sidebar-wrapper ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <img
          src={
            isCollapsed
              ? require("../../../assets/images/admin/logo-mini.png")
              : require("../../../assets/images/admin/logo.png")
          }
          alt="Admin Logo"
        />
      </div>
      <ul className="sidebar-menu">
        <li className="sidebar-item">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <FaTachometerAlt className="icon" />
            <span className="text">Dashboard</span>
          </NavLink>
          {isCollapsed && <span className="tooltip">Dashboard</span>}
        </li>
        <li className="sidebar-item">
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <FaUsers className="icon" />
            <span className="text">Users</span>
          </NavLink>
          {isCollapsed && <span className="tooltip">Users</span>}
        </li>
        <li className="sidebar-item">
          <NavLink
            to="/admin/employees"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <FaUserTie className="icon" />
            <span className="text">Employees</span>
          </NavLink>
          {isCollapsed && <span className="tooltip">Employees</span>}
        </li>

        {/* Settings with Submenu */}
        <li
          className={`sidebar-item submenu-container ${
            openSubMenu === "settings" ? "active" : ""
          }`}
          onClick={() => handleSubMenuToggle("settings")}
        >
          <div className="sidebar-link">
            <FaCog className="icon" />
            <span className="text">Settings</span>
          </div>
          <ul className={`submenu ${openSubMenu === "settings" ? "open" : ""}`}>
            <div className="submenu-overlay">
              {isCollapsed && <span className="submenu-tooltip">Settings</span>}
              <li>
                <NavLink
                  to="/admin/settings/profiles"
                  className="submenu-link"
                  onClick={handleSubMenuLinkClick} // Close submenu on click
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/settings/securities"
                  className="submenu-link"
                  onClick={handleSubMenuLinkClick} // Close submenu on click
                >
                  Security
                </NavLink>
              </li>
            </div>
          </ul>
        </li>

        {/* Dev Options */}
        <li
          className={`sidebar-item submenu-container ${
            openSubMenu === "dev-options" ? "active" : ""
          }`}
          onClick={() => handleSubMenuToggle("dev-options")}
        >
          <div className="sidebar-link">
            <FaLaptopCode className="icon" />
            <span className="text">Dev Options</span>
          </div>
          <ul
            className={`submenu ${openSubMenu === "dev-options" ? "open" : ""}`}
          >
            <div className="submenu-overlay">
              {isCollapsed && (
                <span className="submenu-tooltip">Dev Options</span>
              )}
              <li>
                <NavLink
                  to="/admin/dev-options/permissions"
                  className="submenu-link"
                  onClick={handleSubMenuLinkClick} // Close submenu on click
                >
                  Permissions
                </NavLink>
              </li>
            </div>
          </ul>
        </li>
      </ul>
      <button className="toggle-btn" onClick={onToggle}>
        {isCollapsed ? <FaAngleRight /> : <FaAngleLeft />}
      </button>
    </aside>
  );
};

export default Sidebar;
