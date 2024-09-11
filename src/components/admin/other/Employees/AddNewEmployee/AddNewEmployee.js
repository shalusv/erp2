import React, { useState, useEffect } from 'react';
import './AddNewEmployee.css';
import API_URL from '../../../../../config/config';

const AddNewEmployee = () => {
  const [positions, setPositions] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    position: '',
    email: '',
    mobile: '',
    dob: '',
    doj: ''
  });
  const [errors, setErrors] = useState({});

  // Fetch positions from the API when the component mounts
  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await fetch(`${API_URL}/positions`); 
        const data = await response.json();
        setPositions(data);
      } catch (error) {
        console.error('Error fetching positions:', error);
      }
    };

    fetchPositions();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    }
    if (!formData.mobile) {
      newErrors.mobile = 'Mobile number is required';
    }
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }
    if (!formData.position) {
      newErrors.position = 'Position is required';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      // Submit the form (e.g., make an API call)
      console.log('Form submitted', formData);
      // Reset form or navigate to another page
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <>
      <form className="add-new-employee-form" onSubmit={handleSubmit}>
        <h3 className="custom-page-title">Add New Employee</h3>
        <div className="form-grid">
          {/* First Name */}
          <div className="form-group">
            <label htmlFor="firstName">First Name<span className="required">*</span></label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className={`form-control ${errors.firstName ? 'error' : ''}`}
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
          </div>

          {/* Last Name */}
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="form-control"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          {/* Gender */}
          <div className="form-group gender-group">
            <label>Gender<span className="required">*</span></label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="1"
                  checked={formData.gender === 'Male'}
                  onChange={handleChange}
                /> Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="2"
                  checked={formData.gender === 'Female'}
                  onChange={handleChange}
                /> Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="3"
                  checked={formData.gender === 'Other'}
                  onChange={handleChange}
                /> Other
              </label>
            </div>
            {errors.gender && <span className="error-message">{errors.gender}</span>}
          </div>

          {/* Position */}
          <div className="form-group">
            <label htmlFor="position">Position<span className="required">*</span></label>
            <input
              list="positions"
              id="position"
              name="position"
              className={`form-control ${errors.position ? 'error' : ''}`}
              placeholder="Select position"
              value={formData.position}
              onChange={handleChange}
            />
            <datalist id="positions">
              {positions.map((position) => (
                <option key={position.id} value={position.position} />
              ))}
            </datalist>
            {errors.position && <span className="error-message">{errors.position}</span>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email<span className="required">*</span></label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-control ${errors.email ? 'error' : ''}`}
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          {/* Mobile */}
          <div className="form-group">
            <label htmlFor="mobile">Mobile<span className="required">*</span></label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              className={`form-control ${errors.mobile ? 'error' : ''}`}
              placeholder="Enter mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
            {errors.mobile && <span className="error-message">{errors.mobile}</span>}
          </div>

          {/* Date of Birth (DOB) */}
          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              className="form-control"
              value={formData.dob}
              onChange={handleChange}
            />
          </div>

          {/* Date of Join (DOJ) */}
          <div className="form-group">
            <label htmlFor="doj">Date of Join</label>
            <input
              type="date"
              id="doj"
              name="doj"
              className="form-control"
              value={formData.doj}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button type="submit" className="custom-save-button">Save</button>
        </div>
      </form>
    </>
  );
};

export default AddNewEmployee;
