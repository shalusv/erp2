import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import './ViewPermissionModal.css'

const ViewPermissionModal = ({
  isOpen,
  onClose,
  onEdit,
  onDelete,
  permission,
}) => {
  if (!permission) return null;

  // Handle delete with confirmation
  const handleDelete = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the permission: ${permission.name}?`
    );
    if (confirmDelete) {
      onDelete(permission.id);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={onClose}>
      <ModalHeader toggle={onClose}>View Permission</ModalHeader>
      <ModalBody>
        <div>
          <strong>Name:</strong> {permission.name}
        </div>
        <div>
          <strong>Description:</strong> {permission.description}
        </div>
        {/* Add more details about the permission here */}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={onClose}>
          Close
        </Button>
        <Button color="primary" onClick={() => onEdit(permission)}>
          Edit
        </Button>
        <Button color="danger" onClick={handleDelete}>
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ViewPermissionModal;
