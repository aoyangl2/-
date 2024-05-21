// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './Components/RegistrationForm';
import Admin from './Components/Admin';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<RegistrationForm />} />
      </Routes>
    </Router>
  );
};

export default App;

