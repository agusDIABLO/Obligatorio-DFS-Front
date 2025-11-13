import React, { useMemo } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Formik, Field } from "formik";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import styles from "./login/Login.module.css";
import { getRegisterSchema } from "../schemas/registerSchemas";
import { registerApiObligatorio } from "../services/registerService";

const initialValues = {
    email: "",
    password: "",
    name: "",
    phone: ""
};


const Register = () => {
    const { t, i18n } = useTranslation();
    
    const validationSchema = useMemo(() => {
        return getRegisterSchema(t);
    }, [i18n.language]);

    const navigate = useNavigate();

    const onSubmit = async (values, actions) => {
        try {
            const { name, email,phone, password } = values;
            const {token} = await registerApiObligatorio(name, email, phone, password);

            const decoded = jwtDecode(token);
            const { exp, iat, id: userId, role} = decoded;

            const expirationTime = moment.unix(exp);
            const now = moment();
            const diffMinutes = expirationTime.diff(now, "minutes");

            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);
            localStorage.setItem("sessionTime", diffMinutes);
            localStorage.setItem("role", role); // Asumimos rol user al registrarse


            toast.success(t("register.success_message"));
            actions.resetForm();
            navigate("/");
        } catch (error) {
            console.log('error en registro', error);
            toast.error(error.message);
        }
        
    };
          return (
    <>
      <h1 className={styles.estiloLogin}>Registro</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, errors, touched, handleSubmit, handleChange }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Field
                name="name"
                type="text"
                placeholder="Tu nombre"
                value={values.name}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.name && touched.name && <p>{errors.name}</p>}

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Field
                name="email"
                type="email"
                placeholder="Tu correo"
                value={values.email}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.email && touched.email && <p>{errors.email}</p>}

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Field
                name="password"
                type="password"
                placeholder="Contraseña"
                value={values.password}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password && touched.password && <p>{errors.password}</p>}

            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Field
                name="phone"
                type="text"
                placeholder="Tu teléfono"
                value={values.phone}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.phone && touched.phone && <p>{errors.phone}</p>}
            <Button variant="success" type="submit">
              Registrarme
            </Button>

            <Button
              variant="link"
              onClick={() => navigate("/login")}
              className="ms-3"
            >
              ¿Ya tienes cuenta? Inicia sesión
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Register;
