import axios from 'axios';

// Your Laravel backend URL
const API_BASE_URL = 'http://localhost:8000/api';

// Set up a global Axios instance for consistent headers, like the Authorization token.
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to set Authorization token after login
export const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

// Authentication Methods

// Login
export const login = async (credentials) => {
  try {
    const response = await apiClient.post('/login', credentials);
    const { token } = response.data;

    // Set the Authorization token for future requests
    setAuthToken(token);

    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Logout
export const logout = async () => {
  try {
    const response = await apiClient.post('/logout');
    // Clear the Authorization token after logout
    setAuthToken(null);
    return response.data;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};



// CRUD Operations for Users

// Fetch all users
export const getUsers = async () => {
  try {
    const response = await apiClient.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Fetch a single user by ID
export const getUserById = async (userId) => {
  try {
    const response = await apiClient.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// Create a new user
export const createUser = async (userData) => {
  try {
    const response = await apiClient.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Update an existing user
export const updateUser = async (userId, userData) => {
  try {
    const response = await apiClient.put(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Delete a user
export const deleteUser = async (userId) => {
  try {
    const response = await apiClient.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};






