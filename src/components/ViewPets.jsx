import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewPets() {
  const [pets, setPets] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/pets', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPets(response.data);
      } catch (error) {
        setErrorMessage('Failed to fetch pets: ' + error.message);
      }
    };

    fetchPets();
  }, []);

  return (
    <div>
      <h2>Your Pets</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <div>
        {pets.length === 0 ? (
          <p>No pets found</p>
        ) : (
          pets.map((pet) => (
            <div key={pet.id}>
              <h3>{pet.name}</h3>
              <p>Type: {pet.petType}</p>
              <p>Colour: {pet.colour}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ViewPets;

