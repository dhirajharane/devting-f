import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";



const Login = () => {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const [emailId, SetEmailId] = useState("");
  const [password, SetPassword] = useState("");
  const[firstName,SetFirstName]=useState("");
  const[lastName,SetLastName]=useState("");
  const[isLogin,SetIsLogin]=useState(true);
  const [error, SetError] = useState("");

  const toggleLoginForm = () => {
    SetIsLogin(!isLogin);
  };

  const user = useSelector((state) => state.user);

  useEffect(()=>{
    if(user && isLogin) navigate("/");
  },[user,navigate])

  const handleLogin = async () => {
    
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      SetError(err?.response?.data || "Something Went Wrong");
    }
  };

  const handleSignUp = async () => {
    
    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      SetError(err?.response?.data || "Something Went Wrong");
    }
  };



  return (
  <div className="flex-1 flex flex-col justify-center items-center w-full px-4 sm:px-0">
    <h1 className="font-bold sm:text-4xl bg-black/50 text-lg text-primary  sm:-mt-18 z-60 mb-6 sm:mb-7 text-center mr-20 sm:mr-2 animate-pulse">
      Find Your Coding Match!!
    </h1>

    <div className="w-[75%] max-w-[320px] sm:max-w-md bg-black/80 rounded-xl px-4 sm:px-6 py-5 sm:py-6 mt-4 sm:mt-9 mr-24">
      <h1 className="ml-0.5 sm:text-2xl text-lg font-semibold text-white mb-4 text-center sm:text-left">
        {isLogin ? "Sign In" : "Sign Up"}
      </h1>

      <div className="flex flex-col py-2 sm:py-4">
        {!isLogin && (
          <>
            <label className="mb-1 ml-0.5 text-sm sm:text-base">First Name</label>
            <input
              value={firstName}
              className="text-white border border-gray-700 placeholder-bg-base-100 rounded px-3 sm:px-4 py-2 sm:py-3 mb-4 sm:mb-5 focus:outline-none focus:ring-2 focus:ring-primary w-full text-sm"
              type="text"
              placeholder="First Name"
              onChange={(e) => SetFirstName(e.target.value)}
            />

            <label className="mb-1 ml-0.5 text-sm sm:text-base">Last Name</label>
            <input
              value={lastName}
              className="text-white border border-gray-700 placeholder-bg-base-100 rounded px-3 sm:px-4 py-2 sm:py-3 mb-4 sm:mb-5 focus:outline-none focus:ring-2 focus:ring-primary w-full text-sm"
              type="text"
              placeholder="Last Name"
              onChange={(e) => SetLastName(e.target.value)}
            />
          </>
        )}

        <label className="mb-1 ml-0.5 text-sm sm:text-base">E-mail</label>
        <input
          value={emailId}
          className="text-white border border-gray-700 placeholder-bg-base-100 rounded px-3 sm:px-4 py-2 sm:py-3 mb-4 sm:mb-5 focus:outline-none focus:ring-2 focus:ring-primary w-full text-sm"
          type="email"
          placeholder="E-Mail"
          onChange={(e) => SetEmailId(e.target.value)}
        />

        <label className="mb-1 ml-0.5 text-sm sm:text-base">Password</label>
        <input
          value={password}
          className="text-white border border-gray-700 placeholder-bg-base-100 rounded px-3 sm:px-4 py-2 sm:py-3 mb-4 sm:mb-5 focus:outline-none focus:ring-2 focus:ring-primary w-full text-sm"
          type="password"
          placeholder="Password"
          onChange={(e) => SetPassword(e.target.value)}
        />

        <p className="text-error text-sm mb-3">{error}</p>

        <button
          className="bg-primary hover:opacity-80 transition-colors text-white font-semibold rounded px-4 py-2 sm:py-3 mb-3 w-full text-sm sm:text-base"
          onClick={isLogin ? handleLogin : handleSignUp}
        >
          {isLogin ? "Sign In" : "Sign Up"}
        </button>

        <p className="text-gray-400 font-semibold text-sm sm:text-base text-center">
          {isLogin ? "New to DevTing?" : "Already Registered?"}
          {" "}
          <a
            onClick={toggleLoginForm}
            href="#"
            className="text-white font-semibold ml-1"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </a>
        </p>
      </div>
    </div>
  </div>
);

};
export default Login;
