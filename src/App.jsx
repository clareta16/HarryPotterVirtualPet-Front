import React, { useState } from 'react';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

function App() {
  // State to toggle between login and register forms
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="App">
      <h1>Welcome to the Harry Potter Virtual Pet App</h1>

      {/* Display login or register based on the showLogin state */}
      {showLogin ? (
        <Login />
      ) : (
        <Register />
      )}

      {/* Button to toggle between login and register forms */}
      <button 
        onClick={() => setShowLogin(!showLogin)}
        style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        {showLogin ? 'Go to Register' : 'Go to Login'}
      </button>
    </div>
  );
}

export default App;
