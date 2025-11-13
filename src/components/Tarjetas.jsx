import { useState, useEffect } from "react";
import Tarjeta from "./Tarjeta";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { getReservationsSlice } from "../redux/features/reserva/reservaThunk";


const Tarjetas = () => {
  const dispatch = useDispatch();
  const reservas = useSelector((state) => state.reservasSlice.list || []);

  const [fechaFiltro, setFechaFiltro] = useState("");
  const [listaFiltrada, setListaFiltrada] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();

  useEffect(() => {
    dispatch(getReservationsSlice());
  }, [dispatch]);

  useEffect(() => {
    const fechaURL = searchParam.get("fecha");
    setFechaFiltro(fechaURL || "");
    aplicarFiltro(fechaURL);
  }, [reservas]);

  const handleChangeFecha = (e) => {
    setFechaFiltro(e.target.value);
  };

  const handleBuscar = () => {
    aplicarFiltro(fechaFiltro);
  };

  const aplicarFiltro = (fecha) => {
    const sorted = [...reservas].sort((a, b) => {
      const ta = a && a.reservationDateTime ? new Date(a.reservationDateTime).getTime() : 0;
      const tb = b && b.reservationDateTime ? new Date(b.reservationDateTime).getTime() : 0;
      return ta - tb;
    });

    let auxList = sorted;
    if (fecha) {
      auxList = sorted.filter((r) => {
        if (!r.reservationDateTime) return false;
        const d = new Date(r.reservationDateTime);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        const localDate = `${yyyy}-${mm}-${dd}`;
        return localDate === fecha;
      });
      setSearchParam({ fecha });
    } else {
      setSearchParam({});
    }

    setListaFiltrada(auxList);
  };

  useEffect(() => {
  }, [listaFiltrada]);

  return (
    <>
      <div style={{ marginBottom: "1rem" }} className="separar10pxArriba">
        <input
          type="date"
          value={fechaFiltro}
          onChange={handleChangeFecha}
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleBuscar} className="btn-filtrar">Filtrar</button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Servicio</th>
            <th>Estado</th>
            <th></th>
            <th>Imagen</th>
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