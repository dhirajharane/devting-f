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
    <div className="bg-base-300 w-2/3 shadow-lg rounded-xl my-4 mx-auto">
      <div className="flex p-4 gap-4 items-start justify-between">
        <div className="flex gap-4 items-start w-full">
          <img
            src={photoURL}
            alt="Profile"
            className="rounded-lg w-22 h-22 object-cover"
          />
          <div className="flex flex-col w-full max-w-4xl">
            <h2 className="font-bold text-xl mb-2 text-white">
              {firstName + " " + lastName}
            </h2>
            <p className="text-sm text-white break-words whitespace-pre-line">
              {About}
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-4 items-center ml-4 mt-5">
          <button className="btn btn-primary"  onClick={() => handleRequest("accepted", user._id)}>Accept</button>
          <button className="btn btn-error"  onClick={() => handleRequest("rejected", user._id)}>Reject</button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;