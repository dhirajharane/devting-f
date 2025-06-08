import { Link } from "react-router-dom";

const ConnectionCard = ({ user }) => {
  const { firstName, lastName, About, photoURL, _id } = user;

  return (
    <div className="bg-base-300 sm:w-2/3 w-full shadow-lg rounded-xl my-4 sm:mx-auto px-4 py-3 sm:px-6 mr-24 sm:mr-34">
      <div className="flex flex-row sm:flex-row gap-4 items-start sm:items-center">
        {/* Profile Image */}
        <img
          src={photoURL}
          alt="Profile"
          className="rounded-lg w-9 h-9 sm:w-22 sm:h-22 object-cover"
        />

        {/* Text Content */}
        <div className="flex flex-col w-full">
          <h2 className="sm:font-bold font-medium text-xs sm:text-xl mb-1 text-white mt-2 sm:mt-0">
            {firstName + " " + lastName}
          </h2>
          <p className="sm:text-base text-white break-words whitespace-pre-line hidden sm:block">
            {About}
          </p>
        </div>

        {/* Chat Button */}
        <div className="sm:mt-0 sm:ml-auto mt-1">
          <Link to={`/chat/${_id}`}>
            <button className="btn btn-primary btn-xs sm:btn-md">Chat</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConnectionCard;
