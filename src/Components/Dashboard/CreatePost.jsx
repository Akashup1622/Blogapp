import React from 'react'
import { BlogForm } from './BlogForm'
import {storage} from  "../../lib/appwrite"
import { ID } from 'appwrite'
import { createPost } from '../../lib/database'
import {useSelector} from "react-redux"
import toast from 'react-hot-toast'
import {useNavigate} from "react-router-dom"
import { PenSquare } from 'lucide-react'

export const CreatePost = () => {
  const navigate=useNavigate()
const {user}=useSelector((state)=>state.auth)
 const id=user.userId
    const SubmitPost= async(data)=>{
      console.log(data)
      const result = await createPost(data,id)
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
  <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-16 relative overflow-hidden">
    {/* Decorative blobs */}
    <div className="absolute top-0 -left-4 w-96 h-96 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
    <div className="absolute -bottom-8 right-20 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

    {/* Card */}
    <div className="w-full max-w-4xl z-10">
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        
        {/* Header Area */}
        <div className="text-center pt-12 pb-6 px-8">
          <div className="bg-violet-600 text-white w-14 h-14 flex items-center justify-center rounded-2xl shadow-lg shadow-violet-200 rotate-3 mx-auto mb-6">
            <PenSquare size={28} />
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">
            Create New Article
          </h2>
          <p className="text-slate-500 mt-2 font-medium">
            Draft your next masterpiece and share it with the community
          </p>
        </div>

        {/* Form Area */}
        <div className="p-8 md:p-12 pt-0">
          <BlogForm submitPost={SubmitPost} />
        </div>

      </div>
    </div>
  </div>
);

}