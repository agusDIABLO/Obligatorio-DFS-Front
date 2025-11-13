import React from "react";
import { Navigate } from "react-router-dom";


const RutaAdmin = ({ children }) => {
    const role = localStorage.getItem("role");

    if (role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default RutaAdmin;

