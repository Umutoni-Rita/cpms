// src/components/RegisterForm.js
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "USER",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Updates form state when any input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Send data to backend using the registerUser function
      await registerUser(formData);
      alert("Registration successful! Please log in.");
      navigate('/');
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        role: "USER",
        password: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-1/2 max-w-md bg-white p-8 rounded-lg shadow-lg border border-[#1A6A6E]">
      <h1 className="text-2xl font-bold text-[#1A6A6E] mb-6 text-center">Register</h1>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="e.g., John"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            required
          />
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="e.g., Doe"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            required
          />
        </div>

        {/* Role Selector */}
        <div>
          <label htmlFor="role" className="text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            name="role"
            id="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            required
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="ATTENDANT">Attendant</option>
          </select>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 mt-4 bg-[#1A6A6E] text-white rounded-md hover:bg-teal-700 transition-colors ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {/* Link to login page */}
      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account?{" "}
        <Link to="/" className="text-[#1A6A6E] hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
