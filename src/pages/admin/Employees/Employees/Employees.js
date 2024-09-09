import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../../../../config/config";
import EmployeesTable from "../../../../components/admin/other/Employees/EmployeesTable/EmployeesTable";
import PageTitle from "../../../../components/admin/common/PageTitle/PageTitle";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Employees.css";

const Employees = () => {
  const [searchText, setSearchText] = useState("");
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  // Fetch employees from API
  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/employees`);
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

  const handleAddClick = () => {
    navigate('/admin/add-employee'); // Navigate to the AddNewEmployee page
  };

  return (
    <>
      <PageTitle title="Employees" page="list"/>
      <div className="employees-container">
        <EmployeesTable employees={filteredEmployees} />
      </div>
    </>
  );
};

export default Employees;
