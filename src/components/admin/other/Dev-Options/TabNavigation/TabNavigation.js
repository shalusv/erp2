// src/components/admin/other/Dev-Options/TabNavigation/TabNavigation.js
import React from "react";
import "./TabNavigation.css";

const TabNavigation = ({ activeTab, onTabChange }) => {
  return (
    <div className="tab-navigation">
      <button
        className={activeTab === "permissions" ? "active" : ""}
        onClick={() => onTabChange("permissions")}
      >
        Permissions
      </button>
      <button
        className={activeTab === "users" ? "active" : ""}
        onClick={() => onTabChange("users")}
      >
        Users
      </button>
    </div>
  );
};

export default TabNavigation;
