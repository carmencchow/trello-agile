import axios from "axios";

const api = axios.create({
//   baseURL: "http://localhost:5000/api/",
  baseURL: "https://trello-agile-project.onrender.com/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Set the Authorization header before each request with updated token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export { api };
