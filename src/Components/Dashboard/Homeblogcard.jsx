import React from "react";
import { Link } from "react-router-dom";

const Homeblogcard = ({ post }) => {
  return (
    <div className="group relative w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={post?.thumbnail || "https://via.placeholder.com/400x250"}
          alt={post?.title || "Blog"}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Title on image */}
        <h3 className="absolute bottom-4 left-4 right-4 text-lg font-semibold text-white line-clamp-2">
          {post?.title}
        </h3>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Meta */}
        <div className="mb-3 flex items-center justify-between text-xs text-gray-500">
          <span>👤 {post?.author || "Admin"}</span>
          <span>⏱ 5 min read</span>
        </div>

        {/* Blog preview */}
        <p
          className="mb-4 text-sm text-gray-700 line-clamp-3"
          dangerouslySetInnerHTML={{
            __html: post?.blogcontent || "",
          }}
        />

        {/* Read more */}
        <Link
          to={`/blogdetail/${post.userid}/${post.$id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
        >
          Read more
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Homeblogcard;
