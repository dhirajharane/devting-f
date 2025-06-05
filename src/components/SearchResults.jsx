import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";

const SearchResults = () => {
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get query from URL
  const params = new URLSearchParams(location.search);
  const query = params.get("q") || "";

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/search?q=${query}`, {
          withCredentials: true,
        });
        setUsers(res?.data?.users || []);
      } catch (err) {
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    if (query) fetchUsers();
    else setLoading(false);
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col items-center pt-10">
      <h2 className="text-3xl font-bold mb-6 text-white">Search Results</h2>
      {loading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : users.length === 0 ? (
        <p className="text-lg text-gray-400">No users found.</p>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          {users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      )}
      
    </div>
  );
};

export default SearchResults;