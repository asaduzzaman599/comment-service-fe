import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;
export const connectSocket = (): Socket => {
  if (!socket) {
    const uri = import.meta.env.VITE_SOCKET_URL
    console.log(uri)
    socket =  io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5000/api/v1", {
    auth: { token: localStorage.getItem("token") },
    transports: ["websocket"],
  });

  }
  return socket;
};