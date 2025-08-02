import { useAuthStore } from "../stores/userStore";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
  user: {
    id: string;
    name: string;
    email: string;
    is_active: number;
  };
}

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const { login } = useAuthStore.getState();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData: LoginData = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };

    console.log(userData);

    await userLogin(userData);
  };

  const userLogin = async (credentials: LoginData): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setIsCorrect(true);
        throw new Error(errorData.detail || "Error al iniciar sesion");
      }
      const data = await response.json();
      setIsCorrect(false);
      login(data.user, data.access_token);
      navigate("/rooms");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      className="h-dvh flex bg-gradient-to-b from-cyan-900 to-cyan-800 justify-center items-center flex-col"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-xl mb-2 md:text-3xl">
        Inicio de <span className="text-blue-400">sesion</span>
      </h1>
      <form
        onSubmit={handleSubmit}
        className="rounded-xl w-full max-w-[300px] p-2"
      >
        <div className="mb-6 w-full">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="ejemplo@yatusabes.com"
            required
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
            required
          />
        </div>

        <div className="flex flex-col justify-center ">
          <div
            className={`text-red-500 select-none text-center mb-3 transition-opacity ${isCorrect ? "opacity-100" : "opacity-0"}`}
          >
            <p>Datos incorrectos, intente de nuevo</p>
          </div>
          <button className="bg-green-800 cursor-pointer hover:bg-green-600 transition-colors p-4 rounded-lg py-1">
            Enviar
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default Login;
