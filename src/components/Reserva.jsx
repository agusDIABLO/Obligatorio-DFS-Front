import React, { useMemo } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Formik, Field } from "formik";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import styles from "./login/Login.module.css";
import { getReservaSchema } from "../schemas/reservaSchemas";
import { crearReservaService } from "../services/reservationServices";

const initialValues = {
    barbero: "",
    servicio: "",
    fechaReserva: ""
};

const Reserva = () => {

    const { t, i18n } = useTranslation();

    const validationSchema = useMemo(() => {
        return getReservaSchema(t);
    }, [i18n.language]);

    const navigate = useNavigate();

    const onSubmit = async (values, actions) => {
        try {
            const { barbero, servicio, fechaReserva } = values;
            const { token } = await crearReservaService(barbero, servicio, fechaReserva);

            const decoded = jwtDecode(token);
            const { exp, iat, id: userId, role } = decoded;

            const expirationTime = moment.unix(exp);
            const now = moment();
            const diffMinutes = expirationTime.diff(now, "minutes");

            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);
            localStorage.setItem("sessionTime", diffMinutes);
            localStorage.setItem("role", role);

            toast.success(t("reserva.success_message"));
            actions.resetForm();
            navigate("/");
        } catch (error) {
            console.log('error en registro', error);
            toast.error(error.message);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <h2>{t("reserva.title")}</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({
                    handleSubmit,
                    handleChange,
                    values,
                    errors,
                    touched
                }) => (
                    <Form onSubmit={handleSubmit} className={styles.loginForm}>
                        <Form.Group controlId="barbero">
                            <Form.Label>{t("reserva.barbero")}</Form.Label>
                            <Field
                                as="select"
                                name="barbero"
                                className={`form-control ${touched.barbero && errors.barbero ? "is-invalid" : ""}`}
                            >
                                <option value="">{t("reserva.select_barbero")}</option>
                                <option value="barbero1">Barbero 1</option>
                                <option value="barbero2">Barbero 2</option>
                            </Field>
                            {touched.barbero && errors.barbero ? (
                                <div className="invalid-feedback">{errors.barbero}</div>
                            ) : null}
                        </Form.Group>

                        <Form.Group controlId="servicio">
                            <Form.Label>{t("reserva.servicio")}</Form.Label>
                            <Field
                                as="select"
                                name="servicio"
                                className={`form-control ${touched.servicio && errors.servicio ? "is-invalid" : ""}`}
                            >
                                <option value="">{t("reserva.select_servicio")}</option>
                                <option value="corte">Corte de cabello</option>
                                <option value="afeitado">Afeitado</option>
                            </Field>
                            {touched.servicio && errors.servicio ? (
                                <div className="invalid-feedback">{errors.servicio}</div>
                            ) : null}
                        </Form.Group>

                        <Form.Group controlId="fechaReserva">
                            <Form.Label>{t("reserva.fechaReserva")}</Form.Label>
                            <Field
                                type="date"
                                name="fechaReserva"
                                className={`form-control ${touched.fechaReserva && errors.fechaReserva ? "is-invalid" : ""}`}
                            />
                            {touched.fechaReserva && errors.fechaReserva ? (
                                <div className="invalid-feedback">{errors.fechaReserva}</div>
                            ) : null}
                        </Form.Group>

                        <Button variant="primary" type="submit" className={styles.submitButton}>
                            {t("reserva.submit_button")}
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );

};

export default Reserva;


