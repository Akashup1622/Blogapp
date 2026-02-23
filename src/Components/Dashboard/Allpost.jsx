import React, { useEffect, useState } from "react";
import { getUserData, deletePostById, getUserAllPost } from "../../lib/database";
import { BlogCard } from "./BlogCard";
import toast from "react-hot-toast";

export const Allpost = ({ userid }) => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const getpost = async () => {
    setLoading(true);
    const postdata = await getUserAllPost(userid);
    setPosts(postdata || []);
    setLoading(false); 
  };

  const deletepostById = async (id) => {
    const check = confirm("Are you sure you want to delete this post?");
    if (check) {
      const res = await deletePostById(id);
      if (res) {
        toast.success("Post deleted successfully");
        getpost();
      } else {
        toast.error("Error occurred while deleting post");
      }
    }
  };

  useEffect(() => {
    if (userid) getpost();
  }, [userid]);

  return (
    <>
      {loading ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin mb-3"></div>
          <p className="text-gray-600">Fetching Posts...</p>
        </div>
      ) : (
        <div className="mt-8">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-2xl font-semibold">Create Your First Post ✨</p>
              <p className="text-gray-500">Start sharing your thoughts.</p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
    </>
  );
};
