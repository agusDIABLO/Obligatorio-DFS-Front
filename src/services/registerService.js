import axios from "axios";

const urlBackend = import.meta.env.VITE_URL_BACKEND;


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
        console.log("error en registerService:", error);

        // Si el error viene del servidor (Axios lo envuelve en error.response)
        if (error.response) {
            console.log("registerService - response:", error.response.status, error.response.data);
            const msg = error.response.data && (error.response.data.message || JSON.stringify(error.response.data));
            const finalMsg = msg || `Error del servidor (status ${error.response.status})`;
            const err = new Error(finalMsg);
            err.status = error.response.status;
            err.responseData = error.response.data;
            throw err;
        }
        // Si es un error de red u otro tipo
        throw new Error(error.message ? error.message : "Hubo un error en la red");
    }
};