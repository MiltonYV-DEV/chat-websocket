import { motion } from "framer-motion";
const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.3 }}
      className="h-screen flex-col gap-4 flex justify-center items-center"
    >
      <h2 className="text-xl md:text-2xl">
        Bienvenido a <span className="text-blue-500 font-bold">ideaWorld</span>
      </h2>
      <div className="flex gap-1">
        <a href="Login" className="bg-blue-500 p-2 py-1 rounded-lg">
          Iniciar sesion
        </a>
        <a href="Register" className="bg-green-600 p-2 py-1 rounded-lg">
          Registrarse
        </a>
      </div>
    </motion.div>
  );
};

export default Home;
