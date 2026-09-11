import axios from "axios";

// Base Axios configuration for our Spring Boot backend
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach the JWT token to protected API requests
api.interceptors.request.use((config) => {

  // Get logged-in user information from localStorage
  const savedUser = localStorage.getItem("user");

  if (savedUser) {
    const user = JSON.parse(savedUser);

    // Add JWT token to the Authorization header
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
  }

  return config;
});

export default api;