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
    <div className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/30 hover:shadow-2xl hover:shadow-violet-200/30 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
      
      {/* Thumbnail Section */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={postobj.thumbnail || "https://via.placeholder.com/400x250"}
          alt={postobj.title}
          className="h-full w-full object-cover transform group-hover:scale-110 transition duration-700 ease-out"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Category Badge */}
        {postobj.category && (
          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-violet-600 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl shadow-sm">
            {postobj.category}
          </span>
        )}

        {/* View Badge on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <Link 
            to={`/blogdetail/${userid}/${postobj.$id}`}
            className="bg-white text-slate-900 px-6 py-2.5 rounded-2xl font-bold text-sm shadow-xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
           >
            <Eye size={18} className="text-violet-600" />
            Read Article
           </Link>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <CalendarDays size={14} className="text-slate-400" />
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            {new Date(postobj.$createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-black text-slate-900 line-clamp-2 leading-tight group-hover:text-violet-600 transition-colors mb-3">
          {postobj.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed mb-6 font-medium">
          {stripHtml(postobj.blogcontent)}
        </p>

        {/* Spacer to push buttons to bottom */}
        <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-black text-violet-600 bg-violet-50 px-2 py-1 rounded-lg uppercase tracking-tight">
              {Math.max(1, Math.ceil(stripHtml(postobj.blogcontent).length / 800))} min read
            </span>
          </div>

          <div className="flex gap-2">
            <Link
              to={`/editpost/${postobj.$id}`}
              className="p-2.5 bg-slate-50 text-slate-600 rounded-xl hover:bg-violet-600 hover:text-white transition-all duration-200"
              title="Edit Post"
            >
              <Pencil size={16} />
            </Link>

            <button
              onClick={() => deletepostById(postobj.$id)}
              className="p-2.5 bg-slate-50 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all duration-200"
              title="Delete Post"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};