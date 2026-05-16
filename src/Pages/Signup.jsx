import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { account, databases, tablesDB } from "../lib/appwrite";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_COLLECTION_USER_ID;

export const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
  try {
    setLoading(true);

    // Create the account
    const user = await account.create(
      ID.unique(),
      data.Email,
      data.password,
      data.FirstName + ' ' + data.LastName
    );

    // Create user document in database
    await tablesDB.createRow({
      databaseId: DATABASE_ID,
      tableId: COLLECTION_ID,
      rowId: ID.unique(),
      data: {
        UserId: user.$id,
        FirstName: data.FirstName,
        LastName: data.LastName,
        Email: data.Email,
      }
    });

    toast.success("Signup Successful!");

    navigate("/login");

  } catch (err) {
    console.error(err);
    toast.error(err.message);
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

      <div className="w-full max-w-lg z-10">
        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/60 p-10 border border-slate-100">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="bg-violet-600 text-white w-12 h-12 flex items-center justify-center rounded-2xl shadow-lg shadow-violet-200 rotate-3 mx-auto mb-6">
              <span className="text-2xl font-bold">B</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Create Account
            </h2>
            <p className="text-slate-500 mt-2 font-medium">
              Join our community of writers and readers
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                  First Name
                </label>
                <input
                  {...register("FirstName", {
                    required: "First name is required",
                    minLength: { value: 2, message: "Min 2 characters" },
                  })}
                  placeholder="John"
                  className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 focus:outline-none transition-all duration-200 bg-slate-50/50"
                />
                {errors.FirstName && (
                  <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                    {errors.FirstName.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                  Last Name
                </label>
                <input
                  {...register("LastName", {
                    required: "Last name is required",
                    minLength: { value: 2, message: "Min 2 characters" },
                  })}
                  placeholder="Doe"
                  className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 focus:outline-none transition-all duration-200 bg-slate-50/50"
                />
                {errors.LastName && (
                  <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                    {errors.LastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                Email Address
              </label>
              <input
                type="email"
                {...register("Email", {
                  required: "Email is required",
                })}
                placeholder="you@example.com"
                className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 focus:outline-none transition-all duration-200 bg-slate-50/50"
              />
              {errors.Email && (
                <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                  {errors.Email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 characters" },
                })}
                placeholder="••••••••"
                className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 focus:outline-none transition-all duration-200 bg-slate-50/50"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={!isValid || loading}
              className={`w-full py-4 rounded-2xl text-white font-bold transition-all duration-300 shadow-lg 
                ${!isValid || loading
                  ? "bg-slate-400 cursor-not-allowed shadow-none"
                  : "bg-violet-600 hover:bg-violet-700 hover:shadow-violet-200 active:scale-[0.98]"}
              `}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating account...
                </span>
              ) : "Get Started"}
            </button>

            {/* Login Link */}
            <p className="text-center text-slate-500 mt-8 font-medium">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-violet-600 font-bold hover:text-violet-700 transition-colors underline-offset-4 hover:underline"
              >
                Sign in
              </button>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};