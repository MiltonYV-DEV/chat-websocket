import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const Home = () => {
  const roomsCreate = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/rooms_create`,
      );

      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    roomsCreate();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.3 }}
      className="h-screen flex-col gap-4 flex justify-center items-center"
    >
      <h2 className="text-xl md:text-2xl">
        Bienvenido a <span className="text-blue-400 font-bold">ideaWorld</span>
      </h2>
      <div className="flex gap-1">
        <Link
          to="/Login"
          className="bg-blue-500 px-3 py-1 rounded-lg lg:text-lg hover:bg-blue-600 transition-colors"
        >
          Iniciar sesion
        </Link>
        <Link
          to="/Register"
          className="bg-green-600 px-3 py-1 rounded-lg lg:text-lg hover:bg-green-700 transition-colors"
        >
          Registrarse
        </Link>
      </div>
    </motion.div>
  );
};

export default Home;
