import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import CreatePet from "./components/CreatePet";
import ViewPets from "./components/ViewPets";
import AuthPage from './components/Auth/AuthPage';

function App() {
  const navigate = useNavigate();
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
  }, [navigate, isLoggedIn]); // Afegim `isLoggedIn` per evitar redireccions innecessàries

  // Gestió del logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="App">
      {isLoggedIn} {/* Navbar només si està loguejat */}
      <Routes>
        {/* Rutes d'autenticació */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Home /> // Si està loguejat, enviar a home
            ) : (
              <AuthPage /> // Pàgina d'autenticació
            )
          }
        />
        {/* Rutes protegides */}
        {isLoggedIn && (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/create-pet" element={<CreatePet />} />
            <Route path="/view-pets" element={<ViewPets />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
