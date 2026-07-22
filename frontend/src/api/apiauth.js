import api from "./axios";

// ====================
// LOGIN
// ====================
export const login = async (email, password) => {
  const response = await api.post("/login", {
    email,
    password,
  });

  return response.data;
};

// ====================
// LOGOUT
// ====================
export const logout = async () => {
  const response = await api.post("/logout");

  localStorage.removeItem("token");
  localStorage.removeItem("user");

  return response.data;
};

// ====================
// GET USER LOGIN
// ====================
export const getProfile = async () => {
  const response = await api.get("/profile");

  return response.data;
};

// ====================
// UPDATE PROFILE
// ====================
export const updateProfile = async (data) => {
  const response = await api.put("/profile", data);

  return response.data;
};

// ====================
// CHANGE PASSWORD
// ====================
export const changePassword = async (data) => {
  const response = await api.put("/change-password", data);

  return response.data;
};
