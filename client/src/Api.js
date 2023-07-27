import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/auth';

const ApiService = {
  signUp: async (username, password) => {
    const payload = { username, password };
    return axios.post(`${BASE_URL}/signup`, payload);
  },
  LogIn: async (username, password) => {
    const payload = { username, password };
    return axios.post(`${BASE_URL}/login`, payload);
  },
  userDetails: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token available. Please log in.");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return axios.get(`${BASE_URL}/userdetails`, config);
  },
};

export default ApiService;