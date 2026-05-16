
import React, { useState } from "react";
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
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-slate-200/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* ===== Logo ===== */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-extrabold text-slate-900 tracking-tight"
        >
          <div className="bg-violet-600 text-white w-10 h-10 flex items-center justify-center rounded-xl shadow-lg shadow-violet-200 rotate-3 hover:rotate-0 transition-transform duration-300">
            <span className="text-xl">B</span>
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
            Blogify
          </span>
        </Link>

        {/* ===== Desktop Menu ===== */}
        <ul className="hidden md:flex items-center gap-10 text-[15px] font-semibold">
          <li>
            <Link
              to="/"
              className="text-slate-600 hover:text-violet-600 transition-colors duration-200 flex items-center gap-1"
            >
              Home
            </Link>
          </li>

          {user && (
            <li>
              <Link
                to={`/dashboard/${user.userId}`}
                className="flex items-center gap-2 text-slate-600 hover:text-violet-600 transition-colors duration-200"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
            </li>
          )}

          {!user ? (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="px-5 py-2.5 rounded-xl text-slate-700 font-bold hover:bg-slate-50 transition-all duration-200"
              >
                Sign in
              </Link>

              <Link
                to="/signup"
                className="px-6 py-2.5 rounded-xl bg-violet-600 text-white hover:bg-violet-700 transition-all duration-200 shadow-md shadow-violet-100 font-bold"
              >
                Get Started
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <button
                onClick={Logout}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-all duration-200 shadow-md font-bold text-sm"
              >
                <LogOut size={16} />
                Sign out
              </button>
            </div>
          )}
        </ul>

        {/* ===== Mobile Menu Button ===== */}
        <button
          className="md:hidden p-2 rounded-lg bg-slate-50 text-slate-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ===== Mobile Menu ===== */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-slate-100 shadow-xl animate-in slide-in-from-top duration-300">
          <ul className="flex flex-col px-6 py-6 gap-6 font-semibold">
            <li>
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="text-slate-700 hover:text-violet-600 transition block text-lg"
              >
                Home
              </Link>
            </li>

            {user && (
              <li>
                <Link
                  to={`/dashboard/${user.userId}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-slate-700 hover:text-violet-600 transition block text-lg"
                >
                  Dashboard
                </Link>
              </li>
            )}

            {!user ? (
              <div className="flex flex-col gap-4 pt-2">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 rounded-xl border border-slate-200 text-slate-700 text-center font-bold"
                >
                  Sign in
                </Link>

                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 rounded-xl bg-violet-600 text-white text-center font-bold"
                >
                  Get Started
                </Link>
              </div>
            ) : (
              <button
                onClick={() => {
                  Logout();
                  setMenuOpen(false);
                }}
                className="px-4 py-3 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center gap-2"
              >
                <LogOut size={18} />
                Sign out
              </button>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
