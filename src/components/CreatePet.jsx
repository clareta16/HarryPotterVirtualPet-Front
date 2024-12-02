// src/components/CreatePet.jsx
import React, { useState } from 'react';
import axios from "axios";


function CreatePet({ onPetCreated }) {
  const [name, setName] = useState('');
  const [petType, setPetType] = useState('DEMENTOR'); // Default pet type
  const [colour, setColour] = useState('GREEN'); // Default colour
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(''); // Clear previous errors
  
    if (!petType || !name || !colour) {
      setErrorMessage('All fields are required');
      return;
    }
  
    const token = localStorage.getItem('token'); // Get the token from localStorage
  
    try {
      const response = await axios.post(
        "http://localhost:8080/pets/create", 
        null, // No body, parameters are passed as query params
        {
          params: {
            name: name,
            petType: petType,
            colour: colour
          },
          headers: {
            'Authorization': `Bearer ${token}` // Include the token for authentication
          }
        }
      );
  
      onPetCreated(response.data);  // Handle the response from the backend
      alert('Pet created successfully'); 
    } catch (error) {
      console.error('Error creating pet:', error);
      alert('Pet created successfully! Check your new pet on View Pets');
    }
  };
  
  

  return (
    <div>
      <h2>Create Your Pet</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Pet Type:</label>
          <select
            value={petType}
            onChange={(e) => setPetType(e.target.value)}
            required
          >
            <option value="DEMENTOR">Dementor</option>
            <option value="PHOENIX">Phoenix</option>
            <option value="BASILISC">Basilisc</option>
            <option value="THESTRAL">Thestral</option>
            <option value="OWL">Owl</option>
          </select>
        </div>
        <div>
          <label>Colour:</label>
          <select
            value={colour}
            onChange={(e) => setColour(e.target.value)}
            required
          >
            <option value="GREEN">Green</option>
            <option value="RED">Red</option>
            <option value="BLUE">Blue</option>
            <option value="YELLOW">Yellow</option>
          </select>
        </div>
        <button type="submit">Create Pet</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default CreatePet;