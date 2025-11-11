import { jwtDecode } from "jwt-decode";
import moment from "moment";


export const esTokenValido = (token) => {

    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        const { exp, iat } = decoded;
        const expirationTime = moment.unix(exp);
        const createTime = moment.unix(iat);
        const now = moment();
        const diffMinutes = expirationTime.diff(now, "minutes");
        const diffSeconds = expirationTime.diff(now, "seconds");
        return diffSeconds > 0;
    } catch (error) {
        console.error("Error al decodificar el token:", error);
        return false;
    }
};