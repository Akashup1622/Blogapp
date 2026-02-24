import React, { useEffect, useState } from "react";
import { getAllPosts } from "../lib/database";
import Homeblogcard from "../Components/Dashboard/Homeblogcard";
import { blogCategories } from "../lib/database";
import { Link } from "react-router-dom";
import { PenSquare, BookOpen, Sparkles } from "lucide-react";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await getAllPosts();
      const limitedPosts = (res?.rows || []).slice(0, 6);
      setPosts(limitedPosts);
    } catch (error) {
      console.log("Home fetch error:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-800 to-black text-white">
        {/* Background Glow */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-500 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-500 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Share Your Ideas With The World 🌍
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Discover insightful blogs about technology, life, coding, and
            creativity. Write, explore, and grow with Blogify.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/createpost"
              className="flex items-center justify-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-semibold shadow-lg transition"
            >
              <PenSquare size={18} />
              Start Writing
            </Link>

           
          </div>
        </div>
      </section>

      {/* ================= FEATURED POSTS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center justify-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Latest Articles
            </h2>
            <p className="text-gray-500 mt-2">
              Fresh content curated just for you ✨
            </p>
          </div>

          
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow">
            <Sparkles size={40} className="mx-auto text-indigo-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">
              No Posts Yet
            </h3>
            <p className="text-gray-500 mt-2">
              Be the first to create an amazing blog!
            </p>
            <Link
              to="/createpost"
              className="inline-block mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Create First Post
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Homeblogcard key={post.$id} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="bg-white py-20 border-t">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-12">
            Explore Topics
          </h2>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
            {blogCategories.map((cat, index) => (
              <Link
                key={index}
                to={`/Blogcategories/${cat}`}
                className="group relative overflow-hidden rounded-2xl border bg-gradient-to-br from-white to-gray-50 p-8 text-center shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition">
                  {cat}
                </div>

                <div className="absolute inset-0 bg-indigo-600 opacity-0 group-hover:opacity-5 transition"></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STATS / TRUST SECTION ================= */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <h3 className="text-4xl font-bold text-indigo-600">
              {posts.length}+
            </h3>
            <p className="text-gray-600 mt-2 font-medium">
              Published Articles
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md">
            <h3 className="text-4xl font-bold text-purple-600">100%</h3>
            <p className="text-gray-600 mt-2 font-medium">
              Free Blogging Platform
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md">
            <h3 className="text-4xl font-bold text-pink-600">24/7</h3>
            <p className="text-gray-600 mt-2 font-medium">
              Community Access
            </p>
          </div>
        </div>
      </section>

      {/* ================= FOOTER CTA ================= */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 text-center">
        <h3 className="text-3xl md:text-4xl font-bold">
          Where Ideas Turn Into Impact ✨
        </h3>
        <p className="mt-4 text-lg text-indigo-100">
          Start sharing your knowledge and build your audience today.
        </p>

        <Link
          to="/createpost"
          className="inline-block mt-8 px-8 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-gray-100 transition shadow-lg"
        >
          Start Writing Now 🚀
        </Link>
      </section>
    </div>
  );
};

export default Home;