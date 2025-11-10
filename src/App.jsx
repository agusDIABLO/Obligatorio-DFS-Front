import React, { useEffect, useState } from "react";
import "./App.css";
import Menu from "./components/Menu";
import Login from "./components/login/Login";
import "./styles/estilos.css";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [logueado] = useState(true);

  useEffect(() => {
    let localStorage = window.localStorage;
    const token = localStorage.getItem("token");

    console.log("token", token, token != null);

    console.log("logueado", logueado);
  }, [logueado]);

  return (
    <>
      {!logueado && <Login></Login>}

      {logueado && (
        <>
          {/* <Menu></Menu> */}
          <Dashboard />
        </>
      )}
    </>
  );
};

export default App;
