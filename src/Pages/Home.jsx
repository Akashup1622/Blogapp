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
    <div className="min-h-screen bg-slate-50">
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-200/40 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-indigo-200/40 rounded-full blur-[120px] animate-pulse animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center space-y-10">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-full shadow-sm animate-bounce duration-1000">
             <Sparkles className="text-violet-600" size={16} />
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">The Modern Way to Blog</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black text-slate-900 leading-[1.1] tracking-tight max-w-5xl mx-auto">
            Where Ideas Find Their <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">Voice.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Join thousands of creators sharing their insights on technology, 
            design, and creativity. Start your journey with Blogify today.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
            <Link
              to="/createpost"
              className="px-10 py-4 bg-violet-600 text-white rounded-2xl font-bold shadow-xl shadow-violet-200 hover:bg-violet-700 hover:shadow-violet-300 transition-all duration-300 flex items-center justify-center gap-2 group active:scale-95"
            >
              <PenSquare size={20} className="group-hover:rotate-12 transition-transform" />
              Start Writing
            </Link>
            
            <button className="px-10 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-sm">
              Explore Content
            </button>
          </div>
        </div>
      </section>

      {/* ================= FEATURED POSTS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-100">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">
              Featured Articles
            </h2>
            <p className="text-slate-500 font-medium">
              Hand-picked stories and latest updates from our community
            </p>
          </div>
          
          <Link to="/Blogcategories/Technology" className="text-violet-600 font-bold hover:text-violet-700 flex items-center gap-1 group">
            View all articles <Sparkles size={16} className="group-hover:scale-125 transition-transform" />
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/30">
            <div className="w-20 h-20 bg-slate-50 flex items-center justify-center rounded-3xl mx-auto mb-6 text-4xl">✨</div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              The Stage is Set
            </h3>
            <p className="text-slate-500 font-medium mt-2">
              Be the first to publish a story on our platform.
            </p>
            <Link
              to="/createpost"
              className="inline-block mt-8 px-8 py-3 bg-violet-600 text-white rounded-2xl font-bold hover:bg-violet-700 shadow-lg shadow-violet-100 transition-all"
            >
              Write First Article
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post) => (
              <Homeblogcard key={post.$id} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="bg-slate-900 py-32 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-violet-600/10 blur-[150px] -z-0"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
              Explore by <span className="text-violet-400">Topics</span>
            </h2>
            <p className="text-slate-400 font-medium text-lg">Dive deep into what interests you the most</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {blogCategories.slice(0, 10).map((cat, index) => (
              <Link
                key={index}
                to={`/Blogcategories/${cat}`}
                className="group p-6 bg-slate-800/50 border border-slate-700 rounded-3xl text-center hover:bg-violet-600 hover:border-violet-500 transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm"
              >
                <div className="text-slate-200 font-bold group-hover:text-white transition-colors">
                  {cat}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-6xl font-black text-slate-900 tracking-tighter">
                {posts.length}+
              </h3>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">
                Stories Published
              </p>
            </div>

            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-6xl font-black text-violet-600 tracking-tighter">100%</h3>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">
                Creative Freedom
              </p>
            </div>

            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-6xl font-black text-indigo-600 tracking-tighter">24/7</h3>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">
                Active Community
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER CTA ================= */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-violet-600 to-indigo-600 rounded-[3rem] p-12 md:p-20 text-center text-white shadow-2xl shadow-violet-200 relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h3 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
              Ready to Share Your Masterpiece?
            </h3>
            <p className="text-lg md:text-xl text-violet-100 font-medium">
              Join our growing community of writers and start your personal blog today. 
              No fees, just pure creativity.
            </p>

            <Link
              to="/createpost"
              className="inline-flex items-center gap-3 px-10 py-4 bg-white text-violet-600 font-extrabold rounded-2xl hover:bg-slate-50 transition-all shadow-xl hover:scale-105 active:scale-95"
            >
              Get Started Now <Sparkles size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;