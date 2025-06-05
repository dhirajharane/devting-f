import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";
import { useEffect } from "react";
import ConnectionCard from "./ConnectionCard";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    if (connections) return;
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0)
    return (
      <div>
        
        <p> No Connections Found </p>
      </div>
    );

  return (
    <div className="items-center flex flex-col">
      <h1 className="text-3xl font-bold my-4 text-center">Connections</h1>
      <div className="flex flex-row flex-wrap items-center px-7 py-8">
        {connections.map((connection) => (
          <ConnectionCard key={connection._id} user={connection} />
        ))}
      </div>
    </div>
  );
};
export default Connections;
