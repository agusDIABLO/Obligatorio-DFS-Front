import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Grafico from "./Grafico";

const meses= [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export default function GraficoMeses({ year }) {
  const listaReservas = useSelector((state) => (state.reservasSlice && state.reservasSlice.list) || []);
  const [datosPorMes, setDatosPorMes] = useState(Array(12).fill(0));

  useEffect(() => {
    const y = year || new Date().getFullYear();
    const conteo = Array(12).fill(0);

    listaReservas.forEach((r) => {
      const fechaStr = r.reservationDateTime || r.reservation_date || r.fechaReserva || r.date;
      if (!fechaStr) return;
      const d = new Date(fechaStr);
      if (isNaN(d)) return;
      const anio = d.getFullYear();
      if (anio !== Number(y)) return;
      const mes = d.getMonth();
      conteo[mes] = (conteo[mes] || 0) + 1;
    });
    
    setDatosPorMes(conteo);
  }, [listaReservas, year]);

  return (
    <>
      <h3>Reservas por Mes ({year || new Date().getFullYear()})</h3>
      <Grafico
        etiquetas={meses}
        datos={datosPorMes}
        nombreGrafica={`Reservas por Mes (${year || new Date().getFullYear()})`}
        nombreDatos="Cantidad de Reservas"
      />
    </>
  );
}
