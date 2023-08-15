import React from "react";
import ReactDOM from "react-dom/client";
// Custom CSS
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
// Services
import "./services/api-client.ts";
// Router DOM and Pages
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import Register from "./pages/auth/Register.tsx";
import Login from "./pages/auth/Login.tsx";
import NotFound from "./pages/NotFound.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="/items" element={<App />} />
        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
