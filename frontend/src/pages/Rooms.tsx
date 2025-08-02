import { motion } from "framer-motion";
const Rooms = () => {
  const getRooms = async () => {};

  const chatRooms = [
    { id: 1, name: "General", usuarios: 10 },
    { id: 2, name: "Programación", usuarios: 5 },
  ];
  return (
    <motion.div className="h-screen bg-gradient-to-br from-emerald-600 to-blue-800 flex-col gap-4 flex justify-center items-center">
      <h1 className="text-2xl lg:text-3xl text-blue-400">Salas</h1>
      <main className="flex flex-wrap gap-4 justify-center items-center w-full">
        {chatRooms.map((room) => (
          <div
            className="w-full px-4 shadow-black/40 shadow-xl flex items-center rounded-lg bg-slate-900 max-w-[300px] h-[70px]"
            key={room.id}
          >
            <div>
              <img />
            </div>
            <div>
              <p>{room.name}</p>
              <p>Usuarios: {room.usuarios}</p>
            </div>
          </div>
        ))}
      </main>
    </motion.div>
  );
};

export default Rooms;
