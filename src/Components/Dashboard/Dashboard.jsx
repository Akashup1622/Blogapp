import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserData, getUserAllPost } from "../../lib/database";
import { Link } from "react-router-dom";
import { Allpost } from "./Allpost";

export const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);

  const userid = user?.userId; 

  useEffect(() => {
    const fetchData = async () => {
      const userRes = await getUserData(userid);
      const postRes = await getUserAllPost(userid);
      setUserData(userRes);
      setPosts(postRes || []);
    };

    if (userid) fetchData();
  }, [userid]);

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 p-6">

      {/* ===== Profile Card ===== */}
      <div className="bg-white rounded-3xl shadow p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img
            src={
              userData.ProfilePic ||
              `https://api.dicebear.com/9.x/initials/svg?seed=${userData.FirstName}`
            }
            alt="profile"
            className="h-20 w-20 rounded-full border-4 border-indigo-500"
          />
          <div>
            <h2 className="text-2xl font-semibold">
              {userData.FirstName} {userData.LastName}
            </h2>
            <p className="text-gray-500 text-sm">{userData.Email}</p>
          </div>
          <Link to={`/editprofile/${userid}`} className="ml-4 text-indigo-600 hover:underline">
            Edit Profile

          </Link>
        </div>

        <Link
          to="/createpost"
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl shadow hover:bg-indigo-700"
        >
          ✍ Create New Post
        </Link>
      </div>

      {/* ===== Stats ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
        <StatCard title="Total Posts" value={posts.length} color="indigo" />
        <StatCard title="Published" value={posts.length} color="green" />
        <StatCard title="Drafts" value={0} color="yellow" />
      </div>

      {/* ===== All Posts Section ===== */}
      <Allpost userid={userid} />
    </div>
  );
};

/* ===== Stat Card ===== */
const StatCard = ({ title, value, color }) => {
  const colors = {
    indigo: "text-indigo-600",
    green: "text-green-600",
    yellow: "text-yellow-500",
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <h4 className={`text-3xl font-bold mt-2 ${colors[color]}`}>
        {value}
      </h4>
    </div>
  );
};
