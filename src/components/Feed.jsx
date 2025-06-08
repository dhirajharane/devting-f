import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    if(feed) return;
    try {
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.users));
    } catch (err) {
      console.log("Feed Error", err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, [dispatch]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      {feed && feed.length > 0 ? (
        <UserCard user={feed[0]} />
      ) : (
        <p className="text-center font-bold sm:text-2xl text-lg text-gray-400 sm:mt-8 -mt-84 mr-22 sm:mr-2">
          No feed data found.
        </p>
      )}
    </div>
  );
};

export default Feed;