import axios from 'axios';

const urlBackend = import.meta.env.VITE_URL_BACKEND;

 
export const loginApiObligatorio = async (email, password) => {
console.log("Backend URL:", import.meta.env.VITE_URL_BACKEND);
    
    try {
        const response = await axios.post(
            `${urlBackend}/login`,
            { email, password },
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
            throw new Error(error.response.data.message || "Error en la respuesta del servidor");
        }
        // Si es un error de red u otro tipo
        throw new Error(error.message ? error.message : "Hubo un error en la red");
    }
};
