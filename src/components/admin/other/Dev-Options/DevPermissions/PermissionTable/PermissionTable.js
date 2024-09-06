import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileExcel,
  faFilePdf,
  faEdit,
  faTrashAlt,
  faEye,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./PermissionTable.css";

const PermissionTable = ({ permissions, onView, onEdit, onDelete, onAdd }) => {
  const [searchText, setSearchText] = useState("");

  const columns = [
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <div className="action-buttons">
          <button
            className="action-button view-button"
            onClick={() => onView(params.row)} // Updated to onView
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
    { field: "name", headerName: "Name", width: 150 },
    { field: "description", headerName: "Description", width: 250 },
    { field: "created_at", headerName: "Created Date", width: 180 },
    { field: "updated_at", headerName: "Updated Date", width: 180 },
  ];

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Permissions");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "permissions.xlsx");
  };

  const handleExportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [columns.map((col) => col.headerName)],
      body: filteredRows.map((permission) =>
        columns.map((col) => permission[col.field])
      ),
      margin: { top: 10 },
    });
    doc.save("permissions.pdf");
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredRows = permissions.filter((permission) =>
    Object.values(permission).some((value) =>
      value?.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <>
      <div className="permission-table-container">
        <div className="permission-table-controls">
          <button
            title="Add Permission"
            onClick={onAdd}
            className="add-new-button"
          >
            <FontAwesomeIcon icon={faPlus} className="icon-add" />
            <span className="add-user-text">Add Permission</span>
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
              title="Export to Pdf"
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
              rows={filteredRows.map((permission, index) => ({
                ...permission,
                sno: index + 1,
                created_at: new Date(
                  permission.created_at
                ).toLocaleDateString(),
                updated_at: new Date(
                  permission.updated_at
                ).toLocaleDateString(),
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
    </>
  );
};

export default PermissionTable;
