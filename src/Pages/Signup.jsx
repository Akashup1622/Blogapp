import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { account, databases, tablesDB } from "../lib/appwrite";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ID, TablesDB } from "appwrite";

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
      console.log("Form Data:", data);

      // 👉 simulate API
      await new Promise((res) => setTimeout(res, 1500));

      alert("Signup Successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Signup Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-5"
      >
        {/* Title */}
        <h2 className="text-2xl font-bold text-center">Create Account</h2>

        {/* First Name */}
        <div>
          <input
            {...register("FirstName", {
              required: "First name is required",
              minLength: { value: 2, message: "Min 2 characters" },
            })}
            placeholder="First Name"
            className="w-full px-4 py-3 border rounded-xl"
          />
          {errors.FirstName && (
            <p className="text-red-500 text-sm">
              {errors.FirstName.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <input
            {...register("LastName", {
              required: "Last name is required",
              minLength: { value: 2, message: "Min 2 characters" },
            })}
            placeholder="Last Name"
            className="w-full px-4 py-3 border rounded-xl"
          />
          {errors.LastName && (
            <p className="text-red-500 text-sm">
              {errors.LastName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            {...register("Email", {
              required: "Email is required",
            })}
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-xl"
          />
          {errors.Email && (
            <p className="text-red-500 text-sm">{errors.Email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Min 6 characters" },
            })}
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-xl"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={!isValid || loading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white p-3 rounded-xl transition"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        {/* Login */}
        <p className="text-center text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </section>
  );
};