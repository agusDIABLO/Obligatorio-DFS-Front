import * as Yup from 'yup'
import i18n from "../i18n"


const emailReg = new RegExp(".*\\..+");

export const reservaSchema = Yup.object({
    barbero: Yup.string().min(4).matches(emailReg, i18n.t("validations.email_invalid")).required(),
    servicio: Yup.string().min(6, i18n.t("validations.min", { min: 6 })).required(i18n.t("validations.password_required")),
    fechaReserva: Yup.string().min(3, i18n.t("validations.min", { min: 3 })).required(i18n.t("validations.name_required")),
    imagen: Yup.string().min(8, i18n.t("validations.min", { min: 8 })).required(i18n.t("validations.phone_required")),
})

export const getReservaSchema = (t) => {
    return Yup.object({
        barbero: Yup.string().min(4).matches(emailReg, t("validations.email_invalid")).required(t("validations.email_required")),
        servicio: Yup.string().min(6, t("validations.min", { min: 6 })).required(t("validations.password_required")),
        fechaReserva: Yup.string().min(3, t("validations.min", { min: 3 })).required(t("validations.name_required")),
        imagen: Yup.string().min(8, t("validations.min", { min: 8 })).required(t("validations.phone_required")),
    })
};