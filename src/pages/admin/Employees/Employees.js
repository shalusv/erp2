import React from "react";
import "./Employees.css"; // Import CSS for Dashboard
import { NavLink } from "react-router-dom";
import { FaUserTie } from "react-icons/fa";
import PageTitle from "../../../components/admin/common/PageTitle/PageTitle";

const Employees = () => {
  return (
    <div>
      <PageTitle title="Employees" />
    </div>
  );
};

export default Employees;
