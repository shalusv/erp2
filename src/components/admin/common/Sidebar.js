import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaUserTie,
  FaCog,
  FaLaptopCode,
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = ({ isCollapsed, onToggle }) => {
  const location = useLocation(); // Get current location

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
        <li className="sidebar-item submenu-container">
          <div
            className={`sidebar-link ${
              location.pathname.startsWith("/admin/settings") ? "active" : ""
            }`}
          >
            <FaCog className="icon" />
            <span className="text">Settings</span>
          </div>
          <ul className="submenu">
            <div className="submenu-overlay">
              {isCollapsed && <span className="submenu-tooltip">Settings</span>}
              <li>
                <NavLink
                  to="/admin/settings/profiles"
                  className={({ isActive }) =>
                    isActive ? "submenu-link active" : "submenu-link"
                  }
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/settings/securities"
                  className={({ isActive }) =>
                    isActive ? "submenu-link active" : "submenu-link"
                  }
                >
                  Security
                </NavLink>
              </li>
            </div>
          </ul>
        </li>

        {/* Dev-Options with Submenu */}
        <li className="sidebar-item submenu-container">
          <div
            className={`sidebar-link ${
              location.pathname.startsWith("/admin/dev-options") ? "active" : ""
            }`}
          >
            <FaLaptopCode className="icon" />
            <span className="text">Dev-Options</span>
          </div>
          <ul className="submenu">
            <div className="submenu-overlay">
              {isCollapsed && (
                <span className="submenu-tooltip">Dev-Options</span>
              )}
              <li>
                <NavLink
                  to="/admin/dev-options/permissions"
                  className={({ isActive }) =>
                    isActive ? "submenu-link active" : "submenu-link"
                  }
                >
                  Permissions
                </NavLink>
              </li>
            </div>
          </ul>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
