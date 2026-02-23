import React, { useEffect, useState } from "react";
import { getAllPosts } from "../lib/database";
import Homeblogcard from "../Components/Dashboard/Homeblogcard";
import { blogCategories } from "../lib/database";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const Allpost = async () => {
    const res = await getAllPosts();
    setPosts(res?.rows || [].slice(0, 5));
  };

  useEffect(() => {
    Allpost();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🔥 HERO SECTION */}
      <section className="relative bg-black text-white py-28 px-6 text-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1498050108023-c5249f4df085')] bg-cover bg-center opacity-30"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Stories, Thoughts & Experiences
          </h1>
          <p className="text-gray-300 text-lg">
            Read blogs about life, travel, food, technology, and personal
            growth.
          </p>
        </div>
      </section>

      {/* 📰 LATEST POSTS */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Latest Articles</h2>
          <p className="mt-2 text-gray-600">
            Fresh content curated just for you
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts found</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Homeblogcard key={post.$id} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* blog catogories */}
      



<div className="mx-auto max-w-7xl px-6 py-16">
  <h2 className="mb-10 text-center text-3xl font-bold text-gray-900">
    Explore Topics
  </h2>

  <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
    {blogCategories.map((cat, index) => (
      <Link
        key={index}
        to={`/Blogcategories/${cat}`}
        className="group flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500 hover:shadow-lg"
      >
        <span className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600">
          {cat}
        </span>
      </Link>
    ))}
  </div>
</div>



      {/* ✨ FOOTER SLOGAN */}
      <section className="bg-white py-12 text-center border-t">
        <h3 className="text-2xl font-semibold text-gray-800">
          Where ideas turn into impact ✨
        </h3>
        <p className="mt-2 text-gray-600">
          Start sharing your knowledge today.
        </p>
      </section>
    </div>
  );
};

export default Home;
