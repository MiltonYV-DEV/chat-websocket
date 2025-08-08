import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface NewData {
  username?: string | null;
  email?: string | null;
  password?: string | null;
  password_new?: string | null;
}

const Profile = () => {
  const [formData, setFormData] = useState<HTMLFormElement | NewData>({
    username: "",
    email: "",
    password: "",
    password_new: "",
  });
  const [switchData, setSwitchData] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const sendNewData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user_update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();
      console.log(data);
      localStorage.setItem("username", formData.username);
      setSwitchData(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setIsActive(true);
      const user = JSON.parse(localStorage.getItem("user") || "null");
      setFormData({
        username: localStorage.getItem("username"),
        email: user.email,
        password: "",
        password_new: "",
      });
    } else {
      setIsActive(false);
    }
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.3 }}
      className="h-screen w-full flex justify-center items-center"
    >
      {isActive ? (
        <div className="bg-black/50 text-white/80 w-full max-w-[500px] gap-4 m-2 h-[70%] max-h-[550px] overflow-y-auto flex flex-col items-center justify-center rounded-lg p-4">
          <h3 className="text-xl font-bold text-blue-400">Perfil</h3>
          <div className="rounded-lg overflow-hidden max-w-[200px]">
            <img
              className="object-cover h-full w-full"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            />
          </div>
          <form onSubmit={sendNewData} className="flex gap-2 flex-col">
            <div className="flex flex-col md:flex-row gap-2 items-center">
              <section className="w-full">
                <div className="w-full">
                  <label className="block">Nombre de usuario:</label>
                  <input
                    value={formData?.username || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    className="bg-slate-700 rounded-lg p-2 w-full"
                  />
                </div>

                <div>
                  <label className="block">Correo</label>
                  <input
                    type="email"
                    value={formData?.email || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="bg-slate-700 rounded-lg p-2 w-full"
                  />
                </div>
              </section>

              <section className="w-full">
                <div>
                  <label className="block">Contraseña</label>
                  <input
                    type="password"
                    minLength={6}
                    placeholder="**********"
                    value={formData.password || ""}
                    required
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        password: e.currentTarget.value,
                      })
                    }
                    className="bg-slate-700 rounded-lg p-2 w-full"
                  />
                </div>

                <div>
                  <label className="block">Nueva contraseña</label>
                  <input
                    minLength={6}
                    placeholder="*********"
                    type="password"
                    value={formData.password_new || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        password_new: e.currentTarget.value,
                      })
                    }
                    className="bg-slate-700 rounded-lg p-2 w-full"
                  />
                </div>
              </section>
            </div>

            <p className="text-center text-white/50">
              {switchData
                ? "Actualizaste tus datos"
                : "La contraseña es obligatoria para cualquier cambio"}
            </p>

            <button
              type="submit"
              className="bg-green-600 cursor-pointer hover:bg-green-700 transition-colors rounded-lg p-2 text-white"
            >
              Actualizar datos
            </button>
          </form>
        </div>
      ) : (
        <h3>Necesitas estar logeado {}</h3>
      )}
    </motion.div>
  );
};

export default Profile;
