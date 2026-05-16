import React, { useState } from "react";
import { deletePostById } from "../../lib/database";
import { BlogCard } from "./BlogCard";
import toast from "react-hot-toast";

export const Allpost = ({ userid, posts, refreshPosts }) => {
  const [loading, setLoading] = useState(false);

  const deletepostById = async (id) => {
    const check = confirm("Are you sure you want to delete this post?");
    if (check) {
      setLoading(true);
      const res = await deletePostById(id);
      if (res) {
        toast.success("Post deleted successfully");
        await refreshPosts();
      } else {
        toast.error("Error occurred while deleting post");
      }
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {loading ? (
        <div className="min-h-[400px] flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 border-4 border-violet-600/30 border-t-violet-600 rounded-full animate-spin"></div>
          <p className="text-slate-500 font-bold tracking-tight">Updating your library...</p>
        </div>
      ) : (
        <div className="w-full">
          {posts.length === 0 ? (
            <div className="text-center py-24 flex flex-col items-center justify-center space-y-6">
              <div className="w-20 h-20 bg-slate-50 flex items-center justify-center rounded-3xl text-4xl">
                ✍️
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-black text-slate-900 tracking-tight">Your story starts here</p>
                <p className="text-slate-500 font-medium">You haven't published any articles yet.</p>
              </div>
              <button className="px-8 py-3 bg-violet-600 text-white rounded-2xl font-bold shadow-lg shadow-violet-200 hover:bg-violet-700 transition-all duration-300">
                Write your first post
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 p-2">
              {posts.map((obj) => (
                <BlogCard
                  key={obj.$id}
                  postobj={obj}
                  deletepostById={deletepostById}
                  userid={userid}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
