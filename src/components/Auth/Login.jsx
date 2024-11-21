// src/components/Auth/Login.jsx
import React, { useState } from 'react';
import axios from 'axios'; // Import axios


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(''); 
    console.log('Submitting:', username, password);// Clear previous error message

    try {
      // Making the POST request to the backend
      const response = await axios.post('http://localhost:8080/auth/login', 
        { username, password }, 
        { withCredentials: true } // Ensures cookies/credentials are sent with the request
      );

      const {token} = response.data;

      // Handle successful login here
      console.log('Login successful:', response.data);
      localStorage.setItem('token', token);
      
      // Redirect the user to the dashboard (or wherever you want after login)
      window.location.href = '/dashboard';  // You can replace '/dashboard' with your desired route

    } catch (error) {
      console.error('Error during authentication', error);
      setErrorMessage('Login failed: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
      
      {/* Display error message if login fails */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </form>
  );
}

export default Login;

