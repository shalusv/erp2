import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

// Sample employee data (Replace with your actual data source)
const employees = [
  { code: "EMP001", name: "John Doe" },
  { code: "EMP002", name: "Jane Smith" },
  { code: "EMP003", name: "Alice Johnson" },
  // Add more employees as needed
];

const AddUser = ({ show, handleClose, handleSave }) => {
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateCreated, setDateCreated] = useState("");
  const [status, setStatus] = useState("Active");

  useEffect(() => {
    if (!show) {
      setSelectedEmployee("");
      setUserName("");
      setEmail("");
      setPassword("");
      setDateCreated("");
      setStatus("Active");
    }
  }, [show]);

  // Handle employee selection change
  const handleEmployeeChange = (e) => {
    const employeeName = e.target.value;
    setSelectedEmployee(employeeName);
    const employee = employees.find((emp) => emp.name === employeeName);
    if (employee) {
      setUserName(employee.code); // Autofill user name with employee code
    } else {
      setUserName("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      user_name: userName,
      email,
      password,
      date_created: dateCreated,
      status,
    };
    handleSave(newUser);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmployeeName">
            <Form.Label>Select Employee</Form.Label>
            <Form.Control
              as="select"
              value={selectedEmployee}
              onChange={handleEmployeeChange}
            >
              <option value="">Select an employee</option>
              {employees.map((employee) => (
                <option key={employee.code} value={employee.name}>
                  {employee.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formUserName">
            <Form.Label>User Name (Employee Code)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Employee code"
              value={userName}
              readOnly
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </Form.Group>
          <Form.Group controlId="formDateCreated">
            <Form.Label>Date Created</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter date"
              value={dateCreated}
              onChange={(e) => setDateCreated(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Active</option>
              <option>Inactive</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddUser;
