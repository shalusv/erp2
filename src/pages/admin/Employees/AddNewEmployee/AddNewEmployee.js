import React from "react";
import PageTitle from "../../../../components/admin/common/PageTitle/PageTitle";
import AddNewEmployeeForm from "../../../../components/admin/other/Employees/AddNewEmployee/AddNewEmployee";
import "./AddNewEmployee.css";

const AddNewEmployee = () => {
  return (
    <>
      <PageTitle title="Employees" page="add" />
      <div className="employees-container">
      <AddNewEmployeeForm />
      </div>
      
    </>
  );
};

export default AddNewEmployee;
