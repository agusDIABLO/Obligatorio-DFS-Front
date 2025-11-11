import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerReservaByIdService, modificarFechaReservaService } from "../services/reservationServices";
import { useDispatch } from "react-redux";
import { updateReserva } from "../redux/features/reserva/reservaSlice";
import { startLoading, stopLoading } from "../redux/features/loadingSlice";

const EditarTarjeta = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [reserva, setReserva] = useState(null);
  const [nuevaFecha, setNuevaFecha] = useState("");

  useEffect(() => {
    const fetchReserva = async () => {
      try {
        const data = await obtenerReservaByIdService(id);
        setReserva(data);
        setNuevaFecha(data.date?.split("T")[0]); // formato yyyy-MM-dd
      } catch (error) {
        console.error("Error al obtener la reserva:", error);
      }
    };
    fetchReserva();
  }, [id]);

  const handleSave = async () => {
    try {
      dispatch(startLoading());
      await modificarFechaReservaService(id, { date: nuevaFecha });
      dispatch(updateReserva({ _id: id, date: nuevaFecha }));
      alert("Reserva actualizada correctamente");
      navigate("/reservas");
    } catch (error) {
      console.error("Error al actualizar la reserva:", error);
      alert("Error al actualizar la reserva");
    } finally {
      dispatch(stopLoading());
    }
  };

  if (!reserva) return <p>Cargando reserva...</p>;

  return (
    <div className="p-4 max-w-md mx-auto border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Editar fecha de reserva</h2>

      <p><b>Cliente:</b> {reserva.userId}</p>
      <p><b>Servicio:</b> {reserva.serviceId}</p>
      <p><b>Estado:</b> {reserva.status}</p>

      <div className="mt-4">
        <label htmlFor="fecha" className="block mb-1 font-medium">
          Nueva fecha:
        </label>
        <input
          type="date"
          id="fecha"
          value={nuevaFecha}
          onChange={(e) => setNuevaFecha(e.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
      </div>

      <div className="mt-4 flex gap-3">
        <button
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
        >
          Guardar cambios
        </button>
        <button
          onClick={() => navigate("/reservas")}
          className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default EditarTarjeta;