import { motion } from "framer-motion";
import { useState, useEffect } from "react";

type Message = {
  id?: number;
  text: string;
  username: string;
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
  const [isActive, setIsActive] = useState(false);

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
    if (socket && socket.readyState === WebSocket.OPEN && input.length > 0) {
      const messageData = {
        username: localStorage.getItem("username"),
        text: input,
      };
      socket.send(JSON.stringify(messageData));
      setInput("");
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [isActive]);

  useEffect(() => {
    if (activeRoom) {
      const ws = new WebSocket(
        `${import.meta.env.VITE_WS_URL}/ws/${activeRoom.name}`,
      );

      ws.onopen = () => {
        console.log(`Conectado a sala: ${activeRoom.name}`);
      };

      ws.onmessage = (e) => {
        try {
          const messageJSON = JSON.parse(e.data);
          setMessages((prev) => [...prev, messageJSON]);
        } catch (err) {
          console.error("❌ Mensaje no es JSON válido:", e.data, err);
        }
      };

      ws.onerror = (error) => {
        console.error("Error en WebSocket:", error);
      };

      ws.onclose = () => {
        console.log(`Desconectado de sala: ${activeRoom.name}`);
      };

      setSocket(ws);

      setMessages([]);

      return () => {
        ws.close();
      };
    }
  }, [activeRoom]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.3 }}
      className="h-screen bg-gradient-to-br from-emerald-600 to-blue-800 flex-col gap-4 flex justify-center items-center p-2"
    >
      <h1 className="text-2xl lg:text-3xl text-blue-400">Salas</h1>

      {/* Salas disponibles */}
      <div className="flex flex-wrap gap-4 justify-center items-center w-full">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="w-full justify-between px-4 shadow-black/40 shadow-xl flex items-center rounded-lg bg-slate-900/70 max-w-[300px] h-[70px]"
          >
            <div>
              <p className="text-white">Sala: {room.name}</p>
            </div>
            <button
              onClick={() => setActiveRoom(room)}
              className="bg-green-600 p-1 rounded-lg text-white hover:bg-green-700"
            >
              Entrar sala
            </button>
          </div>
        ))}
      </div>

      {/* Chat activo */}
      {activeRoom && (
        <main className="bg-slate-900/70 flex flex-col justify-between w-full max-w-[616px] rounded-lg h-[50%] p-3 mt-6">
          <h3 className="text-center p-2 text-white text-xl font-semibold">
            Sala: {activeRoom.name}
          </h3>

          {/* Área de mensajes */}
          <div className="bg-slate-700/50 w-full h-[70%] rounded-lg p-4 overflow-y-auto text-white text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 ${msg.username === localStorage.getItem("username") ? "text-right" : ""}`}
              >
                <span className="font-semibold">{msg.username}:</span>{" "}
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input + botón enviar */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex pt-2 gap-2"
          >
            <input
              className="bg-slate-800 p-2 rounded-lg resize-none w-full text-white"
              // rows={2}
              value={input}
              onChange={(e) => setInput(e.currentTarget.value)}
            />
            <button
              onClick={() => sendMessage()}
              className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600"
            >
              Enviar
            </button>
          </form>
        </main>
      )}
    </motion.div>
  );
};

export default Rooms;
