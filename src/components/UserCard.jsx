import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const {
    _id,
    firstName,
    lastName,
    About,
    age,
    gender,
    photoURL,
    Skills = [],
  } = user;
  const dispatch = useDispatch();

  const handleRequests = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(user._id));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="card bg-gradient-to-br from-primary/60 to-base-200 shadow-2xl rounded-3xl w-96 overflow-hidden border border-primary/30 hover:scale-105 transition-transform duration-300 h-[520px]">
        <figure className="relative">
          <img
            src={photoURL}
            alt="Profile Photo"
            className="w-36 h-36 object-cover rounded-full border-4 border-primary shadow-lg mx-auto mt-8"
          />
          <div className="absolute top-4 right-4 bg-base-100/80 px-3 py-1 rounded-full text-xs font-semibold text-primary shadow">
            {age && <span>{age} yrs</span>}{" "}
            {gender && <span className="ml-1">{gender}</span>}
          </div>
        </figure>
        <div className="card-body items-center text-center px-6 pb-6">
          <h2 className="card-title text-2xl font-bold text-white mb-1">
            {firstName} {lastName}
          </h2>
          <p className="text-base-content/80 mb-3">{About}</p>
          <div className="flex flex-wrap gap-2 justify-center mb-4 min-h-[48px]">
            {Skills && Skills.length > 0 ? (
              Skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="badge border-primary text-blue-500/80 px-3 py-1 rounded-full text-sm font-semibold shadow"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-sm text-base-content/40 italic">
                No skills listed
              </span>
            )}
          </div>

          <div className="card-actions mt-2 flex gap-4">
            <button
              className="btn btn-secondary btn-outline rounded-full px-6 font-bold shadow hover:scale-105 transition-transform"
              onClick={() => handleRequests("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-primary rounded-full px-6 font-bold shadow hover:scale-105 transition-transform"
              onClick={() => handleRequests("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
