import React, { useState, useEffect } from "react";
import Tarjeta from "./Tarjeta";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

const Tarjetas = () => {
  // seleccionar la lista de reservas (el slice guarda { list, loading, error })
  const reservas = useSelector((state) => state.reservasSlice.list || []);
  const [fechaFiltro, setFechaFiltro] = useState("");
  const [listaFiltrada, setListaFiltrada] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();

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
    if (fecha) {
      
      auxList = reservas.filter((r) => r.fechaReserva === fecha);
      setSearchParam({ fecha });
    } else {
      setSearchParam({});
    }
    setListaFiltrada(auxList);
  };

  console.log('listaFiltrada', listaFiltrada)

  return (
    <>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="date"
          value={fechaFiltro}
          onChange={handleChangeFecha}
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleBuscar}>Filtrar</button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
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