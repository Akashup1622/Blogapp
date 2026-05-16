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

  const refreshPosts = async () => {
    if (userid) {
      try {
        const postRes = await getUserAllPost(userid);
        setPosts(postRes || []);
      } catch (error) {
        console.log("Dashboard Error:", error);
      }
    }
  };

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
      <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 gap-4">
        <div className="w-12 h-12 border-4 border-violet-600/30 border-t-violet-600 rounded-full animate-spin"></div>
        <p className="text-slate-500 font-bold tracking-tight">Loading your workspace...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* ===== Header Section ===== */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-10 border border-slate-100">
          
          {/* User Info */}
          <div className="flex flex-col md:flex-row items-center gap-8 w-full text-center md:text-left">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <img
                src={
                  userData.ProfilePic ||
                  `https://api.dicebear.com/9.x/initials/svg?seed=${userData.FirstName}`
                }
                alt="profile"
                className="relative h-28 w-28 rounded-full border-4 border-white object-cover shadow-2xl"
              />
            </div>

            <div className="flex-1 space-y-2">
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                {userData.FirstName} {userData.LastName}
              </h2>

              <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-slate-500 font-medium">
                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                  <Mail size={16} className="text-violet-500" />
                  <span className="text-sm">{userData.Email}</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                  <User size={16} className="text-violet-500" />
                  <span className="text-sm">Author</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
                <Link
                  to={`/editprofile/${userid}`}
                  className="px-6 py-2.5 text-sm font-bold bg-white text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-200 shadow-sm"
                >
                  Edit Profile
                </Link>

                <Link
                  to="/createpost"
                  className="px-6 py-2.5 text-sm font-bold bg-violet-600 text-white rounded-xl hover:bg-violet-700 shadow-lg shadow-violet-200 transition-all duration-300 flex items-center gap-2 active:scale-95"
                >
                  <PenSquare size={16} />
                  New Post
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Summary Grid */}
          <div className="grid grid-cols-3 gap-4 w-full lg:w-auto">
            <MiniStat icon={<FileText size={20} />} label="Articles" value={posts.length} />
            <MiniStat icon={<User size={20} />} label="Status" value="Active" />
            <MiniStat icon={<PenSquare size={20} />} label="Drafts" value="0" />
          </div>
        </div>

        {/* ===== Stats Cards ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <StatCard
            title="Total Content"
            label="All articles created"
            value={posts.length}
            icon={<FileText className="text-violet-600" size={24} />}
          />
          <StatCard
            title="Live Posts"
            label="Visible to public"
            value={posts.length}
            icon={<div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>}
          />
          <StatCard
            title="Total Drafts"
            label="In-progress work"
            value={0}
            icon={<PenSquare className="text-slate-400" size={24} />}
          />
        </div>

        {/* ===== Posts Section ===== */}
        <div className="space-y-8">
          <div className="flex items-end justify-between px-2">
            <div>
              <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Your Content
              </h3>
              <p className="text-slate-500 font-medium mt-1">Manage and edit your blog publications</p>
            </div>

            <Link
              to="/createpost"
              className="text-violet-600 font-bold hover:text-violet-700 transition-colors flex items-center gap-1 group"
            >
              <span>Create New</span>
              <PenSquare size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* All Posts Container */}
          <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/40 p-2 md:p-4 border border-slate-100 overflow-hidden">
            <Allpost userid={userid} posts={posts} refreshPosts={refreshPosts} />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ===== Large Stat Card ===== */
const StatCard = ({ title, label, value, icon }) => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/40 border border-slate-100 hover:border-violet-100 transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-violet-50 transition-colors">
          {icon}
        </div>
      </div>
      <div>
        <h4 className="text-4xl font-black text-slate-900 mb-1 tracking-tight">
          {value}
        </h4>
        <p className="font-bold text-slate-700 text-sm tracking-wide uppercase">{title}</p>
        <p className="text-slate-400 text-xs font-medium mt-1">{label}</p>
      </div>
    </div>
  );
};

/* ===== Mini Stat Card ===== */
const MiniStat = ({ icon, label, value }) => {
  return (
    <div className="bg-slate-50/80 border border-slate-100 rounded-3xl p-5 flex flex-col items-center justify-center min-w-[100px] hover:bg-white hover:shadow-lg transition-all duration-300">
      <div className="text-violet-600 mb-2">{icon}</div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <h4 className="font-extrabold text-lg text-slate-900 tracking-tight">{value}</h4>
    </div>
  );
};
