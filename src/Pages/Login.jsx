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

      const session = await account.createEmailPasswordSession({
        email: data.Email,
         password:data.password,
    });

      const loginData = {
        id: session.$id,
        userId: session.userId,
      };

      localStorage.setItem("loginDetails", JSON.stringify(loginData));
      dispatch(signin(loginData));

      toast.success("Login successful");
      navigate(`/dashboard/${session.userId}`);
    } catch (error) {
      toast.error("Invalid email or password");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome Back 👋
          </h2>
          <p className="text-gray-500 mt-2">
            Log in to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(Signin)} className="space-y-4">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("Email")}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
          </div>

          {/* Button */}
          <button
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold transition 
              ${loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"}
            `}
          >
            {loading ? "Login..." : "logIn"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </section>
  );
};
