import { motion } from "framer-motion";
import { useState, useEffect } from "react";

type Message = {
  id?: number;
  text: string;
  user: string;
  timestamp?: string;
};

type Room = {
  id?: number;
  name: string;
};

const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [activeRoom, setActiveRoom] = useState<Room | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const getRooms = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms`);
    if (!response.ok) {
      throw new Error("Error al obtener las salas");
    }
    const data = await response.json();
    console.log(data);
    setRooms(data);
  };

  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(input);
      setInput("");
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  useEffect(() => {
    if (activeRoom) {
      const ws = new WebSocket(
        `${import.meta.env.VITE_WS_URL}/ws/${activeRoom.name}`,
      );
      ws.onmessage = (e) => {
        setMessages((prev) => [...prev, e.data]);
      };
      setSocket(ws);

      return () => ws.close();
    }
  }, [activeRoom]);

  return (
    <motion.div className="h-screen bg-gradient-to-br from-emerald-600 to-blue-800 flex-col gap-4 flex justify-center items-center p-2">
      <h1 className="text-2xl lg:text-3xl text-blue-400">Salas</h1>
      <div className="flex flex-wrap gap-4 justify-center items-center w-full">
        {rooms.map((room) => (
          <div
            className="w-full justify-between px-4 shadow-black/40 shadow-xl flex items-center rounded-lg bg-slate-900 max-w-[300px] h-[70px]"
            key={room.id}
          >
            <div>
              <p>Sala: {room.name}</p>
              {/* <p>Usuarios: {room.usuarios}</p> */}
            </div>
            <button
              onClick={() => setActiveRoom(room)}
              className="bg-green-600 p-1 rounded-lg"
            >
              Entrar sala
            </button>
          </div>
        ))}
      </div>
      <main className="bg-slate-900 w-full max-w-[616px] rounded-lg h-[50%] p-3">
        <h3 className="text-center p-2">{activeRoom?.name}</h3>
        <div className="bg-slate-700 w-full h-[70%] rounded-lg"></div>
      </main>
    </motion.div>
  );
};

export default Rooms;
