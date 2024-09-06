import React, { useState, useRef, useEffect } from "react";
import "./AddPermissionModal.css";
import API_URL from "../../../../../../config/config";
import { toast } from "react-toastify";

const AddPermissionModal = ({ isOpen, onClose, onSave, showToast }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const modalRef = useRef(null);
  const nameInputRef = useRef(null); // Create a ref for the name input field

  const handleSave = async () => {
    if (!name) {
      showToast("Please enter a permission name.", "error");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(`${API_URL}/permissions`, {
        method: "POST",
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
        } else {
          showToast(result.error || "Failed to save permission.", "error");
        }
        return;
      }

      showToast("Permission created successfully", "success");
      onSave(result.permission);
      resetForm();
      onClose(); // Close modal only on success
    } catch (error) {
      showToast("Failed to save permission: " + error.message, "error");
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
          <h2>New Permission</h2>
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
            ref={nameInputRef} // Attach the ref to the input field
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

export default AddPermissionModal;
