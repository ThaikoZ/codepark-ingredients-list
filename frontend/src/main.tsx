import React from "react";
import ReactDOM from "react-dom/client";
// Custom CSS
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
// Services
import "./services/api-client.ts";
// Router DOM and Pages
import MainRouter from "./routes/MainRouter.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MainRouter />
  </React.StrictMode>
);
