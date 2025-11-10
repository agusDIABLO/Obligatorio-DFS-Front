import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { store } from "./redux/stores.js";
import { Provider } from "react-redux";
import Rutas from "./routes/Routes.jsx";
import { ToastContainer } from "react-toastify";
import "./i18n.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ToastContainer />
    <Rutas></Rutas>
  </Provider>
);

