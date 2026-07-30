import axios from "axios";

export default axios.create({
  baseURL: "https://tryoutintisari.web.id/api",
  headers: {
    "Content-Type": "application/json",
  },
});
