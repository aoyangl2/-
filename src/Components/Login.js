import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();
  
  const handleAdminClick = () => {
    navigate('/admin');
  };
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://120.26.81.229:5000/api/login', { username, password });
      if (response.data.success) {
        // Redirect to admin page
        handleAdminClick();
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <>
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
    </>
  );
};

export default Login;
