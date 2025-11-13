import * as Yup from 'yup'
import i18n from "../i18n"


const emailReg = new RegExp(".*\\..+");

export const loginSchema = Yup.object({
    email: Yup.string().min(4).matches(emailReg, i18n.t("validations.email_invalid")).required(),
    password: Yup.string().min(6, i18n.t("validations.min", { min: 6 })).required(i18n.t("validations.password_required")),
})


export const getLoginSchema = (t) => {
    return Yup.object({
        email: Yup.string().min(3, t("validations.min", { min: 3 })).matches(emailReg, t("validations.email_invalid")).required(t("validations.email_required")),
        password: Yup.string().min(6, t("validations.min", { min: 6 })).required(t("validations.password_required")),
    })
};
