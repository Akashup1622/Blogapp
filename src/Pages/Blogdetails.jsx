import React,{useState} from 'react'
import { useEffect} from 'react'
import { useParams} from 'react-router'
import { getPostById , getUserData } from '../lib/database'
import { Link } from 'react-router-dom'
import { CalendarDays } from 'lucide-react'

const Blogdetails = () => {
  const { postid, userId } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getdata = async () => {
    try {
      setLoading(true);

      const res = await getPostById(postid);

      if (res) {
        setPost(res);

        // Fetch author data
        const userdata = await getUserData(userId);
        if (userdata) {
          setUser(userdata);
        }
      }
    } catch (error) {
      console.log("Error fetching blog:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postid) {
      getdata();
    }
  }, [postid]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 gap-4">
        <div className="w-12 h-12 border-4 border-violet-600/30 border-t-violet-600 rounded-full animate-spin"></div>
        <p className="text-slate-500 font-bold tracking-tight">Fetching article...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* ================= HERO SECTION ================= */}
      <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
        
        {/* Background Image */}
        <img
          src={
            post?.thumbnail ||
            "https://images.unsplash.com/photo-1499750310107-5fef28a66643"
          }
          alt="cover"
          className="w-full h-full object-cover scale-105 transition-transform duration-1000"
        />

        {/* Premium Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 pb-32">
          <div className="max-w-5xl space-y-8">
            {/* Category Badge */}
            <span className="px-6 py-2 bg-violet-600 text-white rounded-full text-xs font-black uppercase tracking-widest shadow-xl shadow-violet-600/20">
              {post?.category || "Article"}
            </span>

            <h1 className="text-4xl md:text-7xl font-black text-white leading-[1.1] tracking-tight drop-shadow-2xl">
              {post?.title || "Untitled Blog"}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-white/90 text-sm font-bold">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl px-5 py-2.5 rounded-2xl border border-white/20">
                <img 
                  src={user?.ProfilePic || `https://api.dicebear.com/9.x/initials/svg?seed=${user?.FirstName}`} 
                  className="w-6 h-6 rounded-full border border-white/50" 
                  alt="author"
                />
                <span>By {user?.FirstName} {user?.LastName}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl px-5 py-2.5 rounded-2xl border border-white/20">
                <CalendarDays size={16} className="text-violet-400" />
                <span>{new Date(post.$createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="max-w-4xl mx-auto px-6 -mt-20 relative z-10">
        
        {/* Article Container */}
        <div className="bg-white shadow-2xl shadow-slate-200/60 rounded-[3rem] p-8 md:p-16 border border-slate-100 mb-20">
          
          {/* Author Block */}
          <div className="flex items-center justify-between gap-6 mb-12 pb-12 border-b border-slate-50">
            <div className="flex items-center gap-5">
              <img
                className="w-16 h-16 rounded-2xl border-4 border-slate-50 object-cover shadow-lg"
                src={
                  user?.ProfilePic ||
                  `https://api.dicebear.com/9.x/initials/svg?seed=${user?.FirstName}`
                }
                alt="author"
              />
              <div className="space-y-1">
                <p className="text-xl font-black text-slate-900 tracking-tight">
                  {user?.FirstName} {user?.LastName}
                </p>
                <p className="text-sm text-slate-500 font-medium">Professional Contributor</p>
              </div>
            </div>

            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Reading Time</span>
              <div className="bg-violet-50 text-violet-600 px-4 py-1.5 rounded-xl text-sm font-bold border border-violet-100">
                ~{Math.ceil((post?.blogcontent || "").length / 1000)} min
              </div>
            </div>
          </div>

          {/* Content Render */}
          <article
            className="
              prose 
              prose-xl 
              max-w-none 
              prose-headings:text-slate-900 
              prose-headings:font-black
              prose-headings:tracking-tight
              prose-p:text-slate-600 
              prose-p:font-medium
              prose-p:leading-relaxed
              prose-img:rounded-[2rem] 
              prose-img:shadow-2xl
              prose-img:my-12
              prose-a:text-violet-600 
              hover:prose-a:text-violet-700
              prose-strong:text-slate-900
              prose-blockquote:border-violet-600
              prose-blockquote:bg-slate-50
              prose-blockquote:rounded-2xl
              prose-blockquote:p-6
              prose-blockquote:italic
            "
            dangerouslySetInnerHTML={{
              __html: post?.blogcontent || "<p>No content available.</p>",
            }}
          ></article>
        </div>

        {/* Footer Navigation or Author bio */}
        <div className="bg-slate-900 rounded-[2.5rem] p-10 md:p-16 text-center text-white mb-20 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 blur-3xl"></div>
           <h4 className="text-2xl font-black mb-4">Enjoyed this article?</h4>
           <p className="text-slate-400 font-medium mb-8 max-w-md mx-auto">Explore more insights from {user?.FirstName} or check out our latest publications.</p>
           <Link to="/" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-xl">
             Browse More Stories
           </Link>
        </div>
      </div>
    </div>
  );
};

export default Blogdetails;