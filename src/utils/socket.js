import io from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
  return io(BASE_URL, {
    path: "/api/socket.io",
    transports: ["websocket"], // helps with Render
    withCredentials: true,
  });
};