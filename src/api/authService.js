// src/api/authService.js
import axios from 'axios';
import { API_URL } from './apiConstants';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/authenticate`, {
      username,
      password,
    });
    const token = response.data;
    localStorage.setItem("token", token); // Guarda el token
  } catch (error) {
    console.error("Error de autenticación:", error);
    throw new Error("Login failed. Please check your credentials.");
  }
};

export const signup = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      username,
      password,
    });
    const token = response.data.token;
    localStorage.setItem("token", token); // Guarda el token
    alert('Registration successful! Please log in.');
  window.location.href = '/login';
  } catch (error) {
    const errorMessage = error.response ? error.response.data : error.message;
    console.error("Error de registro:", error);
    throw new Error("Registration failed. This username might already exist.");
  }
};
