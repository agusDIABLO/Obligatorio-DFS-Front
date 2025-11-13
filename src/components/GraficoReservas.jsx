import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Grafico from "./Grafico";

export default function GraficoReservas() {
  const listaReservas = useSelector((state) => state.reservaSlice.list);
  const usersList = useSelector((state) => state.userSlice.list);

  const [reservasPorUsuario, setReservasPorUsuario] = useState([]);
  const [listaUsuarios, setListaUsuarios] = useState([]);

  useEffect(() => {
    // Contar reservas por usuario
    const conteoReservas = listaReservas.reduce((acc, reserva) => {

      const userId = reserva.userId || reserva.user?._id || reserva.user?.id;
      if (userId) acc[userId] = (acc[userId] || 0) + 1;
      return acc;
    }, {});


    // Transformar IDs en nombres
    const userIDs = Object.keys(conteoReservas);
    const nombres = userIDs.map((id) => {
      const user = usersList.find((u) => u.id == id || u._id == id || u.userId == id);
      return user ? user.name : "Desconocido";
    });

    setListaUsuarios(nombres);
    setReservasPorUsuario(Object.values(conteoReservas));
  }, [listaReservas, usersList]);

  return (
    <>
      <h3>Reservas por Usuario</h3>
      <Grafico
        etiquetas={listaUsuarios}
        datos={reservasPorUsuario}
        nombreGrafica="Reservas por Usuario"
        nombreDatos="Cantidad de Reservas"
      />
    </>
  );
}
