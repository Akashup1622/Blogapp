import React  from "react";
import { Link } from "react-router-dom";
import { Eye, Pencil, Trash2, CalendarDays } from "lucide-react";

// import { deletePostById }" from "../../lib/database";  
import toast from "react-hot-toast";

export const BlogCard = ({ deletepostById, postobj, userid }) => {
  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      
      {/* Thumbnail Section */}
      <div className="relative overflow-hidden">
        <img
          src={postobj.thumbnail || "https://via.placeholder.com/400x250"}
          alt={postobj.title}
          className="h-52 w-full object-cover transform group-hover:scale-105 transition duration-500"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Category Badge (optional) */}
        {postobj.category && (
          <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full shadow">
            {postobj.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 line-clamp-2 group-hover:text-indigo-600 transition">
          {postobj.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-500 mt-3 line-clamp-3 leading-relaxed">
          {stripHtml(postobj.blogcontent)}
        </p>

        {/* Date & Read Info */}
        <div className="flex items-center justify-between mt-4 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <CalendarDays size={14} />
            <span>
              {new Date(postobj.$createdAt).toDateString()}
            </span>
          </div>

          <span className="text-indigo-500 font-medium">
            {Math.ceil(stripHtml(postobj.blogcontent).length / 500)} min read
          </span>
        </div>

        {/* Divider */}
        <div className="border-t my-4" />

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <Link
            to={`/blogdetail/${userid}/${postobj.$id}`}
            className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition"
          >
            <Eye size={16} />
            View
          </Link>

          <div className="flex gap-2">
            <Link
              to={`/editpost/${postobj.$id}`}
              className="flex items-center gap-1 px-3 py-1.5 text-xs bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              <Pencil size={14} />
              Edit
            </Link>

            <button
              onClick={() => deletepostById(postobj.$id)}
              className="flex items-center gap-1 px-3 py-1.5 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};