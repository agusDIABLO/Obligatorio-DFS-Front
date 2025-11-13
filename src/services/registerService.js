import axios from "axios";
import { urlBackend } from "../constants/constants";

export const registerApiObligatorio = async (name, email, password, phone) => {
    console.log('name, email, password, phone', name, email, password, phone)
    try {
        const response = await axios.post(
            `${urlBackend}/signup`,
            { name,
              email,
              password,
              phone},
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }   
        );
        const data = response.data;
        return data;

    } catch (error) {
        console.log('error', error);

        // Si el error viene del servidor (Axios lo envuelve en error.response)
        if (error.response && error.response.data) {
            console.log(error.response.data);

            throw new Error(error.response.data.message || "Error en la respuesta del servidor");
        }
        // Si es un error de red u otro tipo
        throw new Error(error.message ? error.message : "Hubo un error en la red");
    }
};