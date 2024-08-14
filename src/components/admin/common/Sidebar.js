import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaUserTie,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
import "./Sidebar.css"; // Import Sidebar CSS

const Sidebar = ({ isCollapsed, onToggle }) => {
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
      </ul>
      <button className="toggle-btn" onClick={onToggle}>
        {isCollapsed ? <FaAngleRight /> : <FaAngleLeft />}
      </button>
    </aside>
  );
};

export default Sidebar;
