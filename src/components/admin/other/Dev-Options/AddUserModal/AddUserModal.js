// src/components/admin/other/Dev-Options/AddUserModal/AddUserModal.js
import React, { useState } from "react";
import "./AddUserModal.css";

const AddUserModal = ({ isOpen, onClose, onSave }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleSave = () => {
    onSave({ username, email, role });
    setUsername("");
    setEmail("");
    setRole("");
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add User</h2>
        <div className="form-group">
          <label>User Name</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter user name"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label>Role</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Enter role"
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

export default AddUserModal;
