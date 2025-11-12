import React, { useState, useEffect } from "react";
import Tarjeta from "./Tarjeta";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { getReservationsSlice } from "../redux/features/reserva/reservaThunk";

const Tarjetas = () => {
  // seleccionar la lista de reservas (el slice guarda { list, loading, error })
  const dispatch = useDispatch();


  const reservas = useSelector((state) => state.reservasSlice.list || []);
  console.log('reservas', reservas)

  const [fechaFiltro, setFechaFiltro] = useState("");
  const [listaFiltrada, setListaFiltrada] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();


  useEffect(() => {
    dispatch(getReservationsSlice());
  }, [dispatch]);

  useEffect(() => {
    const fechaURL = searchParam.get("fecha");
    aplicarFiltro(fechaURL);
  }, [reservas]);

  const handleChangeFecha = (e) => {
    setFechaFiltro(e.target.value);
  };

  const handleBuscar = () => {
    aplicarFiltro(fechaFiltro);
  };

  const aplicarFiltro = (fecha) => {
    let auxList = reservas;
    console.log('reservas en el filtro', reservas)
    if (fecha) {
      
      auxList = reservas.filter((r) => r.fechaReserva == fecha);
      setSearchParam({ fecha });
    } else {
      setSearchParam({});
    }
    setListaFiltrada(auxList);
  };

  // loguear sólo cuando cambie la lista filtrada para evitar logs por cada render
  useEffect(() => {
    console.log('listaFiltrada', listaFiltrada);
  }, [listaFiltrada]);

  return (
    <>
      <div style={{ marginBottom: "1rem" }} class="separar10pxArriba">
        <input
          type="date"
          value={fechaFiltro}
          onChange={handleChangeFecha}
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleBuscar} class="btn-filtrar">Filtrar</button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>

            <th>Cliente</th>
            <th>Fecha</th>
            <th>Servicio</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listaFiltrada.map((r) => (
            
            <Tarjeta key={r._id} {...r} />
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Tarjetas;