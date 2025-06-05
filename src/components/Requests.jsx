import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import RequestCard from "./RequestCard";
import { addRequests } from "../utils/requestsSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const fetchRequests = async () => {
    
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.connectionRequests));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) {
  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}
  if (requests.length === 0) {
    return (
      <div>
        <p className="font-bold text-center text-2xl mt-8"> No Requests Found </p>
      </div>
    );
  }

  return (
    <div className="items-center flex flex-col">
      <h1 className="text-3xl font-bold my-4 text-center">Requests</h1>
      <div className="flex flex-row flex-wrap items-center px-7 py-8">
        {requests.map((request) => (
          <RequestCard key={request._id} user={request} />
        ))}
      </div>
    </div>
  );
};
export default Requests;
