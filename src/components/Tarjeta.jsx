import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FaTrash, FaPencilAlt, FaSave, FaTimes } from "react-icons/fa";
import { startLoading, stopLoading } from "../redux/features/loadingSlice";
import { borrarReserva, updateReserva } from "../redux/features/reserva/reservaSlice";
import { cancelarReservaService } from "../services/reservationServices";
import { useCustomHookUser } from "../utils/useCustomHookUser"; //REVISAR
import { useCustomHookService } from "../utils/useCustomeHookService";
import { useNavigate } from "react-router-dom";



const Tarjeta = ({ _id: id, customerId, serviceId, reservationDateTime, status }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const transformUserIdToName = useCustomHookUser();
  const transformServiceIdToName = useCustomHookService();

  const [isEditing, setIsEditing] = useState(false);
  const [editedStatus, setEditedStatus] = useState(status);
  const [loading, setLoading] = useState(false);

  // 🗑 Eliminar reserva
  const handleDelete = async () => {
    if (!window.confirm("¿Seguro que quieres cancelar esta reserva?")) return;
    try {
      dispatch(startLoading());
      await cancelarReservaService(id);
      dispatch(borrarReserva(id));
    } catch (error) {
      console.error("Error al eliminar la reserva:", error);
      alert("No se pudo eliminar la reserva");
    } finally {
      dispatch(stopLoading());
    }
  };

  // ✏️ Editar fecha de la reserva
  const handleEdit = () => {
    navigate(`/editarTarjeta/${id}`);
  };



  return (
    <tr>

      <td>{customerId?.name ?? "Cliente desconocido"}</td>
      <td>{new Date(reservationDateTime).toLocaleString()}</td>
      <td>{serviceId?.name ?? "Servicio no encontrado"}</td>

   
      <td>
        <b
          style={{
            color:
              status === "completed"
                ? "green"
                : status === "cancelled"
                ? "red"
                : "orange",
          }}
        >
          {status}
        </b>
      </td>
      <td>
        {/* 🗑 Borrar */}
        <button
          onClick={handleDelete}
          style={{ background: "none", border: "none", cursor: "pointer" }}
          title="Borrar reserva"
        >
          <FaTrash color="red" size={20} />
        </button>
          {" "}
        {/* ✏️ Editar  */}
         <button
          onClick={handleEdit}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            marginLeft: "8px",
          }}
          title="Editar fecha"
        >
          <FaPencilAlt color="blue" size={20} />
        </button>
      </td>
    </tr>
  );
};

export default Tarjeta;