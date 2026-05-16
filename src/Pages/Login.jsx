import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { account } from "../lib/appwrite";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin } from "../Redux/Authslice";

export const Login = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

 const Signin = async (data) => {
  try {
    setLoading(true);

    // 👉 delete old session (safe)
    try {
      await account.deleteSession("current");
    } catch (err) {
      console.log("No active session");
    }

    console.log("Form Data:", data);

    // 👉 login
    const session = await account.createEmailPasswordSession(
      data.email,
      data.password
    );

    // 👉 FETCH USER (IMPORTANT)
    const user = await account.get();

    // 👉 COMPLETE DATA
    const loginData = {
      id: session.$id,
      userId: session.userId,
      email: user.email,
      name: user.name,
    };

    // 👉 store
    localStorage.setItem("loginDetails", JSON.stringify(loginData));
    dispatch(signin(loginData));

    toast.success("Login successful");
    navigate(`/dashboard/${session.userId}`);

  } catch (error) {
    toast.error(error.message);
    console.error("Login error:", error);
  } finally {
    setLoading(false);
  }
};
  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="w-full max-w-md z-10">
        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/60 p-10 border border-slate-100">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="bg-violet-600 text-white w-12 h-12 flex items-center justify-center rounded-2xl shadow-lg shadow-violet-200 rotate-3 mx-auto mb-6">
              <span className="text-2xl font-bold">B</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-slate-500 mt-2 font-medium">
              Log in to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(Signin)} className="space-y-6">
            
            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                Email Address
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="you@example.com"
                required
                className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 focus:outline-none transition-all duration-200 bg-slate-50/50"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="text-sm font-bold text-slate-700">
                  Password
                </label>
              </div>
              <input
                type="password"
                {...register("password")}
                placeholder="••••••••"
                required
                className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 focus:outline-none transition-all duration-200 bg-slate-50/50"
              />
            </div>

            {/* Button */}
            <button
              disabled={loading}
              className={`w-full py-4 rounded-2xl text-white font-bold transition-all duration-300 shadow-lg 
                ${loading
                  ? "bg-violet-400 cursor-not-allowed"
                  : "bg-violet-600 hover:bg-violet-700 hover:shadow-violet-200 active:scale-[0.98]"}
              `}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Logging in...
                </span>
              ) : "Sign in"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-slate-500 mt-8 font-medium">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-violet-600 font-bold hover:text-violet-700 transition-colors"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};
