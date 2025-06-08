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
    <div className="card bg-gradient-to-br from-primary/60 to-base-200 shadow-2xl rounded-3xl w-10/12 sm:w-96 -mt-9 sm:-mt-2 overflow-hidden border border-primary/30 hover:scale-105 transition-transform duration-300 h-auto sm:h-[520px]">
      <figure className="relative pt-6">
        <img
          src={photoURL}
          alt="Profile Photo"
          className="w-24 h-24 sm:w-36 sm:h-36 object-cover rounded-full border-4 border-primary shadow-lg mx-auto"
        />
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-base-100/80 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold text-primary shadow">
          {age && <span>{age} yrs</span>}{" "}
          {gender && <span className="ml-1">{gender}</span>}
        </div>
      </figure>
      <div className="card-body items-center text-center px-4 sm:px-6 pb-4 sm:pb-6">
        <h2 className="card-title text-lg sm:text-2xl font-bold text-white mb-1">
          {firstName} {lastName}
        </h2>
        <p className="text-sm sm:text-base text-base-content/80 mb-3">{About}</p>
        <div className="flex flex-wrap gap-2 justify-center mb-4 min-h-[48px]">
          {Skills && Skills.length > 0 ? (
            Skills.map((skill, idx) => (
              <span
                key={idx}
                className="badge border-primary text-blue-500/80 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-semibold shadow"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-xs text-base-content/40 italic">
              No skills listed
            </span>
          )}
        </div>
        <div className="card-actions mt-2 flex flex-row sm:flex-row gap-4 sm:gap-4 w-full sm:w-auto ml-18 sm:ml-0">
          <button
            className="btn btn-secondary btn-outline rounded-full px-5 sm:px-6 text-sm sm:text-base font-bold shadow hover:scale-105 transition-transform"
            onClick={() => handleRequests("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-primary rounded-full px-5 sm:px-6 text-sm sm:text-base font-bold shadow hover:scale-105 transition-transform"
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
