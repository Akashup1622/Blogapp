import React, { useEffect, useState } from 'react'
import {BlogForm} from './BlogForm';
import { useParams } from 'react-router-dom';
import { getPostById, updatePostById } from '../../lib/database';
import { toast } from 'react-hot-toast';


export const EditPost = () => {

  const{postid}=useParams()
  const [post,setPost]=useState()
  const[loading,setLoading]=useState(false)

  const getpost=async()=>{
    const res=await getPostById(postid)
    setPost(res)
    console.log(res)
  }
  console.log("get post id=",postid)

  useEffect(()=>{
    getpost()
  },[postid])

  const submitPost= async(data)=>{
    setLoading(true)
    const res=await updatePostById(postid,data)
    setLoading(false)
    if(res){
      console.log(res)
      toast.success("Post updated successfully")
    }
    else{
      toast.error("Error while updating post")
    }
    
  }
console.log("post data=",post)

  return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
    <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6 md:p-10">
      
      {/* Header */}
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
        ✏️ Edit Blog Post
      </h2>

      {/* Divider */}
      <div className="w-20 h-1 bg-blue-500 mx-auto mb-8 rounded"></div>

      {/* Form Container */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
        <BlogForm
          isEdit={true}
          defaultValue={post}
          submitPost={submitPost}
          loading={loading}
        />
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white/60 flex items-center justify-center rounded-xl">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      )}
    </div>
  </div>
);

}