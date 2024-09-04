// src/components/admin/other/Dev-Options/ViewPermissionModal/ViewPermissionModal.js
import React from "react";
import "./ViewPermissionModal.css";

const ViewPermissionModal = ({ isOpen, onClose, permission }) => {
  if (!isOpen || !permission) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>View Permission</h2>
        <div className="details">
          <p>
            <strong>Role Name:</strong> {permission.name}
          </p>
          <p>
            <strong>Description:</strong> {permission.description}
          </p>
        </div>
        <div className="modal-actions">
          <button onClick={onClose} className="close-button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewPermissionModal;
