// Router DOM and Pages
import { Routes, Route } from "react-router-dom";
import Register from "../pages/auth/Register.tsx";
import Login from "../pages/auth/Login.tsx";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
};

export default AuthRoutes;
