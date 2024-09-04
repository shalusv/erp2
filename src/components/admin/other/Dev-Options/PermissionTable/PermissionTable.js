import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faEye } from "@fortawesome/free-solid-svg-icons";
import "./PermissionTable.css";

const PermissionTable = ({ permissions, onEdit, onDelete, onAdd }) => {
  const columns = [
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div className="action-buttons">
          <button
            className="action-button view-button"
            onClick={() => onEdit(params.row)}
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
    { field: "sno", headerName: "S.No", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "description", headerName: "Description", width: 250 },
    { field: "created_at", headerName: "Created Date", width: 180 },
    { field: "updated_at", headerName: "Updated Date", width: 180 },
  ];

  const rows = permissions.map((permission, index) => ({
    id: permission.id,
    sno: index + 1,
    name: permission.name,
    description: permission.description,
    created_at: new Date(permission.created_at).toLocaleDateString(),
    updated_at: new Date(permission.updated_at).toLocaleDateString(),
  }));

  return (
    <div className="permission-table-container">
      <div className="permission-table-controls">
        <input
          type="text"
          placeholder="Search..."
          className="table-search-input"
        />
        <button
          className="add-new-button"
          onClick={onAdd}
          title="Add Permission"
        >
          Add Permission
        </button>
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        className="data-grid"
      />
    </div>
  );
};

export default PermissionTable;
