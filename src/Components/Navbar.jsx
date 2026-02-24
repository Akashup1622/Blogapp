
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../Redux/Authslice";
import { account } from "../lib/appwrite";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

 const Logout = async () => {
  try {
    // Check if user is logged in
    const session = await account.getSession("current");

    if (session) {
      await account.deleteSession("current");
    }

    dispatch(logOut());
    toast.success("Logout successful");
    navigate("/login");
  } catch (error) {
    console.error("Logout error:", error);

    // If already logged out, still clear frontend state
    dispatch(logOut());
    navigate("/login");
    toast.success("Logged out");
  }
};
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-indigo-600 tracking-wide"
        >
          Blogify
        </Link>

        {/* Menu */}
        <ul className="flex items-center gap-6 text-lg font-medium">
          <li>
            <Link
              to="/"
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              Home
            </Link>
          </li>

          {/* <li>
            <Link
              to="/"
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              All Blogs
            </Link>
          </li> */}

          {user && (
            <li>
              <Link
                to={`/dashboard/${user.userId}`}
                className="text-gray-700 hover:text-indigo-600 transition"
              >
                Dashboard
              </Link>
            </li>
          )}

          {!user ? (
            <>
              <li>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                >
                  Signup
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={Logout}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
