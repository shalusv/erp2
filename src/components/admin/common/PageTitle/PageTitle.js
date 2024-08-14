// src/components/admin/common/PageTitle.js
import React from "react";
import "./PageTitle.css"; // Import the CSS file for styling

const PageTitle = ({ title }) => {
  return (
    <div className="page-title-container">
      <h1 className="page-title">{title}</h1>
    </div>
  );
};

export default PageTitle;
