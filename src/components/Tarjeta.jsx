import { useDispatch } from "react-redux";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { startLoading, stopLoading } from "../redux/features/loadingSlice";
import { borrarReserva } from "../redux/features/reserva/reservaSlice";
import { cancelarReservaService } from "../services/reservationServices";
import { useNavigate } from "react-router-dom";



const Tarjeta = ({ _id: id, customerId, serviceId, reservationDateTime, status, imgUrl }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDelete = async () => {
    if (!window.confirm("¿Seguro que quieres cancelar esta reserva?")) return;
    try {
      dispatch(startLoading());
      await cancelarReservaService(id);

      dispatch(borrarReserva(id));
    } catch (error) {
      console.error("Error al eliminar la reserva:", error);
      toast.error("No se pudo eliminar la reserva");
    } finally {
      dispatch(stopLoading());
    }
  };

  const handleEdit = () => {
    navigate(`/editarTarjeta/${id}`);
  };

  const formattedDateTime = reservationDateTime
    ? new Date(reservationDateTime).toLocaleString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Fecha no disponible";

  return (
    <tr>
      <td>{customerId?.name ?? "Cliente desconocido"}</td>
      <td>{formattedDateTime}</td>
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
        <button
          onClick={handleDelete}
          style={{ background: "none", border: "none", cursor: "pointer" }}
          title="Borrar reserva"
        >
          <FaTrash color="red" size={20} />
        </button>
        {" "}
        <button
          onClick={handleEdit}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            marginLeft: "8px"
          }}
          title="Editar fecha"
        >
          <FaPencilAlt color="blue" size={20} />
        </button>
      </td>
      <td>
        {imgUrl && (
          <div style={{ marginTop: "10px" }}>
            <img
              src={imgUrl}
              alt="Imagen no se puede mostrar"
              style={{ maxWidth: "200px", borderRadius: "8px" }}
            />
          </div>
        )}
      </td>
    </tr>
  );
};

export default Tarjeta;