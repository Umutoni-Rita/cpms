// parkingService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/parking";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const fetchParkings = async (page = 1, limit = 5) => {
  const res = await axios.get(`${API_URL}?page=${page}&limit=${limit}`, { headers: getHeaders() });
  return res.data;
};

export const createParking = async (data) => {
  const res = await axios.post(API_URL, data, { headers: getHeaders() });
  return res.data;
};

export const updateParking = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data, { headers: getHeaders() });
  return res.data;
};

export const deleteParking = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, { headers: getHeaders() });
  return res.data;
};
