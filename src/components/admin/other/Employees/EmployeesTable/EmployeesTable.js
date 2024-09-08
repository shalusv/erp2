import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel, faFilePdf, faEdit, faTrashAlt, faEye, faPlus } from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./EmployeesTable.css";

const EmployeesTable = ({ employees, onView, onEdit, onDelete, onAdd }) => {
  const [searchText, setSearchText] = useState("");

  const columns = [
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div className="action-buttons">
          <button
            className="action-button view-button"
            onClick={() => onView(params.row)}
            title="View"
          >
            <FontAwesomeIcon icon={faEye} />
          </button>
          <button
            className="action-button edit-button"
            onClick={() => onEdit(params.row)}
            title="Edit"
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            className="action-button delete-button"
            onClick={() => onDelete(params.row)}
            title="Delete"
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      ),
    },
    { field: "id", headerName: "ID", width: 90 },
    { field: "first_name", headerName: "First Name", width: 150 },
    { field: "last_name", headerName: "Last Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "salary", headerName: "Salary", width: 120 },
    { field: "position", headerName: "Position", width: 150 },
    { field: "last_updated", headerName: "Last Updated", width: 180 },
  ];

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "employees.xlsx");
  };

  const handleExportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [columns.map((col) => col.headerName)],
      body: filteredRows.map((employee) =>
        columns.map((col) => {
          if (col.field === "position") {
            return employee.position.position; // Extract position from nested object
          }
          return employee[col.field] || '';
        })
      ),
      margin: { top: 10 },
    });
    doc.save("employees.pdf");
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredRows = employees.filter((employee) => {
    const searchableFields = [
      'first_name',
      'last_name',
      'email',
      'salary',
      'position.position', // Adjusted for nested position
    ];

    return searchableFields.some(field => {
      const value = field.split('.').reduce((obj, key) => (obj && obj[key] ? obj[key] : ''), employee) || '';
      return value.toString().toLowerCase().includes(searchText.toLowerCase());
    });
  });

  return (
    <div className="employees-table-container">
      <div className="employees-table-controls">
        <button
          title="Add Employee"
          onClick={onAdd}
          className="add-new-button"
        >
          <FontAwesomeIcon icon={faPlus} className="icon-add" />
          <span className="add-user-text">Add Employee</span>
        </button>

        <div className="table-search">
          <input
            title="Search inside table"
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        <div className="table-buttons">
          <button
            title="Export to Excel"
            onClick={handleExportToExcel}
            className="export-button excel-button"
          >
            <FontAwesomeIcon icon={faFileExcel} className="icon-export" />
          </button>
          <button
            title="Export to PDF"
            onClick={handleExportToPDF}
            className="export-button pdf-button"
          >
            <FontAwesomeIcon icon={faFilePdf} className="icon-export" />
          </button>
        </div>
      </div>
      <div className="data-grid-container">
        <div className="data-grid" style={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={filteredRows.map((employee, index) => ({
              id: employee.id,
              first_name: employee.first_name,
              last_name: employee.last_name,
              email: employee.email,
              salary: employee.salary,
              position: employee.position.position, // Extract position from nested object
              last_updated: new Date(employee.last_updated).toLocaleDateString(),
            }))}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            disableSelectionOnClick
            className="data-grid"
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeesTable;
