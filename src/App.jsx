import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './components/Home'; // Component de la pàgina principal

function App() {
  const navigate = useNavigate(); // useNavigate per a la redirecció programàtica
  const [showLogin, setShowLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estat per controlar si l'usuari està loguejat
  
  // Funció per comprovar si l'usuari ja està loguejat mitjançant el token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);  // L'usuari ja està loguejat, actualitzem l'estat
      navigate('/home'); // Redirigim a la pàgina principal
    }
  }, [navigate]);

  // Funció per manejar l'èxit del login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);  // Quan l'usuari fa login amb èxit, actualitzem l'estat
    navigate('/home'); // Redirigim a la pàgina principal
  };

  return (
    <div className="App">
      {/* Mostrar el títol només si l'usuari no està loguejat */}
      {!isLoggedIn && (
        <h1>Welcome to the Harry Potter Virtual Pet App</h1>
      )}

      {/* Mostrar el formulari de login o registre en funció de l'estat */}
      <Routes>
        <Route 
          path="/" 
          element={showLogin ? (
            <Login onLoginSuccess={handleLoginSuccess} />  // Passa la funció de login amb èxit
          ) : (
            <Register />
          )}
        />

        <Route path="/home" element={<Home />} />
      </Routes>

      {/* Botons per alternar entre Login i Register (només visibles si no està loguejat) */}
      {!isLoggedIn && (
        <button 
          onClick={() => setShowLogin(!showLogin)}
          style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
        >
          {showLogin ? 'Go to Register' : 'Go to Login'}
        </button>
      )}
    </div>
  );
}

export default App;
