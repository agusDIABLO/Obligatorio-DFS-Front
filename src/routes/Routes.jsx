import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../components/login/Login";
import Register from "../components/Register";
import Dashboard from "../components/Dashboard";
import Reserva from "../components/Reserva";
import Grafico from "../components/Grafico";
import EditarReserva from "../components/EditarReserva";
import App from "../App";

const Rutas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reserva" element={<Reserva />} />
        <Route path="/grafico" element={<Grafico />} />
        <Route path="/editar-reserva/:id" element={<EditarReserva />} />  
      </Routes>
    </BrowserRouter>
  );
};

export default Rutas;

