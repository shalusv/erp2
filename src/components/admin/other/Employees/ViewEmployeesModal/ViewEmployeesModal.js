import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import './ViewEmployeesModal.css'


const ViewEmployeeModal = ({ isOpen, onClose, onEdit, onDelete, employee }) => {
  if (!employee) return null;

  // Handle delete with confirmation
  const handleDelete = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the employee: ${employee.name}?`
    );
    if (confirmDelete) {
      onDelete(employee.id);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={onClose}>
      <ModalHeader toggle={onClose}>View Employee</ModalHeader>
      <ModalBody>
        <div>
          <strong>Name:</strong> {employee.name}
        </div>
        <div>
          <strong>Position:</strong> {employee.position}
        </div>
        <div>
          <strong>Department:</strong> {employee.department}
        </div>
        <div>
          <strong>Email:</strong> {employee.email}
        </div>
        <div>
          <strong>Phone:</strong> {employee.phone}
        </div>
        {/* Add more details about the employee here */}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={onClose}>
          Close
        </Button>
        <Button color="primary" onClick={() => onEdit(employee)}>
          Edit
        </Button>
        <Button color="danger" onClick={handleDelete}>
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ViewEmployeeModal;
