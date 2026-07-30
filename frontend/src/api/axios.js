import axios from "axios";

const api = axios.create({
  baseURL: "https://tryoutintisari.web.id/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
