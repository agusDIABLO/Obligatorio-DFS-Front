import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    resources: {
        es: {
            translation: {
                validations: {
                    email_invalid: "El email no es válido",
                    email_required: "El email es obligatorio",
                    password_required: "La contraseña resulta ser obligatoria",
                    min: "Debe tener al menos {{min}} caracteres"
                },
                welcome: "¡Bienvenido!",
                login: "Iniciar sesión",
            },
        },
        en: {
            translation: {
                validations: {
                    email_invalid: "Invalid email address",
                    email_required: "Email is required",
                    password_required: "Password is required",
                    min: "Must be at least {{min}} characters"

                },
                welcome: "Welcome!",
                login: "Login",
            },
        },
    },

    lng: "es",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
});

export default i18n;
