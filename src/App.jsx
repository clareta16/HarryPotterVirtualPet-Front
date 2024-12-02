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
  const [showQuidditchGif, setShowQuidditchGif] = useState(false);

  // Toggle the GIF visibility
  const handleQuidditchClick = () => {
    setShowQuidditchGif(!showQuidditchGif); // Toggle visibility of the GIF
  };

  // Comprovar si l'usuari està loguejat
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isLoggedIn) {
      setIsLoggedIn(true);
      navigate("/home"); // Redirect to Home if the user is logged in
    } else if (!token && isLoggedIn) {
      setIsLoggedIn(false);
      navigate("/"); // Redirect to login if no token is found
    }
  }, [navigate, isLoggedIn]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="App">
      {/* Show Harry Potter characters only when we're on the home page */}
      {location.pathname === "/home" && <HarryPotterCharacters />}

      {/* Conditionally render buttons on the Home page */}
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
            <button onClick={() => navigate("/play-quidditch")} className="quidditch-btn">Play Quidditch</button>
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
        {/* Authentication routes */}
        <Route path="/" element={<AuthPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        {isLoggedIn && (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/create-pet" element={<CreatePet />} />
            <Route path="/view-pets" element={<ViewPets />} />
            <Route path="/join-dark-lord" element={
              <div className="dark-lord-container">
                <h1 className="dark-lord-heading">Welcome to the Dark Lord's Army!</h1>
                <img 
                  src="assets/pets/darklord.gif" 
                  className="dark-lord-gif"
                />
              </div>
            } />

            {/* Route for Play Quidditch button */}
            <Route path="/play-quidditch" element={
              <div className="quidditch-container">
                
                {/* Conditional rendering for the Quidditch GIF */}
                {showQuidditchGif && (
                  <div className="quidditch-gif-container">
                    <img 
                      src="assets/pets/quidditch.gif" 
                      alt="Quidditch Game" 
                      className="quidditch-gif"
                    />
                  </div>
                )}
              </div>
            } />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;


