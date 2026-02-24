import React,{useState} from 'react'
import { useEffect} from 'react'
import { useParams} from 'react-router'
import { getPostById , getUserData } from '../lib/database'

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
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-lg font-semibold text-gray-600 animate-pulse">
          Loading blog...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      
      {/* ================= HERO SECTION (CLEAR BACKGROUND + TITLE) ================= */}
      <div className="relative w-full h-[380px] md:h-[450px] overflow-hidden">
        
        {/* Background Image */}
        <img
          src={
            post?.coverimage ||
            "https://images.unsplash.com/photo-1499750310107-5fef28a66643"
          }
          alt="cover"
          className="w-full h-full object-cover scale-105 transition-transform duration-700"
        />

        {/* Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          
          {/* Glass Title Box */}
          <div className="bg-black/40 backdrop-blur-md px-6 py-5 rounded-2xl max-w-4xl shadow-xl">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
              {post?.title || "Untitled Blog"}
            </h1>
          </div>

          {/* Author + Date Badge */}
          <div className="mt-5 flex items-center gap-3 bg-white/20 backdrop-blur-md px-5 py-2 rounded-full text-white text-sm shadow-md">
            <span>
              ✍️ {user?.FirstName || "Author"} {user?.LastName || ""}
            </span>
            <span className="opacity-80">•</span>
            <span>
              {post?.$createdAt
                ? new Date(post.$createdAt).toDateString()
                : "Recent"}
            </span>
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="max-w-5xl mx-auto px-4 -mt-20 relative z-10">
        
        {/* Glass Card Container */}
        <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-6 md:p-10 border border-gray-200">
          
          {/* Author Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8 pb-6 border-b border-gray-200">
            
            {/* Author Info */}
            <div className="flex items-center gap-4">
              <img
                className="w-16 h-16 rounded-full border-2 border-indigo-500 object-cover shadow-md"
                src={
                  user?.ProfilePic ||
                  `https://api.dicebear.com/9.x/initials/svg?seed=${user?.FirstName} ${user?.LastName}`
                }
                alt="author"
              />

              <div>
                <p className="text-lg font-semibold text-gray-800">
                  {user?.FirstName || "Admin"} {user?.LastName || ""}
                </p>
                <p className="text-sm text-gray-500">
                  Published on{" "}
                  {post?.$createdAt
                    ? new Date(post.$createdAt).toDateString()
                    : "Recently"}
                </p>
              </div>
            </div>

            {/* Reading Time Badge */}
            <div className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium w-fit">
              ⏱ 5 min read
            </div>
          </div>

          {/* Blog Content (Readable + Modern Typography) */}
          <div
            className="
              prose 
              prose-lg 
              max-w-none 
              prose-headings:text-gray-900 
              prose-p:text-gray-700 
              prose-img:rounded-xl 
              prose-a:text-indigo-600 
              hover:prose-a:text-indigo-800
              leading-relaxed
            "
            dangerouslySetInnerHTML={{
              __html: post?.blogcontent || "<p>No content available.</p>",
            }}
          ></div>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-20" />
    </div>
  );
};

export default Blogdetails;