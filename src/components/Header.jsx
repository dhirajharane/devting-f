import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL, LOGO_IMG } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { useState } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogOut = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  const closeDropdown = () => setDropdownOpen(false);

  return (
    <header className="top-0 z-50 bg-gradient-to-b from-black/70 to-base-200 shadow-xl">
      <nav className="navbar flex flex-row flex-wrap sm:px-6 px-9 w-full justify-between items-center sm:gap-4 gap-1 sm:h-28 h-22 sm:mb-4">
        {/* Logo and Brand */}
        
        <Link to="/" className="flex items-center gap-1 sm:gap-2">
          <img
            className="sm:w-56 sm:h-34 -ml-8 sm:-ml-0 w-36 h-22 object-contain drop-shadow-lg brightness-125"
            src={LOGO_IMG}
            alt="Logo"
          />
        </Link>

        {/* Search Box */}
        {user && (
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-base-100 rounded-full shadow-md px-2 py-1 w-full mr-28 sm:mr-72 max-w-md mx-auto border border-primary/30 focus-within:ring-2 focus-within:ring-primary transition"
          >
            <input
              type="text"
              className="input input-bordered bg-transparent border-0 focus:outline-none focus:ring-0 text-white placeholder:text-base-content/60 w-full sm:px-3"
              placeholder="Search users, skills..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-primary btn-sm rounded-full sm:ml-2 sm:px-4 px-3 shadow hover:scale-105 transition-transform"
              aria-label="Search"
            >
              <svg
                className="sm:w-5 sm:h-5 w-3 h-3"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                />
              </svg>
            </button>
          </form>
          
        )}
        

        {/* User Dropdown */}
        <div className="flex gap-2 sm:gap-2 items-center">
          {user && (
            <div className="dropdown dropdown-end flex items-center sm:z-0 z-20 -mt-52 sm:-mt-0 ml-26 sm:ml-0">
              <span className="sm:mr-2 mr-1 text-white font-medium text-xs sm:text-lg">Welcome, </span>
              <span className="text-primary font-bold text-sm sm:text-lg sm:mr-2 mr-12">
                {user.firstName}
              </span>

              <div
                tabIndex={0}
                role="button"
                className="btn btn-circle sm:btn-ghost ring-0 sm:avatar sm:ring-primary sm:ring-offset-2 -ml-12 sm:-ml-0"
                onClick={() => setDropdownOpen((open) => !open)}
              >
                <div className="sm:w-12 sm:h-12 w-6 h-6 rounded-full overflow-hidden sm:border-2 border-1 border-primary">
                  <img alt="User Photo" src={user.photoURL} />
                </div>
              </div>

              {dropdownOpen && (
                <ul
                  tabIndex={0}
                  className="ml-12 menu menu-sm dropdown-content bg-base-200 rounded-box shadow-lg mt-42 w-48 p-2"
                  onClick={closeDropdown}
                >
                  <li>
                    <Link
                      to="/profile"
                      className="justify-between font-semibold"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/connections">Connections</Link>
                  </li>
                  <li>
                    <Link to="/requests">Requests</Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogOut}
                      className="text-error font-bold"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
