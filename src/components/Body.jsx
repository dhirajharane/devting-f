import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { BASE_URL, BG_IMG } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state) => state.user);

  const fetchUser = async () => {
    if (user) return;
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true, // this is making sure that it passes our browser cookies while making req
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const isChatPage = location.pathname.startsWith("/chat");

  return (
    <div className="min-h-screen flex flex-col">
      {!isChatPage && <Header />}
      <div>
        <img
          src={BG_IMG}
          alt="banner"
          className="w-full h-screen object-cover fixed top-0 left-0 -z-10 opacity-40"
        />
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default Body;
