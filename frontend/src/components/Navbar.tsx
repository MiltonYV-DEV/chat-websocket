import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/userStore";
import { Link, useNavigate } from "react-router-dom";
import "./styles/Navbar.css";

const Navbar: React.FC = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const { logout } = useAuthStore.getState();
  const navigate = useNavigate();

  const handleNav = () => {
    setMenuActive(!menuActive);
  };

  const navItems = [
    { item: "Inicio", href: "/" },
    { item: "Perfil", href: "/profile" },
    { item: "Salas", href: "/rooms" },
    {
      item: token ? "Cerrar sesión" : "Iniciar sesión",
      href: token ? "/" : "/login",
    },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const option = e.currentTarget.id;

    if (option === "Cerrar sesión") {
      logout();
      navigate("/");
    } else if (option === "Iniciar sesión") {
      navigate("/login");
    }
  };

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("access_token");
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }
  }, []);

  return (
    <div className="fixed z-50">
      <nav className="fixed w-full flex justify-center z-50">
        <div className="flex max-w-[1200px] w-full m-2 h-[60px] bg-black/50 backdrop-blur rounded-lg justify-between items-center text-xl p-2 lg:px-4 text-white">
          <a href="/">
            <h1 className="text-2xl lg:text-3xl font-bold">
              Chat<span className="text-blue-400 font-bold">World!</span>
            </h1>
          </a>

          {/* Menu hamburguesa */}
          <div className="md:hidden">
            <div className="p-0 z-[2000]">
              <div className="btnNav hover:scale-125 transition-transform">
                <input type="checkbox" id="lanzador" />
                <label htmlFor="lanzador" onClick={handleNav}>
                  <span className="btnNav-linea bg-blue-400"></span>
                  <span className="btnNav-linea bg-blue-400"></span>
                  <span className="btnNav-linea bg-blue-400"></span>
                </label>
              </div>
            </div>
          </div>

          <div className="md:inline-flex gap-2 hidden">
            {navItems.map((item) => (
              <a
                key={item.item}
                onClick={() => item.item === "Cerrar sesion" && logout()}
                className="hover:text-blue-400 transition-colors"
                href={item.href}
              >
                {item.item}
              </a>
            ))}
          </div>
        </div>
      </nav>
      <div className="flex justify-center fixed w-full md:hidden">
        <div
          className={`flex text-3xl flex-col justify-center items-center ${menuActive ? "top-[75px]" : "top-[-200%]"} transition-all ease-in-out duration-700 w-[97%] bg-black/50 rounded-lg backdrop-blur-md fixed max-w-[1200px] h-[calc(100vh-85px)] lg:h-[calc(100vh-90px)]`}
        >
          {navItems.map((item) => (
            <Link
              className="hover:scale-110 hover:bg-black/50 text-center w-full transition-all"
              to={item.href}
              onClick={handleClick}
              key={item.item}
              id={item.item}
            >
              {item.item === "Cerrar sesión"
                ? token
                  ? "Cerrar sesión"
                  : "Iniciar sesión"
                : item.item}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
