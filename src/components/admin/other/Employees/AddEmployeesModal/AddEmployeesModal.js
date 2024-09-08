import React, { useState, useRef, useEffect } from "react";
import "./AddEmployeesModal.css";
import API_URL from "../../../../../config/config";
import { toast } from "react-toastify";

const AddEmployeeModal = ({ isOpen, onClose, onSave, showToast }) => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const modalRef = useRef(null);
  const nameInputRef = useRef(null); // Create a ref for the name input field

  const handleSave = async () => {
    if (!name || !position || !email) {
      showToast("Please fill in all fields.", "error");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(`${API_URL}/employees`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name, position, email }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 422 && result.errors) {
          showToast(result.errors.join(", "), "error");
        } else {
          showToast(result.error || "Failed to save employee.", "error");
        }
        return;
      }

      showToast("Employee added successfully", "success");
      onSave(result.employee);
      resetForm();
      onClose(); // Close modal only on success
    } catch (error) {
      showToast("Failed to save employee: " + error.message, "error");
    } finally {
      setIsSaving(false);
    }
  };

  const resetForm = () => {
    setName("");
    setPosition("");
    setEmail("");
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
      // Focus on the name input field when the modal opens
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
          <h2>New Employee</h2>
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
          <label>Position</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="Enter position"
            required
          />
        </div>
        <div className="custom-form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
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
            onClick={handleSave}
            className="custom-save-button"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
