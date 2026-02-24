import React from "react";
import { Link } from "react-router-dom";

const Homeblogcard = ({ post }) => {
  return (
    <div className="group relative w-full max-w-sm overflow-hidden rounded-3xl bg-white/80 backdrop-blur-lg border border-gray-200 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
      
      {/* Image Section */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={post?.thumbnail || "https://via.placeholder.com/400x250"}
          alt={post?.title || "Blog"}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Category Badge (Optional) */}
        <span className="absolute top-4 left-4 rounded-full bg-indigo-600 px-3 py-1 text-xs font-medium text-white shadow-md">
          Blog
        </span>

        {/* Title on Image */}
        <h3 className="absolute bottom-4 left-4 right-4 text-xl font-bold text-white leading-snug line-clamp-2">
          {post?.title || "Blog Title"}
        </h3>
      </div>

      {/* Content Section */}
      <div className="p-5">
        
        {/* Author + Read Time */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
              {post?.author?.charAt(0) || "A"}
            </div>
            <span className="text-sm font-medium text-gray-700">
              {post?.author || "Admin"}
            </span>
          </div>

          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
            ⏱ 5 min read
          </span>
        </div>

        {/* Blog Preview */}
        <div
          className="mb-4 text-sm text-gray-600 line-clamp-3 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: post?.blogcontent || "No content available...",
          }}
        />

        {/* Divider */}
        <div className="h-px w-full bg-gray-200 mb-4" />

        {/* Read More Button */}
        <Link
          to={`/blogdetail/${post.userid}/${post.$id}`}
          className="flex items-center justify-between text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-all duration-300"
        >
          <span className="flex items-center gap-2">
            Read Full Article
          </span>

          <span className="text-lg transition-transform duration-300 group-hover:translate-x-2">
            →
          </span>
        </Link>
      </div>

      {/* Hover Glow Effect */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-indigo-500/10 to-pink-500/10" />
    </div>
  );
};

export default Homeblogcard;