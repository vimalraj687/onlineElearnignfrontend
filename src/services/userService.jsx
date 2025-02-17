import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

// Register User
export const registerUser = async (name, email, password) => {
  return await axios.post(`${API_URL}/register`, { name, email, password });
};

// Login User
export const loginUser = async (email, password) => {
  return await axios.post(`${API_URL}/login`, { email, password });
};

// Add New User (Admin functionality)
export const addUser = async (name, email, password, token) => {
  return await axios.post(
    `${API_URL}/add`, 
    { name, email, password },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

// Get All Users
export const getUsers = async (token) => {
  return await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Get Single User
export const getUser = async (id, token) => {
  return await axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Update User
export const updateUser = async (id, userData, token) => {
  return await axios.put(`${API_URL}/${id}`, userData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Delete User
export const deleteUser = async (id, token) => {
  return await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};


// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/users';

// export const loginUser = async (email, password) => {
//   return await axios.post(`${API_URL}/login`, { email, password });
// };

// export const registerUser = async (name, email, password) => {
//   return await axios.post(`${API_URL}/register`, { name, email, password });
// };
