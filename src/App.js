import React, { useState } from 'react';
import './App.css';
function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const formChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' }); 
  };

  const formSubmit = (e) => {
    e.preventDefault();
    const newFormErrors = validateForm(formData);
    setFormErrors(newFormErrors);
    if (Object.values(newFormErrors).every((error) => error === '')) {
      console.log('Form submitted:', formData);
    }
  };

  const validateForm = (values) => {
    const errors = {};
    if (values.firstName.trim() === '') {
      errors.firstName = 'First Name can not be empty';
    }
    if (values.lastName.trim() === '') {
      errors.lastName = 'Last Name can not be empty';
    }
    if (values.email.trim() === '') {
      errors.email = 'Email section is empty';
    } 
    else if (!isValidEmail(values.email)) {
      errors.email = 'Invalid email format';
    }
    if (values.password.trim() === '') {
      errors.password = 'Password must be at least 6 characters long';
    } 
    else if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    } 
    else if (/^\d+$/.test(values.password) || /^[a-zA-Z]+$/.test(values.password)) {
      errors.password = 'Password must contain a mix of letters and numbers';
    }

    return errors;
  };
  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  return (
    <div className="main">
      <h1>Login Form</h1>
      <form onSubmit={formSubmit}>
        <div>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={formChange}
          />
          <div className="error">{formErrors.firstName}</div>
        </div>
        <div>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={formChange}
          />
          <div className="error">{formErrors.lastName}</div>
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={formChange}
          />
          <div className="error">{formErrors.email}</div>
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={formChange}
          />
          <div className="error">{formErrors.password}</div>
        </div>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default App;
