import React, { useMemo } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Field } from "formik";
import styles from "./Login.module.css";
import { getLoginSchema } from "../../schemas/loginSchemas";
import { loginApiObligatorio } from "../../services/loginServices";
import { jwtDecode } from "jwt-decode";
import moment from "moment";


const initialValues = {
  email: "",
  password: ""
};

const Login = () => {   
    const { t, i18n } = useTranslation();

  const validationSchema = useMemo(() => {
    console.log("cambio el memo");
    return getLoginSchema(t);
  }, [i18n.language]);

    const navigate = useNavigate();

    const onSubmit = async (values, actions) => {
        console.log('values', values);
        try {
            const {email, password} = values;
            const {token} = await loginApiObligatorio(email, password);
            console.log('token', token);

            let localStorage = window.localStorage;

            const decodedToken = jwtDecode(token);
            console.log('decodedToken', decodedToken);

            const { exp, iat, id: userId, role } = decodedToken;
            console.log("decodificado ", exp, userId, role);

            const expirationTime = moment.unix(exp);
            const createTime = moment.unix(iat);

            console.log("createTime", createTime);

            const now = moment();

            const diffMinutes = expirationTime.diff(now, "minutes");
            const diffSeconds = expirationTime.diff(now, "seconds");

            console.log(diffMinutes, diffSeconds);

            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);
            localStorage.setItem("role", role);

            toast.info(`Bienvenido ${email}!`);

            actions.resetForm(); //resetea el formulario

             navigate("/");
            } catch (error) {
              console.log('error en login', error);
              toast.error(`Error: ${error.message}`);
        }
    };

    return (
        <><h1 className={styles.estiloLogin}>{t("welcome")}</h1><Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ values, errors, touched, handleSubmit, handleChange }) => (
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Field
                            name="email"
                            type="email"
                            placeholder="Enter email"
                            value={values.email}
                            onChange={handleChange} />
                    </Form.Group>
                    {errors.email && touched.email && <p>{errors.email}</p>}
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Field
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={values.password}
                            onChange={handleChange} />
                    </Form.Group>
                    {errors.password && touched.password && <p>{errors.password}</p>}
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            )}
        </Formik></>
    );
};

export default Login;