//import { urlBackend } from "../constants/constants";
const urlBackend = import.meta.env.VITE_URL_BACKEND;


const URL_IMAGES = `${urlBackend}/images`;

export async function uploadImage(base64) {

    
    const response = await fetch(URL_IMAGES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ file: base64 }),
    });
    if (!response.ok) {
        throw new Error('Error al subir la imagen');
        return await response.json();
    }   

     const result = await response.json();
    return result; // 👈 Esto contiene secure_url y public_id

}


export async function deleteImage(imageId) {
    const response = await fetch(`${URL_IMAGES}/${encodeURIComponent(imageId)}`, { method: "DELETE" });
    if (!response.ok) {
        throw new Error("Error al eliminar la imagen");
        return await response.json();
    }
}