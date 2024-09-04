// src/components/admin/other/Dev-Options/EditPermissionModal/EditPermissionModal.js
import React, { useState, useEffect } from "react";
import "./EditPermissionModal.css";

const EditPermissionModal = ({ isOpen, onClose, onSave, permission }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (permission) {
      setName(permission.name);
      setDescription(permission.description);
    }
  }, [permission]);

  const handleSave = () => {
    onSave({ ...permission, name, description });
  };

  if (!isOpen || !permission) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Permission</h2>
        <div className="form-group">
          <label>Role Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter role name"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
          />
        </div>
        <div className="modal-actions">
          <button onClick={handleSave} className="save-button">
            Save
          </button>
          <button onClick={onClose} className="cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPermissionModal;
