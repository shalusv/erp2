import React, { useState, useRef, useEffect } from "react";
import "./EditEmployeesModal.css";
import API_URL from "../../../../../config/config";
import { toast } from "react-toastify";

const EditEmployeeModal = ({ isOpen, onClose, onSave, showToast, employee }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [originalName, setOriginalName] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");
  const [originalPosition, setOriginalPosition] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const modalRef = useRef(null);
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (isOpen && employee) {
      setName(employee.name);
      setEmail(employee.email || "");
      setPosition(employee.position || "");
      setOriginalName(employee.name);
      setOriginalEmail(employee.email || "");
      setOriginalPosition(employee.position || "");
    } else {
      resetForm();
    }
  }, [isOpen, employee]);

  const handleUpdate = async () => {
    if (!name || !email || !position) {
      showToast("Please fill out all fields.", "error");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(`${API_URL}/employees/${employee.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name, email, position }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 422 && result.errors) {
          showToast(result.errors.join(", "), "error");
          setName(originalName);
          setEmail(originalEmail);
          setPosition(originalPosition);
        } else {
          showToast(result.error || "Failed to update employee.", "error");
        }
        return;
      }

      onSave(result.employee);
      resetForm();
      onClose();
    } catch (error) {
      showToast("Failed to update employee: " + error.message, "error");
    } finally {
      setIsSaving(false);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPosition("");
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
      resetForm();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      if (nameInputRef.current) {
        nameInputRef.current.focus();
      }
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content" ref={modalRef}>
        <div className="custom-modal-header">
          <h2>Edit Employee</h2>
          <button
            className="custom-close-button"
            onClick={() => {
              onClose();
              resetForm();
            }}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <div className="custom-form-group">
          <label>Employee Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter employee name"
            required
            ref={nameInputRef}
          />
        </div>
        <div className="custom-form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            required
          />
        </div>
        <div className="custom-form-group">
          <label>Position</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="Enter position"
            required
          />
        </div>
        <div className="custom-modal-actions">
          <button
            onClick={() => {
              onClose();
              resetForm();
            }}
            className="custom-cancel-button"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="custom-save-button"
            disabled={isSaving}
          >
            {isSaving ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
