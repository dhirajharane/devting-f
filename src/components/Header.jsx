import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL, LOGO_IMG } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import {  useState } from "react";

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
      <nav className="navbar flex  px-6  w-full justify-between items-center gap-4 h-28">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center gap-2">
          <img
            className="w-50 h-34 object-contain drop-shadow-lg brightness-125"
            src={LOGO_IMG}
            alt="Logo"
          />
        </Link>

        {/* Search Box */}
        {user && (
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-base-100 rounded-full shadow-md px-2 py-1 w-full max-w-md mx-auto border border-primary/30 focus-within:ring-2 focus-within:ring-primary transition"
        >
          <input
            type="text"
            className="input input-bordered bg-transparent border-0 focus:outline-none focus:ring-0 text-white placeholder:text-base-content/60 w-full px-3"
            placeholder="Search users, skills, or interests..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-primary btn-sm rounded-full ml-2 px-4 shadow hover:scale-105 transition-transform"
            aria-label="Search"
        
          >
            <svg
              className="w-5 h-5"
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
        <div className="flex gap-2 items-center">
          {user && (
            <div className="dropdown dropdown-end flex items-center">
              <span className="mr-2 text-white hidden sm:block">Welcome, </span>
              <span className="text-primary font-bold text-lg mr-2">
                {user.firstName}
              </span>

              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar ring ring-primary ring-offset-2"
                onClick={() => setDropdownOpen((open) => !open)}
              >
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
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
