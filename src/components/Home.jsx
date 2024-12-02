import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Home.css'; // Ensure you import your CSS for styling

function Home() {
  const navigate = useNavigate(); // useNavigate for navigation

  // Function to create a new pet
  const createPet = () => {
    navigate('/create-pet'); // Navigate to the create-pet route
  };

  // Function to view user's pets
  const viewPets = () => {
    navigate('/view-pets'); // Navigate to the view-pets route
  };

  return (
    <div className="home-container">
      <h1 className="welcome-title">Welcome to Hogwarts!</h1>
      <h2 className="welcome-title2">Train your pets until they are ready to fight the Dark Lord!</h2>
     
    </div>
  );
}

export default Home;


