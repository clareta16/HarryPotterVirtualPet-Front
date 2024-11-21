import React, { useState } from 'react';
import axios from 'axios'; // Importar axios
import { useNavigate } from 'react-router-dom';

function Login({ onLoginSuccess }) { // Afegim la funció onLoginSuccess com a prop
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(''); // Netejar el missatge d'error previ
    console.log('Submitting:', username, password); // Imprimir a la consola les dades

    try {
      // Feu la sol·licitud POST al backend
      const response = await axios.post('http://localhost:8080/auth/login', 
        { username, password }, 
        { withCredentials: true } // Assegura't que les cookies/credencials s'enviïn amb la sol·licitud
      );

      const { token } = response.data;

      // Manejar login correcte aquí
      console.log('Login successful:', response.data);
      localStorage.setItem('token', token); // Guardar el token al localStorage

      // Cridem la funció onLoginSuccess passada com a prop per actualitzar l'estat a l'App.js
      onLoginSuccess();

      navigate('/home'); // Redirigir a la pàgina principal
    } catch (error) {
      console.error('Error during authentication', error);
      setErrorMessage('Login failed: ' + (error.response ? error.response.data.message : error.message)); // Mostrar error
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

      {/* Mostrar missatge d'error si el login falla */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </form>
  );
}

export default Login;