import devbg from "./devbg.png";


export const BG_IMG=devbg;
export const LOGO_IMG = "/image.png";



const isLocalhost = window.location.hostname === "localhost";

export const BASE_URL = isLocalhost
  ? "http://localhost:3000"
  : "https://devting-b.onrender.com";
