import React, { useEffect, useState } from "react";
import Menu from "./Menu.jsx";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { esTokenValido } from "../utils/tokenUtils.js";
import { startLoading, stopLoading } from "../redux/features/loadingSlice.js";
import { obtenerMisReservasService, obtenerTodasLasReservasService } from "../services/reservationServices.js";
import { cargarReservasIniciales } from "../redux/features/reserva/reservaSlice.js";
import { getUsersSlice } from "../redux/features/user/userThunk.js";

const Dashboard = () => {
  const [logueado, setLogueado] = useState(false);
  const [validandoLogin, setValidandoLogin] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const estaLogueado = validarLogueado();
    const tienePermiso = validarRole();


    let cargaUsuarios;

    if (estaLogueado ) {
      cargaInicialReservas();
    }
    
    if (estaLogueado && tienePermiso) { 
      cargaUsuarios = cargaInicialUsuarios();
      cargaInicialAllReservas();
    }

    setValidandoLogin(false);
    setLogueado(estaLogueado);

    return () => {
      cargaUsuarios?.abort();
    };
  }, []);

  const validarLogueado = () => {
    let localStorage = window.localStorage;
    const token = localStorage.getItem("token");
    const estaLogueado = esTokenValido(token);
    return estaLogueado;
  };


  const validarRole = () => {
    let localStorage = window.localStorage;
    const role = localStorage.getItem("role");
    return role == "admin";
  };

  const cargaInicialUsuarios = () => {
    dispatch(startLoading());
    const salida = dispatch(getUsersSlice());
    dispatch(stopLoading());
    return salida;
  };

  const cargaInicialAllReservas = async () => {
    try {
      dispatch(startLoading());
      const reservasAll = await obtenerTodasLasReservasService();
      dispatch(cargarReservasIniciales(reservasAll));
      dispatch(stopLoading());
    } catch (error) {
      console.log("Error al cargar todas las reservas:", error);
    }
  };


  const cargaInicialReservas = async () => {
    try {
      dispatch(startLoading());
      const reservas = await obtenerMisReservasService();
      dispatch(cargarReservasIniciales(reservas));
      dispatch(stopLoading());
    } catch (error) {
      console.log("Error al cargar reservas:", error);
    }
  };

  if (validandoLogin) {
    return <p>Validando credenciales...</p>;
  }

  if (logueado) {
    return (
      <div className="container">
        <Menu />
        <Outlet />
      </div>
    );
  } else {
    return <Navigate to="/login" />;
  }
};

export default Dashboard;