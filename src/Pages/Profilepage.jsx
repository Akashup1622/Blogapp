import React, { useEffect, useState } from "react";
import { getUserData, updateUserData } from "../lib/database";
import { useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { PenSquare } from "lucide-react";

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
    if (userData?.ProfilePic && typeof userData.ProfilePic === "string") {
      setProfilepreview(userData.ProfilePic);
    }
  }, [ProfilePic, userData]);
  

  //  update profile
  const updateProfile = async (data) => {
    setLoading(true);
    const payload = { ...data, existingPic: userData.ProfilePic };
    const res = await updateUserData(userData.$id, payload);
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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute -bottom-8 right-20 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="bg-white shadow-2xl shadow-slate-200/50 rounded-[2.5rem] w-full max-w-3xl p-10 md:p-12 border border-slate-100 z-10">
        <div className="text-center mb-10">
          <div className="bg-violet-600 text-white w-12 h-12 flex items-center justify-center rounded-2xl shadow-lg shadow-violet-200 rotate-3 mx-auto mb-6">
            <span className="text-2xl font-bold">B</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Account Settings
          </h2>
          <p className="text-slate-500 mt-2 font-medium">Update your public profile and avatar</p>
        </div>

        <form onSubmit={handleSubmit(updateProfile)} className="space-y-8">
          {/* Profile Picture */}
          <div className="flex flex-col items-center gap-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <img
                src={profilepreview || "https://via.placeholder.com/150"}
                alt="Profile"
                className="relative h-40 w-40 rounded-full object-cover border-4 border-white shadow-2xl"
              />
              <label className="absolute bottom-2 right-2 p-2.5 bg-violet-600 text-white rounded-full shadow-lg cursor-pointer hover:bg-violet-700 transition-colors border-2 border-white">
                <PenSquare size={18} />
                <input
                  type="file"
                  className="hidden"
                  {...register("ProfilePic")}
                />
              </label>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tap the icon to change photo</p>
          </div>

          <div className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 focus:outline-none transition-all duration-200 bg-slate-50/50 font-medium"
                  {...register("FirstName", {
                    required: "FirstName is required",
                  })}
                />
                {errors.FirstName && (
                  <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                    {errors.FirstName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 focus:outline-none transition-all duration-200 bg-slate-50/50 font-medium"
                  {...register("LastName", {
                    required: "LastName is required",
                  })}
                />
                {errors.LastName && (
                  <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                    {errors.LastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">About You</label>
              <textarea
                rows="4"
                placeholder="Share a little bit about yourself..."
                className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 focus:outline-none transition-all duration-200 bg-slate-50/50 font-medium resize-none"
                {...register("Bio")}
              ></textarea>
            </div>
          </div>

          {/* Button */}
          <div className="pt-4">
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
                  Saving Changes...
                </span>
              ) : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
