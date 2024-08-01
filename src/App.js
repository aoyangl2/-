// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './Components/RegistrationForm';
import Admin from './Components/Admin';
import Login from './Components/Login';

const App = () => {
  return (
    <Router>
      <Routes>

        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<RegistrationForm />} />
      </Routes>
    </Router>
  );
};

export default App;

