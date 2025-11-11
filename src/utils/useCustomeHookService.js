import { useSelector } from "react-redux";

export const useCustomHookService = () => {
  // Obtenemos los servicios del store (ajustá el path según tu slice)
  const servicios = useSelector((state) => state.serviciosSlice.servicios);

  // Retornamos una función que recibe un ID y devuelve el nombre
  const transformServiceIdToName = (id) => {
    const servicio = servicios?.find((s) => s._id === id);
    return servicio ? servicio.name : "Servicio no encontrado";
  };




  return transformServiceIdToName;
};