// src/pages/admin/Employees/AddNewEmployee/AddNewEmployee.js

import React from 'react';
import './AddNewEmployee.css';

const AddNewEmployee = () => {
  return (
    <>
      <form className="add-new-employee-form">
        <h3 className='custom-page-title'>Add New Employee</h3>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="firstName">First Name*</label>
            <input
              type="text"
              id="firstName"
              className="form-control"
              placeholder="Enter first name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              className="form-control"
              placeholder="Enter last name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobile">Mobile</label>
            <input
              type="tel"
              id="mobile"
              className="form-control"
              placeholder="Enter mobile"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="salary">Salary</label>
            <input
              type="number"
              id="salary"
              className="form-control"
              placeholder="Enter salary"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="position">Position</label>
            <input
              list="positions"
              id="position"
              className="form-control"
              placeholder="Select position"
              required
            />
            <datalist id="positions">
              <option value="Manager" />
              <option value="Developer" />
              <option value="Designer" />
              <option value="Tester" />
            </datalist>
          </div>
          <div className="form-group gender-group">
            <label>Gender</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="1"
                  required
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="2"
                  required
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="3"
                  required
                />
                Other
              </label>
            </div>
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="custom-save-button">Save</button>
        </div>
      </form>
    </>
  );
};

export default AddNewEmployee;
