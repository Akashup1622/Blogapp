import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getAllPosts } from '../lib/database';
import   Homeblogcard  from '../Components/Dashboard/Homeblogcard';
     

const Blogcategories = () => {
  const { category } = useParams(); // ✅ FIXED
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getAllPosts();

        console.log("URL Category:", category);
        console.log("API Response:", res);

        const allPosts = res?.rows || res?.documents || [];

        const filterdata = allPosts.filter(
          (obj) =>
            obj.category?.toLowerCase().trim() ===
            category?.toLowerCase().trim()
        );

        console.log("Filtered Posts:", filterdata);
        setPosts(filterdata);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, [category]);

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Area */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-violet-50 text-violet-600 px-4 py-2 rounded-full border border-violet-100 shadow-sm">
             <span className="text-[10px] font-black uppercase tracking-widest">Topic Collection</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
            Articles in <span className="text-violet-600">{category}</span>
          </h2>
          <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">
            Discover the best insights and stories curated within the {category} category.
          </p>
        </div>

        {/* Grid Area */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((blog) => (
              <Homeblogcard key={blog.$id} post={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/30 max-w-3xl mx-auto">
            <div className="w-20 h-20 bg-slate-50 flex items-center justify-center rounded-3xl mx-auto mb-6 text-4xl">🔍</div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              No articles found
            </h3>
            <p className="text-slate-500 font-medium mt-2">
              We couldn't find any stories in the {category} category yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogcategories
