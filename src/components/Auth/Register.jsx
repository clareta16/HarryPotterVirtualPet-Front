// src/components/Auth/Register.jsx
import React, { useState } from 'react';
import { signup } from '../../api/authService'; // Importa la funció de registre des de l'API

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Registering with", username, password);
    setErrorMessage(''); // Reseteja el missatge d'error abans de fer el submit

    try {
      // Crida a la funció de registre
      await signup(username, password);
      // Si el registre és correcte, pots redirigir l'usuari al login
      alert('Registration successful! Please log in.');
      window.location.href = '/login';  // Redirigeix a la pàgina de login
    } catch (error) {
      setErrorMessage('Registration failed: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
}

export default Register;
