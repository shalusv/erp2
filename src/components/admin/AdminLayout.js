import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./AdminLayout.css";
import Header from "./common/Header";
import Sidebar from "./common/Sidebar";
import Footer from "./common/Footer";

const AdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Collapse the sidebar automatically on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Cleanup event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="admin-layout">
      <Sidebar isCollapsed={isCollapsed} onToggle={handleToggleSidebar} />
      <div className={`main-content ${isCollapsed ? "collapsed" : ""}`}>
        <Header isCollapsed={isCollapsed} />
        <div className="content-wrapper">
          <div className="content">
            <Outlet /> {/* This is where nested routes will render */}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
