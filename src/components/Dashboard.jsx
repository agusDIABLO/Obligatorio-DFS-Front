import React, { useEffect, useState } from "react";
import Menu from "./Menu.jsx";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { esTokenValido } from "../utils/tokenUtils.js";
import { startLoading, stopLoading } from "../redux/features/loadingSlice.js";
import { obtenerMisReservasService } from "../services/reservationServices.js";
import { cargarReservasIniciales } from "../redux/features/reserva/reservaSlice.js";
import { getUsersSlice } from "../redux/features/user/userSlice.js";

const Dashboard = () => {
  const [logueado, setLogueado] = useState(false);
  const [validandoLogin, setValidandoLogin] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const estaLogueado = validarLogueado();

    let cargaUsuarios;

    if (estaLogueado) {
      cargaInicialReservas();
      cargaUsuarios = cargaInicialUsuarios();
    }

    setValidandoLogin(false);
    setLogueado(estaLogueado);

    return () => {
      cargaUsuarios?.abort();
    };
  }, []);

  const validarLogueado = () => {
    const token = localStorage.getItem("token");
    const estaLogueado = esTokenValido(token);
    return estaLogueado;
  };

  const cargaInicialUsuarios = () => {
    dispatch(startLoading());
    const salida = dispatch(getUsersSlice());
    dispatch(stopLoading());
    return salida;
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
      <div >
        <Menu />
        <Outlet />
      </div>
    );
  } else {
    return <Navigate to="/login" />;
  }
};

export default Dashboard;