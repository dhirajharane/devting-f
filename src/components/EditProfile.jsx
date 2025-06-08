import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [emailId] = useState(user?.emailId || "");
  const [about, setAbout] = useState(user?.About || "");
  const [skills, setSkills] = useState(user?.Skills?.join(", ") || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, SetGender] = useState(user?.gender || "");
  const [error, SetError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName,
          lastName,
          About: about,
          Skills: skills.split(",").map((s) => s.trim()),
          photoURL,
          age,
          gender,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      SetError(err.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start justify-center p-4 sm:p-6 min-h-screen z-10">
      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="alert alert-success shadow-lg px-8 py-4 rounded-xl text-lg font-semibold">
            Profile saved successfully!
          </div>
        </div>
      )}

      <div className="card w-full max-w-md shadow-xl flex-shrink-0">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center mb-4 mt-12 sm:mt-0">
            Edit Profile
          </h2>
          <div className="space-y-4">
            <div className="avatar self-center mb-3">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={
                    photoURL ||
                    "https://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
                  }
                  alt="Profile"
                  className="object-cover"
                />
              </div>
            </div>
            <label className="block text-sm font-medium text-base-content">
              Profile Picture URL
            </label>
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="input input-bordered w-full mt-1 focus:ring-primary focus:border-primary"
              placeholder="Enter photo URL"
            />
            <label className="block text-sm font-medium text-base-content">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input input-bordered w-full mt-1 focus:ring-primary focus:border-primary"
              placeholder="Enter first name"
              required
            />
            <label className="block text-sm font-medium text-base-content">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input input-bordered w-full mt-1 focus:ring-primary focus:border-primary"
              placeholder="Enter last name"
              required
            />
            <label className="block text-sm font-medium text-base-content">
              Email
            </label>
            <input
              type="email"
              value={emailId}
              className="input input-bordered w-full mt-1 bg-base-200 text-base-content/50 cursor-not-allowed"
              disabled
            />
            <label className="block text-sm font-medium text-base-content">
              Age
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="input input-bordered w-full mt-1 focus:ring-primary focus:border-primary"
              placeholder="Enter age"
              min="18"
              required
            />
            <label className="block text-sm font-medium text-base-content">
              Gender
            </label>
            <input
              type="text"
              className="input input-bordered w-full mt-1 focus:ring-primary focus:border-primary"
              value={gender}
              onChange={(e) => SetGender(e.target.value)}
              placeholder="Enter gender"
            />
            <label className="block text-sm font-medium text-base-content">
              About
            </label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="textarea textarea-bordered w-full mt-1 focus:ring-primary focus:border-primary"
              placeholder="Tell us about yourself"
              rows={4}
            />
            <label className="block text-sm font-medium text-base-content">
              Skills (comma-separated)
            </label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="input input-bordered w-full mt-1 focus:ring-primary focus:border-primary"
              placeholder="e.g., JavaScript, Python, React"
            />
            <p className="text-sm text-base-content/70 mt-1">
              Enter skills separated by commas
            </p>
            {error && (
              <div className="alert alert-error py-2 px-4 rounded mt-2">
                {error}
              </div>
            )}
            <div className="card-actions sm:justify-end justify-end-safe gap-4 mt-4 sm:mr-0 mr-16">
              <button
                onClick={() => window.history.back()}
                className="btn btn-outline btn-secondary transition-all duration-200 hover:bg-secondary/10"
              >
                Cancel
              </button>
              <button
                onClick={saveProfile}
                className="btn btn-primary transition-all duration-200 hover:bg-primary/90"
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="card w-full max-w-sm shadow-xl flex-shrink-0 mt-24">
        <div className="card-body">
          <UserCard
            user={{
              firstName,
              lastName,
              photoURL,
              age,
              gender,
              About: about,
              Skills: skills.split(",").map((s) => s.trim()),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;