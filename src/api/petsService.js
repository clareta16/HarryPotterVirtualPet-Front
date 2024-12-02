import axiosInstance from './axiosInstance'; // Importem l'instància configurada



export const getAllPets = async () => {
  return axiosInstance.get('/pets');
};

export const createPet = async (petData, token) => {
  const response = await axiosInstance.post('/pets/create', petData, {
    headers: {
      'Authorization': `Bearer ${token}` // Pass the token in the header if required
    }
  });
  return response.data; // Return the created pet data
};

export const deletePet = async (petId) => {
  return axiosInstance.delete(`/pets/${petId}`);
};

export const updatePet = async (petId, updatedData) => {
  return axiosInstance.put(`/pets/${petId}`, updatedData);
};

export const interactWithPet = (petId, action) => {
  return axiosInstance.put(`/pets/${petId}`, null, {
    params: { action },  // Add action as query parameter
  });
};
