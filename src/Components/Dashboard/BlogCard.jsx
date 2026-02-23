import React  from "react";
import { Link } from "react-router-dom";

// import { deletePostById }" from "../../lib/database";  
import toast from "react-hot-toast";

export const BlogCard = ({ deletepostById , postobj,userid}) => {
  console.log("post obj in blogcard=",postobj)
  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

 

  return (
    <div className="bg-white rounded-2xl overflow-hidden border shadow-sm hover:shadow-lg transition duration-300">

      {/* Image */}
      <img
        src={postobj.thumbnail || "https://via.placeholder.com/400x250"}
        alt="Blog thumbnail"
        className="h-48 w-full object-cover"
      />

      {/* Content */}
      <div className="p-5">
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {postobj.title}
        </h2>

        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
          {stripHtml(postobj.blogcontent)}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-5">
          <span className="text-xs text-gray-400">
            {new Date(postobj.$createdAt).toDateString()}
          </span>

          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition">
              <Link to={`/blogdetail/${userid}/${postobj .$id}`}>
              View
              </Link>
            </button>

            <button className="px-3 py-1.5 text-xs bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
             <Link to={`/editpost/${postobj.$id}`}>
                Edit
             </Link>
            
            </button>

            <button className="px-3 py-1.5 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600 transition" onClick={()=>deletepostById(postobj.$id)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
