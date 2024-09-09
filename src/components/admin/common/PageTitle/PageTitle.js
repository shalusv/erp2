// src/components/admin/common/PageTitle/PageTitle.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom"; // Import NavLink
import "./PageTitle.css";

const PageTitle = ({ title,page }) => {
  // Define the route based on the title
  let addLink = "",buttonText='';
  if(page === "list"){
    switch (title) {
      case "Users":
          addLink = "/admin/add-user";
          buttonText = "Add New User";
        break;
      case "Employees":
        addLink = "/admin/add-employee";
        buttonText = "Add New Employees";
        break;
      default:
        addLink = "#";
        break;
    }
  }
  else{
    switch (title) {
      case "Users":
        addLink = "/admin/users";
        buttonText = "Users";
        break;
      case "Employees":
        addLink = "/admin/employees";
        buttonText = "Employees";
        break;
      default:
        addLink = "#";
        buttonText = "";
        break;
    }
  }
  

  return (
    <div className="page-title-container">
      <h1 className="page-title">{title}</h1>
      {buttonText && (
        <NavLink
          to={addLink}
          className="add-user-button"
          title={buttonText}
        >
          <FontAwesomeIcon icon={faPlus} className="icon-add" />
          <span className="add-user-text">{buttonText}</span>
        </NavLink>
      )}
    </div>
  );
};

export default PageTitle;
