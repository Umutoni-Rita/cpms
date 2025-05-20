import React from "react";
import {jwtDecode}  from "jwt-decode";
import ParkingList from "../components/ParkingList";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  let isAdmin = false;
  const navigate = useNavigate();

  if (token) {
    try {
      const decoded = jwtDecode(token);
      // Adjust this key to whatever your token uses for role
      isAdmin = decoded.role === "ADMIN";
    } catch (e) {
      console.error("Invalid token:", e);
    }
  }
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <nav className="flex justify-between items-center border-b border-[#1A6A6E] p-4 text-white">
        <div className="text-xl font-bold text-[#1A6A6E]">CPMS</div>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
        >
          Logout
        </button>
      </nav>
      <ParkingList isAdmin={isAdmin} />
    </>
  );
};

export default Dashboard;
