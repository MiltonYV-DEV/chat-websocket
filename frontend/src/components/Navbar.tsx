import { useState } from "react";
import "./styles/Navbar.css"; // Assuming you have a CSS file for styles
const Navbar: React.FC = () => {
  const [menuActive, setMenuActive] = useState(false);

  const handleNav = () => {
    setMenuActive(!menuActive);
  };

  const navItems = [
    {
      item: "Inicio",
      href: "/",
    },
    {
      item: "Perfil",
      href: "/profile",
    },
    {
      item: "Cerrar sesion",
      href: "/logout",
    },
  ];

  return (
    <div className="fixed z-50">
      <nav className="fixed w-full flex justify-center z-50">
        <div className="flex max-w-[1200px] w-full m-2 h-[60px] bg-black/50 backdrop-blur rounded-lg justify-between items-center text-xl p-2 lg:px-4 text-white">
          <a href="/">
            <h1 className="text-2xl lg:text-3xl font-bold">
              Idea<span className="text-blue-400 font-bold">World!</span>
            </h1>
          </a>

          <div>
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
        </div>
      </nav>
      <div className="flex justify-center fixed w-full">
        <div
          className={`${menuActive ? "top-[75px]" : "top-[-200%]"} transition-all ease-in-out duration-700 w-[97%] bg-black/50 rounded-lg backdrop-blur-md fixed max-w-[1200px] h-[calc(100vh-85px)] lg:h-[calc(100vh-90px)]`}
        ></div>
      </div>
    </div>
  );
};

export default Navbar;
