import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerReservaByIdService, modificarFechaReservaService } from "../services/reservationServices";
import { useDispatch } from "react-redux";
import { updateReserva } from "../redux/features/reserva/reservaSlice";
import { startLoading, stopLoading } from "../redux/features/loadingSlice";
import { toast } from "react-toastify";


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
        console.log('data', data)
        setReserva(data);
        setNuevaFecha(data.reservationDateTime?.split("T")[0]); // formato yyyy-MM-dd
      } catch (error) {
        console.error("Error al obtener la reserva:", error);
      }
    };
    fetchReserva();
  }, [id]);

  const handleSave = async () => {
    try {
      dispatch(startLoading());
      await modificarFechaReservaService(id, { reservationDateTime: new Date(nuevaFecha).toISOString() });
      dispatch(updateReserva({ _id: id, reservationDateTime: nuevaFecha }));
      alert("Reserva actualizada correctamente");
      navigate("/");
    } catch (error) {
      console.error("Error al actualizar la reserva:", error);
      toast.error("No se pudo actualizar la reserva");
    } finally {
      dispatch(stopLoading());
    }
  };
  
  console.log('reserva luego del state', reserva)
  if (!reserva) return <p>Cargando reserva...</p>;

  return (
    <div >
      <h2 >Editar fecha de reserva</h2>

      <p><b>Servicio:</b> {reserva.serviceId.name}</p>
      <p><b>Estado:</b> {reserva.status}</p>

      <div className="mt-4">
        <label htmlFor="fecha" className="block mb-1 font-medium">
          Nueva fecha:
        </label>
        <input
          type="dateTime-local" 
          id="fecha"
          value={nuevaFecha}
          onChange={(e) => setNuevaFecha(e.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
      </div>

      <div >
        <button
          onClick={handleSave}
          className="btn-cambios separar10pxArriba"
        >
          Guardar cambios
        </button>
        <button
          onClick={() => navigate("/reservas")}
          className="btn-cancel"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default EditarTarjeta;