// src/components/admin/other/Dev-Options/UserTable/UserTable.js
import React from "react";
import "./UserTable.css";

const UserTable = ({ users, onView, onEdit, onDelete }) => {
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>#</th>
          <th>User Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user.id}>
            <td>{index + 1}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <button onClick={() => onView(user)}>View</button>
              <button onClick={() => onEdit(user)}>Edit</button>
              <button onClick={() => onDelete(user)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
