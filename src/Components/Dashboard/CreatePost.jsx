import React from 'react'
import { BlogForm } from './BlogForm'
import {storage} from  "../../lib/appwrite"
import { ID } from 'appwrite'
import { createPost } from '../../lib/database'
import {useSelector} from "react-redux"
import toast from 'react-hot-toast'
import {useNavigate} from "react-router-dom"

export const CreatePost = () => {
  const navigate=useNavigate()
const {user}=useSelector((state)=>state.auth)
 const id=user.userId
    const SubmitPost= async(data)=>{
      console.log(data)
      const result= createPost(data,id)
      console.log(result)
      if(result){

        toast.success("post created successfully")
        navigate(`/dashboard/${id}`)

      }
      else{
        toast.error("error occured while posting")
      }


    }
  return (
  <div className="min-h-screen bg-gradient-to-br from-sky-100 via-indigo-100 to-emerald-100 flex items-center justify-center px-4 py-10">

    {/* Card */}
    <div className="w-full max-w-4xl bg-white/80 backdrop-blur-md border border-white/40 rounded-2xl shadow-2xl overflow-hidden">

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-emerald-500 p-6">
        <h2 className="text-3xl font-bold text-white text-center">
          📝 Create New Blog Post
        </h2>
        <p className="text-indigo-100 text-center mt-1">
          Share your thoughts with the world
        </p>
      </div>

      {/* Form Area */}
      <div className="p-8">
        <BlogForm submitPost={SubmitPost} />
      </div>

    </div>
  </div>
);

}