import { useEffect, useMemo, useState, useRef } from "react";
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
import { getAllServiciosThunk } from "../redux/features/service/servicesThunk";
import moment from "moment";


const initialValues = {
  barbero: "",
  servicio: "",
  fechaReserva: "",
  imgUrl: "",
  publicId: ""
};

const Reserva = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const subirRef = useRef();

  const [imgUrl, setImgUrl] = useState("");
  const [publicId, setPublicId] = useState("");

  const { listByRole: barberos, loading: cargandoBarberos, error } = useSelector(
    (state) => state.userSlice
  );

  const { servicios: servicios, loading: cargandoServicios } = useSelector(
    (state) => state.serviciosSlice
  );

  const validationSchema = useMemo(() => getReservaSchema(t), [i18n.language, t]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getUsersByRole("barber"));
      dispatch(getAllServiciosThunk());
    }
    dispatch(getAllServiciosThunk());
  }, [dispatch]);


  useEffect(() => { }, [imgUrl, publicId]);

  const onSubmit = async (values, actions) => {
    try {
      const token = localStorage.getItem("token");
      const { barbero, servicio, fechaReserva, imgUrl: formImgUrl, publicId: formPublicId } = values;
      const finalImgUrl = formImgUrl || imgUrl;
      const finalPublicId = formPublicId || publicId;

      if (!barbero || !servicio || !fechaReserva || !finalImgUrl || !finalPublicId) {
        toast.warn("Debe ingresar barbero, servicio, fecha e imagen antes de enviar");
        return;
      }

      const nuevaReserva = {
        barberId: barbero,
        serviceId: servicio,
        reservationDateTime: new Date(fechaReserva).toISOString(),
        imgUrl: finalImgUrl,
        publicId: finalPublicId
      };
      const payload = await crearReservaService(nuevaReserva);
      dispatch(crearReserva(payload));

      actions.resetForm();
      if (token) {
        try {
          const decoded = jwtDecode(token);
          const { exp, id: userId, role } = decoded;
          const expirationTime = moment.unix(exp);
          const now = moment();
          const diffMinutes = expirationTime.diff(now, "minutes");

          localStorage.setItem("token", token);
          localStorage.setItem("userId", userId);
          localStorage.setItem("sessionTime", diffMinutes);
          localStorage.setItem("role", role);
        } catch (err) {
          console.warn("No se pudo decodificar el token:", err);
        }
      }

      toast.success(t("Reserva enviada con éxito"));
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

      {error && <div className="alert alert-danger">{String(error)}</div>}

      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleSubmit, touched, errors, setFieldValue, values }) => (
          <Form onSubmit={handleSubmit} className={styles.loginForm}>
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

            <Form.Group controlId="servicio">
              <Form.Label>Servicio</Form.Label>
              <Field
                as="select"
                name="servicio"
                className={`form-control ${touched.servicio && errors.servicio ? "is-invalid" : ""}`}
                disabled={cargandoServicios}
              >
                <option value="">
                  {cargandoServicios ? "Cargando servicios..." : "Seleccione el servicio"}
                </option>

                {Array.isArray(servicios) &&
                  servicios.map((s) => (
                    <option key={s._id ?? s.id} value={s._id ?? s.id}>
                      {s.name ?? "Servicio sin nombre"}
                    </option>
                  ))}
              </Field>
              {touched.servicio && errors.servicio && (
                <div className="invalid-feedback">{errors.servicio}</div>
              )}
            </Form.Group>
            <Form.Group controlId="fechaReserva">
              <Form.Label>Fecha</Form.Label>
              <Field
                type="datetime-local"
                name="fechaReserva"
                className={`form-control ${touched.fechaReserva && errors.fechaReserva ? "is-invalid" : ""}`}
              />
              {touched.fechaReserva && errors.fechaReserva ? (
                <div className="invalid-feedback">{errors.fechaReserva}</div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="imagen">
              <SubirImagen
                handleImgURL={(data) => {
                  setImgUrl(data.secure_url);
                  setPublicId(data.public_id);
                  setFieldValue("imgUrl", data.secure_url);
                  setFieldValue("publicId", data.public_id);
                }}
                ref={subirRef}
              />
              <Field type="hidden" name="imgUrl" value={values.imgUrl} />
              <Field type="hidden" name="publicId" value={values.publicId} />
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
