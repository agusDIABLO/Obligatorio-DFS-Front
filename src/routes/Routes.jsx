import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Contenido />} />
          <Route path="/reserva" element={<Reserva />} />
          <Route path="/grafico" element={<Grafico />} />
          <Route path="/editarReserva/:id" element={<EditarTarjeta />} />      
        </Route>
        <Route path="*" element={<Navigate to="/" replace></Navigate>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Rutas;

