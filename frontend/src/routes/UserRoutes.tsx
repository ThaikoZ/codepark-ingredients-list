// Router DOM and Pages
import { Routes, Route } from "react-router-dom";
import App from "../App.tsx";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/items" element={<App />} />
    </Routes>
  );
};

export default UserRoutes;
