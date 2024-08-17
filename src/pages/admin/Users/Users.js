import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import dataUsers from "../../../data/data-users"; // Import users data
import "./Users.css";
import PageTitle from "../../../components/admin/common/PageTitle/PageTitle";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "user_name", headerName: "User Name", width: 150 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "date_created", headerName: "Date Created", width: 150 },
  { field: "status", headerName: "Status", width: 100 },
];

const Users = () => {
  const [searchText, setSearchText] = useState("");

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "users.xlsx");
  };

  const handleExportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [columns.map((col) => col.headerName)],
      body: filteredRows.map((user) => columns.map((col) => user[col.field])),
      margin: { top: 10 },
    });
    doc.save("users.pdf");
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredRows = dataUsers.filter((user) =>
    Object.values(user).some((value) =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <>
      <PageTitle title="Users" />
      <div className="users-container">
        <div className="users-controls">
          <div className="table-search">
            <input
              title="Search insde table"
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>
          <div className="table-export">
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
              <FontAwesomeIcon icon={faFilePdf} className="icon-icon-export" />
            </button>
          </div>
        </div>
        <div className="data-grid-container">
          <div className="data-grid" style={{ height: 600, width: "100%" }}>
            <DataGrid
              rows={filteredRows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              checkboxSelection
              disableSelectionOnClick
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
