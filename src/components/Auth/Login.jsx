import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error message

    try {
      const response = await axios.post("http://localhost:8080/auth/login", formData, {
        withCredentials: true, // Ensures cookies are sent with the request
      });

      // Assuming response contains a token
      const { token } = response.data;
      localStorage.setItem("token", token); // Store the token in localStorage
      navigate("/pets"); // Redirect to the pets page
    } catch (error) {
      console.error("Login error:", error); // Log error for debugging
      setErrorMessage(
        error.response?.data?.message || "Error during login. Please try again."
      ); // Display the error message
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default Login;
