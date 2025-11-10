import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { obtenerUsuarioByIdService, updatePlanUsuarioService } from "../services/userServices";

const Menu = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [userPlan, setUserPlan] = useState("");

  useEffect(() => {
    
    const fetchUser = async () => {
        try {
            const response = await obtenerUsuarioByIdService(userId);
            setUserPlan(response.plan);
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
        <Link to="/">Home</Link> | <Link to="/login">Logout</Link>|{" "}
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleChangePlan} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition">Cambiar plan</button>
      </nav>
    </div>
  );
};

export default Menu;
