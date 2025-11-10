import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../components/login/Login";
import Register from "../components/Register";
import Dashboard from "../components/Dashboard";
import App from "../App";

const Rutas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Rutas;

