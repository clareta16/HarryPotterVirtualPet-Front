import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./components/Home";
import CreatePet from "./components/CreatePet";
import ViewPets from "./components/ViewPets";
import AuthPage from './components/Auth/AuthPage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import HarryPotterCharacters from './HarryPotterCharacters'; 
import './styles.css';

function App() {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Comprovar si l'usuari està loguejat
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isLoggedIn) {
      setIsLoggedIn(true);
      navigate("/home"); // Redirigeix a Home només si no estem loguejats
    } else if (!token && isLoggedIn) {
      setIsLoggedIn(false);
      navigate("/"); // Redirigeix a la pàgina de login si no hi ha token
    }
  }, [navigate, isLoggedIn]);

  // Gestió del logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="App">
      {/* Mostrar les icones de Harry Potter només quan estem a la pàgina Home */}
      {location.pathname === "/home" && <HarryPotterCharacters />}

      {/* Conditionally render these buttons only if we are on the Home page */}
      {location.pathname === "/home" && (
        <div className="container">
          <div className="hp-character griffindor" role="img" aria-label="Harry Potter">
            <button onClick={() => navigate("/create-pet")} className="create-pet-btn">Create Pet</button>
          </div>
          <div className="hp-character slytherin" role="img" aria-label="Draco Malfoy">
            <button onClick={() => navigate("/join-dark-lord")} className="join-dark-lord-btn">Join Dark Lord</button>
          </div>
          <div className="hp-character ravenclaw" role="img" aria-label="Luna Lovegood">
            <button onClick={() => navigate("/view-pets")} className="view-pets-btn">View All Pets</button>
          </div>
          <div className="hp-character hufflepuff" role="img" aria-label="Cedric Diggory">
            <button onClick={() => alert("Play Quidditch!")} className="quidditch-btn">Play Quidditch</button>
          </div>
        </div>
      )}

      <nav>
        <button onClick={() => navigate("/home")} style={{ marginRight: '10px' }}>Home</button>
        {isLoggedIn ? (
          <>
            <button onClick={handleLogout}>Log out</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/login")}>Log In</button>
            <button onClick={() => navigate("/register")}>Register</button>
          </>
        )}
      </nav>

      <Routes>
        {/* Rutes d'autenticació */}
        <Route path="/" element={<AuthPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Rutes protegides */}
        {isLoggedIn && (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/create-pet" element={<CreatePet />} />
            <Route path="/view-pets" element={<ViewPets />} />
            <Route path="/join-dark-lord" element={
              <div className="dark-lord-container">
                <h1 className="dark-lord-heading">Welcome to the Dark Lord's Army!</h1>
                <img 
                  src="public/assets/pets/darklord.gif" 
                  className="dark-lord-gif"
                />
              </div>
            } />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
