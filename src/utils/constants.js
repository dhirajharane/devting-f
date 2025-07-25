import devbg from "./devbg.png";

export const BG_IMG = devbg;
export const LOGO_IMG = "/image.png";


const isLocalhost = window.location.hostname === "localhost";

export const BASE_URL =
  import.meta.env.VITE_BACKEND_URL ||
  (isLocalhost
    ? "http://localhost:3000"
    : "https://devting-b-0brh.onrender.com");