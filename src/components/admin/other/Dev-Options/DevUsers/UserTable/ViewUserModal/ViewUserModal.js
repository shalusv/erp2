// src/components/admin/other/Dev-Options/ViewUserModal/ViewUserModal.js
import React from "react";
import "./ViewUserModal.css";

const ViewUserModal = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>View User</h2>
        <div className="details">
          <p>
            <strong>User Name:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
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

export default ViewUserModal;
