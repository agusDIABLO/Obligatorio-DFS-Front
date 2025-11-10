import { jwtDecode } from "jwt-decode";
import moment from "moment";


export const esTokenValido = (token) => {

    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        console.log("Contenido del token:", decoded);
        const { exp, iat } = decoded;
        const expirationTime = moment.unix(exp);
        const createTime = moment.unix(iat);
        console.log("createTime", createTime);
        const now = moment();
        const diffMinutes = expirationTime.diff(now, "minutes");
        const diffSeconds = expirationTime.diff(now, "seconds");
        console.log(diffMinutes, diffSeconds);
        return diffSeconds > 0;
    } catch (error) {
        console.error("Error al decodificar el token:", error);
        return false;
    }
};