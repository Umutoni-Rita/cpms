import axios from "axios";

const BASE_URL = "http://localhost:5000/api/auth";

export const registerUser = async (formData) => {
    const payload = {
    first_name: formData.firstName,
    last_name: formData.lastName,
    email: formData.email,
    role: formData.role,
    password: formData.password,
  };
  try {
    const response = await axios.post(`${BASE_URL}/register`, payload, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};
export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, formData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};