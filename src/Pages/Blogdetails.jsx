import React from 'react'
import { useEffect} from 'react'
import { useParams} from 'react-router'
import { getPostById , getUserData } from '../lib/database'

const Blogdetails = () => {
    const{postid,userId}=useParams()
    console.log(postid,userId)
    const[post,setpost]=React.useState({})
    const [user , setUser] = React.useState({});

  const getdata = async () => {
  const res = await getPostById(postid);
  
  if (res) {
    setpost(res);

    // Fetch user data using UserId stored in post
    const userdata = await getUserData(userId);

      if (userdata) {
      setUser(userdata);   
      }

  }
}

        useEffect(()=>{
          getdata()
        },[postid]) 
 return (
  <div className="min-h-screen bg-slate-100 py-10 px-4">
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">

      {/* Blog Header Image (optional) */}
      {post?.coverimage && (
        <img
          src={post.coverimage}
          className="w-full h-64 object-cover"
          alt="cover"
        />
      )}

      <div className="p-8"> 

        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          {post?.title}
        </h2>

        {/* Author Section */} 
        <div className="flex items-center gap-4 mb-6">
          <img
            className="w-14 h-14 rounded-full border-2 border-indigo-500 object-cover"
            src={
              user?.ProfilePic ||
              `https://api.dicebear.com/9.x/initials/svg?seed=${user?.FirstName} ${user?.LastName}`
            }
            alt="author"
          />
          <div>
            <p className="font-semibold text-gray-800">
              {user?.FirstName} {user?.LastName}
            </p>
            <p className="text-sm text-gray-500">
              {new Date(post?.$createdAt).toDateString()}
            </p>
          </div>
        </div>

        {/* Blog Content */}
        <div
          className="prose max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post?.blogcontent }}
        ></div>

      </div>
    </div>
  </div> 
);

}

export default Blogdetails
