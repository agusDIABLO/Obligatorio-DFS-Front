import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { obtenerUsuarioByIdService, updatePlanUsuarioService } from "../services/userServices";

const Menu = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [userPlan, setUserPlan] = useState("");

    useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (storedId) {
      setUserId(storedId);
    }
  }, []);


  useEffect(() => {
    
    const fetchUser = async () => {
        try {
            const response = await obtenerUsuarioByIdService(userId);
            setUserPlan(response.User.plan);
        }
        catch (error) {
            console.error("Error al obtener el usuario:", error);
        }
    };
    if (userId) {
        fetchUser();
    }}, [userId]);


  const handleLogout = () => {
    let localStorage = window.localStorage;
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.clear();

    navigate("/login");
  };

    const handleChangePlan = () => {
    const nuevoPlan = userPlan === "plus" ? "premium" : "plus";
    try {
        const result = updatePlanUsuarioService(userId, nuevoPlan);
        setUserPlan(nuevoPlan);
        console.log("Plan actualizado a:", nuevoPlan);
        toast.info(`Plan actualizado a: ${nuevoPlan}`);
    } catch (error) {
        console.error("Error al actualizar el plan:", error);
        toast.error(`Error al actualizar el plan: ${error.message}`);
    }
    };

  return (
    <div className="menu">
      <h2>Barberia</h2>
    <span className="text-sm">Plan actual: <b>{userPlan || "Cargando..."}</b></span>
      <nav>
        <Link to="/" className="btn-link" >Home</Link> {" "}
        <Link to="/reserva" className="btn-link font-semibold">Reservar</Link> {" "}
        <Link to="/grafico" className="btn-link">Gráfico</Link> {" "}
        <button onClick={handleLogout} className="btn-link"><strong>Logout</strong></button>{" "}
        <button onClick={handleChangePlan} className="btn-link"><strong>Cambiar plan</strong></button>
      </nav>
    </div>
  );
};

export default Menu;
