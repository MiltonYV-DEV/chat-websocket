import { useState, useEffect } from "react";

const Profile = () => {
  const [userData, setUserData] = useState<{
    username: string;
    email: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    passwordOld: "",
    passwordNew: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    setFormData({
      username: user.username,
      email: user.email,
      passwordOld: "",
      passwordNew: "",
    });
    setUserData(user);
  }, []);
  return (
    <main className="h-screen w-full flex justify-center items-center">
      <div className="bg-black/50 text-white/80 w-full max-w-[500px] flex flex-col items-center justify-center rounded-lg p-4">
        <h3 className="text-xl font-bold text-blue-400">Perfil</h3>
        <div className="rounded-lg overflow-hidden w-40">
          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
        </div>
        <form className="flex gap-2 flex-col">
          <div className="flex flex-col md:flex-row gap-2">
            <section>
              <div>
                <label className="block">Nombre de usuario:</label>
                <input
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="bg-slate-700 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block">Correo</label>
                <input
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="bg-slate-700 rounded-lg p-2"
                />
              </div>
            </section>

            <section>
              <div>
                <label className="block">Contraseña antigua</label>
                <input
                  type="password"
                  value={formData.passwordOld}
                  onChange={(e) =>
                    setFormData({ ...formData, passwordOld: e.target.value })
                  }
                  className="bg-slate-700 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block">Nueva contraseña</label>
                <input
                  type="password"
                  value={formData.passwordNew}
                  onChange={(e) =>
                    setFormData({ ...formData, passwordNew: e.target.value })
                  }
                  className="bg-slate-700 rounded-lg p-2"
                />
              </div>
            </section>
          </div>

          <button
            type="submit"
            className="bg-green-600 rounded-lg p-2 text-white"
          >
            Actualizar datos
          </button>
        </form>
      </div>
    </main>
  );
};

export default Profile;
