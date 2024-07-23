import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
  onNeedRefresh() {
    // Mostrar una notificación o hacer algo cuando haya una nueva versión del SW
  },
  onOfflineReady() {
    // Mostrar una notificación o hacer algo cuando la app esté lista para usarse offline
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
