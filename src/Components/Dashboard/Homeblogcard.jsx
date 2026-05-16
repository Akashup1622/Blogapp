import React from "react";
import { Link } from "react-router-dom";

const Homeblogcard = ({ post }) => {
  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <div className="group relative w-full overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-200/30 flex flex-col h-full">
      
      {/* Image Section */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={post?.thumbnail || "https://via.placeholder.com/400x250"}
          alt={post?.title || "Blog"}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Premium Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

        {/* Category Badge */}
        <span className="absolute top-5 left-5 bg-white/90 backdrop-blur-md text-violet-600 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-2xl shadow-sm">
           {post?.category || "Article"}
        </span>
      </div>

      {/* Content Section */}
      <div className="p-8 flex flex-col flex-1">
        
        {/* Author + Read Time */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600 font-bold text-sm">
              {post?.author?.charAt(0) || "A"}
            </div>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              {post?.author || "Admin"}
            </span>
          </div>

          <div className="bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">
               ~{Math.max(1, Math.ceil(stripHtml(post?.blogcontent || "").length / 800))} min read
             </span>
          </div>
        </div>

        {/* Blog Title */}
        <h3 className="text-2xl font-black text-slate-900 leading-tight mb-4 group-hover:text-violet-600 transition-colors line-clamp-2">
          {post?.title || "Untitled Masterpiece"}
        </h3>

        {/* Blog Preview */}
        <p className="text-sm text-slate-500 font-medium line-clamp-3 leading-relaxed mb-8 flex-1">
          {stripHtml(post?.blogcontent || "Dive into this insightful article and explore the fascinating world of ideas...")}
        </p>

        {/* Action Link */}
        <div className="pt-6 border-t border-slate-50">
          <Link
            to={`/blogdetail/${post.userid}/${post.$id}`}
            className="flex items-center justify-between group/btn"
          >
            <span className="text-sm font-bold text-slate-900 group-hover/btn:text-violet-600 transition-colors">
              Continue Reading
            </span>

            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center group-hover/btn:bg-violet-600 group-hover/btn:text-white transition-all duration-300 shadow-sm group-hover/btn:shadow-violet-200">
               <span className="text-xl transform group-hover/btn:translate-x-1 transition-transform">
                 →
               </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homeblogcard;