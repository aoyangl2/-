// src/components/RegistrationForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    institution: '',
    telephone: '',
    position: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const user = { ...formData, id: uuidv4() }; // Generate a unique ID and create the user object
    try {
      await axios.post('http://localhost:5000/api/register', user); // Send the user data to the backend
      alert('报名成功!'); // Show success notification
      setFormData({
        name: '',
        gender: '',
        institution: '',
        telephone: '',
        position: ''
      }); // Reset the form fields
    } catch (error) {
      console.error('There was an error registering the user:', error); // Log any errors
      alert('报名失败，请重试'); // Show failure notification
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="姓名" required />
      <select name="gender" value={formData.gender} onChange={handleChange} required>
        <option value="">性别</option>
        <option value="Male">男</option>
        <option value="Female">女</option>
        <option value="Other">其他</option>
      </select>
      <input type="text" name="institution" value={formData.institution} onChange={handleChange} placeholder="单位" required />
      <input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} placeholder="手机号码" required />
      <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder="岗位" required />
      <button type="submit">报名</button>
    </form>
  );
};

export default RegistrationForm;
