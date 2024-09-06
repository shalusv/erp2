import React, { useRef, useEffect } from "react";
import "./DeletePermissionModal.css";

const DeletePermissionModal = ({ isOpen, onClose, onDelete, permission }) => {
  const modalRef = useRef(null);

  const handleDelete = () => {
    onDelete(permission.id);
    onClose();
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen || !permission) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content" ref={modalRef}>
        <div className="custom-modal-header">
          <h2>Delete Permission</h2>
          <button
            className="custom-close-button"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <div className="custom-modal-body">
          <p>
            Are you sure you want to delete the permission "
            <strong>{permission.name}</strong>"?
          </p>
        </div>
        <div className="custom-modal-actions">
          <button onClick={onClose} className="custom-cancel-button">
            Cancel
          </button>
          <button onClick={handleDelete} className="custom-delete-button">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePermissionModal;
