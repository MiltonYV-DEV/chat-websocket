import { useEffect, useState } from "react";
const Register = () => {
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  useEffect(() => {
    if (password === passwordConfirm) {
      console.log("Las contraseñas coinciden");
    }
  }, [password, passwordConfirm]);

  return (
    <div className="h-dvh bg-black flex justify-center items-center flex-col">
      <form className="rounded-xl w-full max-w-[300px] p-2">
        <div className="mb-3">
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Apodo
          </label>
          <input
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="juanito"
            required
          />
        </div>
        <div className="mb-3">
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
            placeholder="pedrito@company.com"
            required
          />
        </div>
        <div className="mb-3">
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
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Repetir contraseña
          </label>
          <input
            type="password"
            id="password_confirm"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
            required
            onChange={(e) => setPasswordConfirm(e.currentTarget.value)}
          />
        </div>
        <div className="flex justify-center">
          <button className="bg-green-800 cursor-pointer hover:bg-green-600 transition-colors p-4 rounded-lg py-1">
            Crear
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
