import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Navbar from "../components/Navbar";
import Rooms from "../pages/Rooms";
import { AnimatePresence } from "framer-motion";

const AppRouter = () => {
  const location = useLocation();
  return (
    <div className="h-screen">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/rooms" element={<Rooms />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default AppRouter;
