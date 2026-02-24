import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserData, getUserAllPost } from "../../lib/database";
import { FileText, PenSquare, User, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Allpost } from "./Allpost";

  export const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);

  const userid = user?.userId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await getUserData(userid);
        const postRes = await getUserAllPost(userid);
        setUserData(userRes);
        setPosts(postRes || []);
      } catch (error) {
        console.log("Dashboard Error:", error);
      }
    };

    if (userid) fetchData();
  }, [userid]);

  if (!userData) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 text-lg font-medium">
        Loading your dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      
      {/* ===== Header Section ===== */}
      <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 border">
        
        {/* User Info */}
        <div className="flex items-center gap-6 w-full">
          <img
            src={
              userData.ProfilePic ||
              `https://api.dicebear.com/9.x/initials/svg?seed=${userData.FirstName}`
            }
            alt="profile"
            className="h-24 w-24 rounded-full border-4 border-indigo-500 shadow-md"
          />

          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-800">
              {userData.FirstName} {userData.LastName}
            </h2>

            <div className="flex items-center gap-2 text-gray-500 mt-1">
              <Mail size={16} />
              <span>{userData.Email}</span>
            </div>

            <div className="flex gap-3 mt-4">
              <Link
                to={`/editprofile/${userid}`}
                className="px-4 py-2 text-sm bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition"
              >
                Edit Profile
              </Link>

              <Link
                to="/createpost"
                className="px-5 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow transition flex items-center gap-2"
              >
                <PenSquare size={16} />
                Create Post
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Summary */}
        <div className="grid grid-cols-3 gap-4 w-full lg:w-auto">
          <MiniStat icon={<FileText />} label="Posts" value={posts.length} />
          <MiniStat icon={<User />} label="Account" value="Active" />
          <MiniStat icon={<PenSquare />} label="Drafts" value="0" />
        </div>
      </div>

      {/* ===== Stats Cards ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        <StatCard
          title="Total Posts"
          value={posts.length}
          bg="bg-indigo-50"
          text="text-indigo-600"
        />
        <StatCard
          title="Published Posts"
          value={posts.length}
          bg="bg-green-50"
          text="text-green-600"
        />
        <StatCard
          title="Draft Posts"
          value={0}
          bg="bg-yellow-50"
          text="text-yellow-600"
        />
      </div>

      {/* ===== Posts Section ===== */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800">
            Your Blog Posts
          </h3>

          <Link
            to="/createpost"
            className="text-indigo-600 font-medium hover:underline"
          >
            + New Post
          </Link>
        </div>

        {/* All Posts Grid */}
        <div className="bg-white rounded-2xl shadow p-4 md:p-6 border">
          <Allpost userid={userid} />
        </div>
      </div>
    </div>
  );
};

/* ===== Large Stat Card ===== */
const StatCard = ({ title, value, bg, text }) => {
  return (
    <div className={`rounded-2xl p-6 shadow-md ${bg} border hover:shadow-lg transition`}>
      <p className="text-gray-500 text-sm">{title}</p>
      <h4 className={`text-4xl font-bold mt-2 ${text}`}>
        {value}
      </h4>
    </div>
  );
};

/* ===== Mini Stat (Top Right) ===== */
const MiniStat = ({ icon, label, value }) => {
  return (
    <div className="bg-gray-50 border rounded-xl p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition">
      <div className="text-indigo-600 mb-1">{icon}</div>
      <p className="text-xs text-gray-500">{label}</p>
      <h4 className="font-bold text-lg text-gray-800">{value}</h4>
    </div>
  );
};
