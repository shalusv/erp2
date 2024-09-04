// src/components/admin/other/Dev-Options/DeletePermissionModal/DeletePermissionModal.js
import React from "react";
import "./DeletePermissionModal.css";

const DeletePermissionModal = ({ isOpen, onClose, onDelete, permission }) => {
  if (!isOpen || !permission) return null;

  const handleDelete = () => {
    onDelete(permission.id);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Delete Permission</h2>
        <p>
          Are you sure you want to delete the permission "
          <strong>{permission.name}</strong>"?
        </p>
        <div className="modal-actions">
          <button onClick={handleDelete} className="delete-button">
            Delete
          </button>
          <button onClick={onClose} className="cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePermissionModal;
