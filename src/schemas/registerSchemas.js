import * as Yup from 'yup'
import i18n from "../i18n"


const emailReg = new RegExp(".*\\..+");

export const registerSchema = Yup.object({
    email: Yup.string().min(4).matches(emailReg, i18n.t("validations.email_invalid")).required(),
    password: Yup.string().min(6, i18n.t("validations.min", { min: 6 })).required(i18n.t("validations.password_required")),
    name: Yup.string().min(3, i18n.t("validations.min", { min: 3 })).required(i18n.t("validations.name_required")),
    phone: Yup.string().min(8, i18n.t("validations.min", { min: 8 })).required(i18n.t("validations.phone_required")),
})

export const getRegisterSchema = (t) => {
    return Yup.object({
        email: Yup.string().min(3, t("validations.min", { min: 3 })).matches(emailReg, t("validations.email_invalid")).required(t("validations.email_required")),
        password: Yup.string().min(6, t("validations.min", { min: 6 })).required(t("validations.password_required")),
        name: Yup.string().min(3, t("validations.min", { min: 3 })).required(t("validations.name_required")),
        phone: Yup.string().min(8, t("validations.min", { min: 8 })).required(t("validations.phone_required")),
    })
};

