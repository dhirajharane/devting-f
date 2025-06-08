import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeRequest } from "../utils/requestsSlice";
import { addConnection } from "../utils/connectionsSlice";

const RequestCard = ({ user }) => {
  const dispatch=useDispatch();
  if (!user.fromUserId) return null;
  const { firstName, lastName, About, photoURL} = user.fromUserId;

  const handleRequest=async (status,id)=>{
    try{
    await axios.post(`${BASE_URL}/request/review/${status}/${id}`,{},{withCredentials:true});
    dispatch(removeRequest(id));
    if (status === "accepted") {
      
      const acceptedUser = user.fromUserId;
      dispatch(addConnection(acceptedUser));
    }

    } catch(err){
      console.log(err.message);
    }


  }

  return (
    <div className="bg-base-300 sm:w-2/3 shadow-lg rounded-xl my-4 sm:mx-auto mx-6">
      <div className="flex sm:flex-row flex-col p-4 gap-4 items-start justify-between">
        <div className="flex gap-4 items-start  w-full">
          <img
            src={photoURL}
            alt="Profile"
            className="rounded-lg sm:w-22 sm:h-22 w-9 h-9 object-cover"
          />
          <div className="flex flex-col w-full sm:max-w-4xl">
            <h2 className="sm:font-bold font-medium sm:text-xl text-xs sm:mb-2 text-white">
              {firstName + " " + lastName}
            </h2>
            <p className="text-sm text-white break-words whitespace-pre-line hidden sm:block">
              {About}
            </p>
          </div>
        </div>
        <div className="flex flex-row sm:gap-4 gap-3 items-center sm:ml-4 ml-12 sm:mt-5 -mt-6 ">
          <button className="btn btn-primary btn-xs sm:btn-md"  onClick={() => handleRequest("accepted", user._id)}>Accept</button>
          <button className="btn btn-error sm:btn-md btn-xs"  onClick={() => handleRequest("rejected", user._id)}>Reject</button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;