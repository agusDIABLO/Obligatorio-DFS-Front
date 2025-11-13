import React, { useEffect, useMemo, useState, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SubirImagen from "./SubirImagen";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Formik, Field } from "formik";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import styles from "./login/Login.module.css";
import { getReservaSchema } from "../schemas/reservaSchemas";
import { crearReservaService } from "../services/reservationServices";
import { crearReserva } from "../redux/features/reserva/reservaSlice";
import { getUsersByRole } from "../redux/features/user/userThunk";
import moment from "moment"; // <-- lo estás usando en onSubmit



const initialValues = {
  barbero: "",
  servicio: "",
  fechaReserva: "",
  imgUrl: ""
};

const Reserva = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const subirRef = useRef();

  const [imgUrl, setImgUrl] = useState("");


  const { listByRole: barberos, loading: cargandoBarberos, error } = useSelector(
    (state) => state.userSlice
  );

  const validationSchema = useMemo(() => getReservaSchema(t), [i18n.language, t]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getUsersByRole("barber"));
    }
  }, [dispatch]);

  const onSubmit = async (values, actions) => {
    try {
      const { barbero, servicio, fechaReserva, imgUrl } = values;

      const nuevaReserva = {
        barberId: barbero,
        serviceId: servicio,
        reservationDateTime: fechaReserva,
        imgUrl: imgUrl
      };

      const payload = await crearReservaService(nuevaReserva);
      
      // 👇 Guardamos en Redux
      dispatch(crearReserva(payload));

      toast.success(t("reserva.success_message"));
      actions.resetForm();
      //navigate("/");

      const decoded = jwtDecode(token);
      const { exp, id: userId, role } = decoded;

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
      console.log("error en registro", error);
      toast.error(error.message || "Error al crear la reserva");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Realizar Reserva</h2>

      {/* Si hubo error al cargar barberos, mostralo arriba del form (opcional) */}
      {error && <div className="alert alert-danger">{String(error)}</div>}

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ handleSubmit, touched, errors }) => (
          <Form onSubmit={handleSubmit} className={styles.loginForm}>
            {/* BARBERO */}
            <Form.Group controlId="barbero">
              <Form.Label>Barbero</Form.Label>
              <Field
                as="select"
                name="barbero"
                className={`form-control ${touched.barbero && errors.barbero ? "is-invalid" : ""}`}
                disabled={cargandoBarberos}
              >
                <option value="">
                  {cargandoBarberos ? t("cargando") : "Seleccione el barbero"}
                </option>

                {/* Ajustá las props según tu API: id/nombre o userId/fullName */}
                {barberos?.map((b) => (
                  <option key={b._id ?? b.id} value={b._id ?? b.id}>
                    {b.name}
                  </option>
                ))}
              </Field>
              {touched.barbero && errors.barbero ? (
                <div className="invalid-feedback">{errors.barbero}</div>
              ) : null}
            </Form.Group>

            {/* SERVICIO */}
            <Form.Group controlId="servicio">
              <Form.Label>Servicio</Form.Label>
              <Field
                as="select"
                name="servicio"
                className={`form-control ${touched.servicio && errors.servicio ? "is-invalid" : ""}`}
              >
                <option value="">Seleccione el servicio</option>
                <option value="corte">Corte de cabello</option>
                <option value="afeitado">Afeitado</option>
              </Field>
              {touched.servicio && errors.servicio ? (
                <div className="invalid-feedback">{errors.servicio}</div>
              ) : null}
            </Form.Group>

            {/* FECHA */}
            <Form.Group controlId="fechaReserva">
              <Form.Label>Fecha</Form.Label>
              <Field
                type="dateTime-local"
                name="fechaReserva"
                className={`form-control ${touched.fechaReserva && errors.fechaReserva ? "is-invalid" : ""}`}
              />
              {touched.fechaReserva && errors.fechaReserva ? (
                <div className="invalid-feedback">{errors.fechaReserva}</div>
              ) : null}
            </Form.Group>
          <Form.Group controlId="imagen">
            <SubirImagen handleImgURL={(url) => setImgUrl(url)} ref={subirRef} />
          </Form.Group>
            <Button variant="primary" type="submit" className={styles.submitButton}>
              Enviar
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Reserva;
