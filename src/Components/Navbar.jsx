
import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Menu, X, LayoutDashboard, LogOut, User } from "lucide-react";
import { logOut } from "../Redux/Authslice";
import { account } from "../lib/appwrite";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const Logout = async () => {
    try {
      const session = await account.getSession("current");
      if (session) {
        await account.deleteSession("current");
      }
      dispatch(logOut());
      toast.success("Logout successful");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      dispatch(logOut());
      navigate("/login");
      toast.success("Logged out");
    }
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
        
        {/* ===== Logo ===== */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-indigo-600 tracking-wide"
        >
          <span className="bg-indigo-600 text-white px-2 py-1 rounded-lg">
            B
          </span>
          Blogify
        </Link>

        {/* ===== Desktop Menu ===== */}
        <ul className="hidden md:flex items-center gap-8 text-[15px] font-medium">
          <li>
            <Link
              to="/"
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              Home
            </Link>
          </li>

          {user && (
            <li>
              <Link
                to={`/dashboard/${user.userId}`}
                className="flex items-center gap-1 text-gray-700 hover:text-indigo-600 transition"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
            </li>
          )}

          {!user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition shadow"
              >
                Signup
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              {/* Avatar */}
              {/* <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
                <User size={18} className="text-indigo-600" />
                <span className="text-sm font-medium text-gray-700">
                  {user.name || "User"}
                </span>
              </div> */}

              <button
                onClick={Logout}
                className="flex items-center gap-1 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition shadow-sm"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </ul>

        {/* ===== Mobile Menu Button ===== */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* ===== Mobile Menu ===== */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <ul className="flex flex-col px-6 py-4 gap-4 font-medium">
            <li>
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 hover:text-indigo-600 transition"
              >
                Home
              </Link>
            </li>

            {user && (
              <li>
                <Link
                  to={`/dashboard/${user.userId}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-700 hover:text-indigo-600 transition"
                >
                  Dashboard
                </Link>
              </li>
            )}

            {!user ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 rounded-lg border border-indigo-600 text-indigo-600 text-center"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-center"
                >
                  Signup
                </Link>
              </>
            ) : (
              <button
                onClick={Logout}
                className="px-4 py-2 rounded-lg bg-red-500 text-white"
              >
                Logout
              </button>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
