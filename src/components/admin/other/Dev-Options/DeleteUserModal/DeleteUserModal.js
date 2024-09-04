// src/components/admin/other/Dev-Options/DeleteUserModal/DeleteUserModal.js
import React from "react";
import "./DeleteUserModal.css";

const DeleteUserModal = ({ isOpen, onClose, onDelete, user }) => {
  if (!isOpen || !user) return null;

  const handleDelete = () => {
    onDelete(user.id);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Delete User</h2>
        <p>
          Are you sure you want to delete the user "
          <strong>{user.username}</strong>"?
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

export default DeleteUserModal;
