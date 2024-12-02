// src/components/PetList.jsx
import React, { useState, useEffect } from 'react';
import CreatePet from './CreatePet';

function PetList() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    // This could be an API call to get the initial list of pets when the component mounts
    // For example: fetchPets();
  }, []);

  const handlePetCreated = (newPet) => {
    // Add the new pet to the list
    setPets((prevPets) => [...prevPets, newPet]);
  };

  return (
    <div>
      <h1>My Pets</h1>
      
      {/* Pass handlePetCreated as prop to CreatePet */}
      <CreatePet onPetCreated={handlePetCreated} />
      
      {/* Render the list of pets */}
      <ul>
        {pets.map((pet) => (
          <li key={pet.id}>{pet.name} - {pet.petType} - {pet.colour}</li>
        ))}
      </ul>
    </div>
  );
}

export default PetList;
