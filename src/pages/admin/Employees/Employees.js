import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import API_URL from "../../../config/config";
import EmployeesTable from "../../../components/admin/other/Employees/EmployeesTable/EmployeesTable";
import AddEmployeeModal from "../../../components/admin/other/Employees/AddEmployeesModal/AddEmployeesModal";
import DeleteEmployeeModal from "../../../components/admin/other/Employees/DeleteEmployeesModal/DeleteEmployeesModal";
import EditEmployeeModal from "../../../components/admin/other/Employees/EditEmployeesModal/EditEmployeesModal";
import ViewEmployeeModal from "../../../components/admin/other/Employees/ViewEmployeesModal/ViewEmployeesModal";
import PageTitle from "../../../components/admin/common/PageTitle/PageTitle";
import "react-toastify/dist/ReactToastify.css";
import "./Employees.css";

const Employees = () => {
  const [searchText, setSearchText] = useState("");
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showDeleteEmployee, setShowDeleteEmployee] = useState(false);
  const [showEditEmployee, setShowEditEmployee] = useState(false);
  const [showViewEmployee, setShowViewEmployee] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch employees from API
  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/employees`);
      console.log('API Response:', response.data);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setErrorMessage("Error fetching employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    setFilteredEmployees(
      (employees || []).filter((employee) =>
        (employee.name || '').toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, employees]);

  // Handle actions
  const handleAddEmployeeClick = () => {
    setShowAddEmployee(true);
    setShowEditEmployee(false);
    setShowViewEmployee(false);
    setShowDeleteEmployee(false);
  };

  const handleCloseAddEmployee = () => {
    setShowAddEmployee(false);
  };

  const handleSaveEmployee = async (employee) => {
    try {
      const response = await axios.post(`${API_URL}/employees`, employee);
      setEmployees((prevEmployees) => [response.data, ...prevEmployees]);
      showToast("Employee added successfully", "success");
    } catch (error) {
      console.error("Error adding employee:", error);
      showToast("Failed to add employee", "error");
    } finally {
      handleCloseAddEmployee();
    }
  };

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setShowEditEmployee(true);
    setShowViewEmployee(false);
    setShowAddEmployee(false);
    setShowDeleteEmployee(false);
  };

  const handleCloseEditEmployee = () => {
    setShowEditEmployee(false);
    setSelectedEmployee(null);
  };

  const handleSaveEditedEmployee = async (updatedEmployee) => {
    try {
      await axios.put(`${API_URL}/employees/${updatedEmployee.id}`, updatedEmployee);
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee.id === updatedEmployee.id ? updatedEmployee : employee
        )
      );
      showToast("Employee updated successfully", "success");
    } catch (error) {
      console.error("Error updating employee:", error);
      showToast("Failed to update employee", "error");
    } finally {
      handleCloseEditEmployee();
    }
  };

  const handleDeleteClick = (employee) => {
    setSelectedEmployee(employee);
    setShowDeleteEmployee(true);
    setShowViewEmployee(false);
    setShowAddEmployee(false);
    setShowEditEmployee(false);
  };

  const handleCloseDeleteEmployee = () => {
    setShowDeleteEmployee(false);
    setSelectedEmployee(null);
  };

  const handleDeleteEmployee = async (employeeId) => {
    try {
      await axios.delete(`${API_URL}/employees/${employeeId}`);
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.id !== employeeId)
      );
      showToast("Employee deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting employee:", error);
      showToast("Failed to delete employee", "error");
    } finally {
      handleCloseDeleteEmployee();
    }
  };

  const handleViewClick = (employee) => {
    setSelectedEmployee(employee);
    setShowViewEmployee(true);
    setShowAddEmployee(false);
    setShowEditEmployee(false);
    setShowDeleteEmployee(false);
  };

  const handleCloseViewEmployee = () => {
    setShowViewEmployee(false);
    setSelectedEmployee(null);
  };

  const showToast = (message, type) => {
    toast.dismiss(); // Dismiss any existing toasts

    if (type === "success") {
      toast.success(message, { position: "top-right" });
    } else {
      toast.error(message, { position: "top-right" });
    }
  };

  return (
    <>
      <PageTitle title="Employees" onAddClick={handleAddEmployeeClick} />
      <div className="employees-container">
        <EmployeesTable
          employees={filteredEmployees}
          onView={handleViewClick}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onAdd={handleAddEmployeeClick}
        />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <AddEmployeeModal
        isOpen={showAddEmployee}
        onClose={handleCloseAddEmployee}
        onSave={handleSaveEmployee}
        showToast={showToast}
      />
      <DeleteEmployeeModal
        isOpen={showDeleteEmployee}
        onClose={handleCloseDeleteEmployee}
        onDelete={() => handleDeleteEmployee(selectedEmployee?.id)}
        employee={selectedEmployee}
      />
      <EditEmployeeModal
        isOpen={showEditEmployee}
        onClose={handleCloseEditEmployee}
        onSave={handleSaveEditedEmployee}
        employee={selectedEmployee}
        showToast={showToast}
      />
      <ViewEmployeeModal
        isOpen={showViewEmployee}
        onClose={handleCloseViewEmployee}
        onEdit={handleEditClick}
        onDelete={handleDeleteEmployee}
        employee={selectedEmployee}
      />
    </>
  );
};

export default Employees;
