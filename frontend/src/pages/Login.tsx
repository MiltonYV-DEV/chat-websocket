const Login = () => {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.currentTarget.email.value);
    console.log(e.currentTarget.password.value);
  };

  const login = async (credentials: LoginData): Promise<void> => {
    try {
      const response = await fetch("http://localhost:3000/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Error al iniciar sesion");
      }

      const data: LoginResponse = await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-dvh flex bg-black justify-center items-center flex-col">
      <h1 className="text-xl mb-2">
        Inicio de <span className="text-blue-500">sesion</span>
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
        <div className="mb-6">
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
        <div className="flex justify-center">
          <button className="bg-green-800 cursor-pointer hover:bg-green-600 transition-colors p-4 rounded-lg py-1">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
