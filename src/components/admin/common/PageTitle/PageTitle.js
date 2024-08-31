// src/components/admin/common/PageTitle/PageTitle.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./PageTitle.css";

const PageTitle = ({ title, onAddClick }) => {
  let buttonText = "Add New";

  switch (title) {
    case "Users":
      buttonText = "Add New User";
      break;
    case "Products":
      buttonText = "Add New Product";
      break;
    case "Employees":
      buttonText = "Add New Employee";
      break;
    case "Purchases":
      buttonText = "Add New Purchase";
      break;
    default:
      buttonText = "";
      break;
  }

  return (
    <div className="page-title-container">
      <h1 className="page-title">{title}</h1>
      {buttonText && (
        <button
          className="add-user-button"
          onClick={onAddClick}
          title={buttonText}
        >
          <FontAwesomeIcon icon={faPlus} className="icon-add" />
          <span className="add-user-text">{buttonText}</span>
        </button>
      )}
    </div>
  );
};

export default PageTitle;
