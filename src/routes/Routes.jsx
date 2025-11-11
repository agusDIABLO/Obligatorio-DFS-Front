import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../components/login/Login";
import Register from "../components/Register";
import Dashboard from "../components/Dashboard";
import Contenido from "../components/Contenido";
import Reserva from "../components/Reserva";
import Grafico from "../components/Grafico";
import EditarReserva from "../components/EditarReserva";
import App from "../App";
import EditarTarjeta from "../components/EditarTarjeta";


const Rutas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route index element={<Contenido />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reserva" element={<Reserva />} />
        <Route path="/grafico" element={<Grafico />} />
        <Route path="/editarReserva/:id" element={<EditarTarjeta />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Rutas;

