import React, { useState, useRef, useEffect } from "react";
import "./EditEmployeesModal.css";
import API_URL from "../../../../../config/config";
import { toast } from "react-toastify";

const EditEmployeesModal = ({
  isOpen,
  onClose,
  onSave,
  showToast,
  permission,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [originalName, setOriginalName] = useState(""); // Store the original name
  const [originalDescription, setOriginalDescription] = useState(""); // Store the original description
  const [isSaving, setIsSaving] = useState(false);
  const modalRef = useRef(null);
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (isOpen && permission) {
      // Pre-fill the form fields with existing permission data
      setName(permission.name);
      setDescription(permission.description || "");
      setOriginalName(permission.name); // Save the original name
      setOriginalDescription(permission.description || ""); // Save the original description
    } else {
      resetForm(); // Reset form when modal is closed or permission is not provided
    }
  }, [isOpen, permission]);

  const handleUpdate = async () => {
    if (!name) {
      showToast("Please enter a permission name.", "error");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(`${API_URL}/permissions/${permission.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name, description }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 422 && result.errors && result.errors.name) {
          showToast(result.errors.name.join(", "), "error");
          // Reset form fields to original values if there's a validation error
          setName(originalName);
          setDescription(originalDescription);
        } else {
          showToast(result.error || "Failed to update permission.", "error");
        }
        return;
      }

      onSave(result.permission);
      resetForm();
      onClose(); // Close modal only on success
    } catch (error) {
      showToast("Failed to update permission: " + error.message, "error");
    } finally {
      setIsSaving(false);
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
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
          <h2>Edit Permission</h2>
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
          <label>Permission Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Permission name"
            required
            ref={nameInputRef}
          />
        </div>
        <div className="custom-form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description (optional)"
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

export default EditEmployeesModal;
