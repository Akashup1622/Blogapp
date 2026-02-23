import React, { useEffect, useState } from "react";
import { getUserData, updateUserData } from "../lib/database";
import { useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState({});
  const [profilepreview, setProfilepreview] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: userData || {},
  });

  // get user data from appwrite
  const getuser = async () => {
    const d = await getUserData(userId);
    console.log(d);
    setUserData(d);
  };

  const ProfilePic = watch("ProfilePic");

  useEffect(() => {
    const selectedFile = ProfilePic?.[0];

    // 👉 When user selects a new image
    if (selectedFile instanceof File) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setProfilepreview(fileReader.result);
      };
      fileReader.readAsDataURL(selectedFile);
      return;
    }

    // 👉 When loading saved profile image from DB
    if (userData?.profilePic && typeof userData.profilePic === "string") {
      setProfilepreview(userData.profilePic);
    }
  }, [ProfilePic, userData]);

  //  update profile
  const updateProfile = async (data) => {
    setLoading(true);
    const res = await updateUserData(userData.$id, data);
    console.log(res);
    setLoading(false);
    if (res) {
      toast.success("profile updated");
    } else {
      toast.error("profile not updated");
    }
    navigate(`/dashboard/${userId}`);
  };

  useEffect(() => {
    getuser();
  }, []);

  useEffect(() => {
    reset(userData);
  }, [userData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-3xl p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
          Update Your Profile
        </h2>

        <form onSubmit={handleSubmit(updateProfile)} className="space-y-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={profilepreview || "https://via.placeholder.com/150"}
                alt="Profile"
                className="h-36 w-36 rounded-full object-cover border-4 border-indigo-500 shadow-md"
              />
            </div>

            <input
              type="file"
              className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-indigo-50 file:text-indigo-600
            hover:file:bg-indigo-100"
              {...register("ProfilePic")}
            />
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none"
                {...register("FirstName", {
                  required: "FirstName is required",
                })}
              />
              {errors.FirstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.FirstName.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Last Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none"
                {...register("LastName", {
                  required: "LastName is required",
                })}
              />
              {errors.LastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.LastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Bio */}
          <div>
            <textarea
              rows="5"
              placeholder="Write something about yourself..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none resize-none"
              {...register("Bio")}
            ></textarea>
          </div>

          {/* Button */}
          <div className="text-center">
            <button
              disabled={loading}
              className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-indigo-700 transition disabled:bg-gray-400"
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
