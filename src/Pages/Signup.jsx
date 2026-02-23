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

    // 1️⃣ Create user
    const user = await account.create({
     userId:ID.unique(),
     email: data.Email,
     password:data.password
  });

    

    // 3️⃣ Now create row (session exists)
    await tablesDB.createRow({
      databaseId: import.meta.env.VITE_DATABASE_ID,
      tableId: import.meta.env.VITE_COLLECTION_USER_ID,
       rowId: ID.unique(),
     data: 
        {
          UserId: user.$id,
          FirstName: data.FirstName,
          LastName: data.LastName,
          Email: data.Email,
        },
      
    });

    toast.success("Signup successful. Please login.");
    navigate("/login");
  } catch (error) {
    console.error(error);
    toast.error(error.message || "Signup failed");
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
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-500 text-sm mt-1">
            Join us and start your journey 🚀
          </p>
        </div>

        {/* First Name */}
        <div>
          <input
            {...register("FirstName", {
              required: "First name is required",
              pattern: {
                value: /^[A-Za-z]{2,}$/,
                message: "Only letters, min 2 characters",
              },
            })}
            placeholder="First Name"
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition
              ${
                errors.FirstName
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-indigo-400"
              }`}
          />
          {errors.FirstName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.FirstName.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <input
            {...register("LastName", {
              required: "Last name is required",
              pattern: {
                value: /^[A-Za-z]{2,}$/,
                message: "Only letters, min 2 characters",
              },
            })}
            placeholder="Last Name"
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition
              ${
                errors.LastName
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-indigo-400"
              }`}
          />
          {errors.LastName && (
            <p className="text-red-500 text-xs mt-1">
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
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            placeholder="Email Address"
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition
              ${
                errors.Email
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-indigo-400"
              }`}
          />
          {errors.Email && (
            <p className="text-red-500 text-xs mt-1">{errors.Email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
                message:
                  "Min 8 chars, uppercase, lowercase, number & special char",
              },
            })}
            placeholder="Password"
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition
              ${
                errors.password
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-indigo-400"
              }`}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Button */}
        <button
          disabled={!isValid || loading}
          className="w-full bg-green-600 disabled:bg-gray-400 text-white p-2 rounded"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>
        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-600 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </section>
  );
};
