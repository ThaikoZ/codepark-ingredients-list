// Router DOM and Pages
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App.tsx";
import NotFound from "../pages/NotFound.tsx";
import AuthRoutes from "./AuthRoutes.tsx";
import LoggedRoutes from "./UserRoutes.tsx";
import UserService from "../services/users-service.ts";
import UserRoutes from "./UserRoutes.tsx";

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/app/*" element={<UserRoutes />} />
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
