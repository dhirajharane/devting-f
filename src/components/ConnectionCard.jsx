import { Link } from "react-router-dom";

const ConnectionCard = ({ user }) => {
  const { firstName, lastName, About, photoURL,_id } = user;

  return (
    <div className="bg-base-300 w-2/3 shadow-lg rounded-xl my-4 mx-auto">
      <div className="flex p-4 gap-4 items-start">
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

        <Link to={`/chat/${_id}`}>
        <button className="btn btn-primary mt-7 mx-3">Chat</button>
        </Link>
        
        
      </div>
    </div>
  );
};

export default ConnectionCard;