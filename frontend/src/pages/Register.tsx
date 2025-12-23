import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

const API_URL = import.meta.env.VITE_API_URL;

const Register = () => {
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const [errorCreate, setErrorCreate] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = {
      username: username,
      email: email,
      password: password,
    };
    if (isValid) {
      userCreate(userData);
    }
  };

  const userCreate = async (userData: RegisterData) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorCreate(true);
        throw new Error(errorData.detail || "Error en el registro");
      }

      const data = await response.json();

      setErrorCreate(false);
      navigate("/login");

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    const isUsernameValid = username.trim().length >= 5;
    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = passwordRegex.test(password);
    const isPasswordMatch = password === passwordConfirm;

    const allValid =
      isUsernameValid && isEmailValid && isPasswordValid && isPasswordMatch;
    setIsValid(allValid);

    console.log({
      isUsernameValid,
      isEmailValid,
      isPasswordValid,
      isPasswordMatch,
    });
  }, [username, email, password, passwordConfirm]);

  return (
    <motion.div
      className="h-dvh bg-gradient-to-r from-cyan-700 to-teal-800 flex justify-center items-center flex-col"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl text-blue-400 font-bold">Registrate</h2>
      <form
        onSubmit={handleSubmit}
        className="rounded-xl w-full max-w-[300px] p-2"
      >
        <div className="mb-3">
          <label
            htmlFor="first_name"
            className="block lg:text-lg mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nombre de usuario
          </label>
          <input
            type="text"
            id="first_name"
            className="bg-gray-50 lg:text-lg border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black/50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="juanito"
            required
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="email"
            className="block lg:text-lg mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Correo
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.currentTarget.value)}
            className="bg-gray-50 lg:text-lg w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-black/50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="ejemplo@ejemplo.com"
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="password"
            className="block lg:text-lg mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            minLength={6}
            className="bg-gray-50 lg:text-lg border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black/50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
            required
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="password"
            className="block lg:text-lg mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Repetir contraseña
          </label>
          <input
            minLength={6}
            type="password"
            id="password_confirm"
            className="bg-gray-50 lg:text-lg border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black/50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
            required
            onChange={(e) => setPasswordConfirm(e.currentTarget.value)}
          />
        </div>
        <div className="text-center p-2">
          <p
            className={`text-red-500 font-bold ${errorCreate ? "opacity-100" : "opacity-0"}`}
          >
            Error: Intente con otros datos.
          </p>
        </div>
        <div className="flex justify-center">
          <button
            className={`${isValid ? "bg-green-500" : "bg-gray-500"} w-full cursor-pointer  transition-colors p-4 px-4 rounded-lg py-1`}
          >
            Crear
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default Register;
