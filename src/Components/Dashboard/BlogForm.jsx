import React, { use } from 'react'
import { blogCategories} from '../../lib/database';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

export const BlogForm = ({submitPost,loading,isEdit=false,defaultValue=null}) => {
  const{register,handleSubmit,setValue,watch,reset,formState:{errors}}=useForm(
     {
    defaultValues:defaultValue
  }
  )
 
  const[thumbnailPreview,setThumbnailPreview]=useState("")
  const[tags,setTags]=useState([])
  


  // editor function
  const handleEditor=(content)=>{
    setValue("blogcontent",content)
  }

  



 



const createPost=(data)=>{
    console.log(data)
  }



  // thumbnail preview
  const thumbnail=watch("thumbnail")
  useEffect(()=>{
  // console.log(thumbnail)
  const selectedFile=thumbnail?.[0]

  if(selectedFile instanceof File){
    const filereader=new FileReader()
    filereader.onloadend=()=>{
      // console.log(filereader.result)
      setThumbnailPreview(filereader.result)
    }
    filereader.readAsDataURL(thumbnail[0])

  }
  else if(defaultValue?.thumbnail && typeof defaultValue?.thumbnail=="string"){
    setThumbnailPreview(defaultValue.thumbnail)
  }




  },[thumbnail])

  useEffect(()=>{

    reset(defaultValue)
    if(defaultValue?.tags){
      setTags(defaultValue.tags)
    }
  },[defaultValue])
  return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-sky-100 to-emerald-100 flex justify-center py-10 px-4">

    {/* Glass Card */}
    <div className="w-full max-w-4xl backdrop-blur-lg bg-white/70 border border-white/40 rounded-2xl shadow-xl overflow-hidden">

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-emerald-500 p-6">
        <h2 className="text-3xl font-bold text-white text-center">
          {isEdit ? "✏️ Edit Blog Post" : "📝 Create New Blog Post"}
        </h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(submitPost)} className="p-8 space-y-8">

        {/* Thumbnail */}
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <label className="block font-semibold mb-3 text-gray-700">Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            {...register("thumbnail")}
            className="block w-full border rounded-lg p-2"
          />

          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              className="mt-4 w-36 h-36 object-cover rounded-lg border shadow"
            />
          )}
        </div>

        {/* Title */}
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <label className="block font-semibold mb-2 text-gray-700">Title</label>
          <input
            type="text"
            placeholder="Enter blog title"
            {...register("title", { required: true })}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Category & Status */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <label className="block font-semibold mb-2 text-gray-700">Category</label>
            <select
              {...register("category")}
              className="w-full border rounded-lg p-3"
            >
              {blogCategories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <label className="block font-semibold mb-2 text-gray-700">Status</label>
            <select
              {...register("status")}
              className="w-full border rounded-lg p-3"
            >
              <option value="draft">Draft</option>
              <option value="publish">Publish</option>
            </select>
          </div>
        </div>

        {/* Editor */}
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <label className="block font-semibold mb-3 text-gray-700">
            Blog Content
          </label>
          <SunEditor
            setContents={defaultValue?.blogcontent}
            {...register("blogcontent")}
            onChange={handleEditor}
            setOptions={{
              minHeight: "300px",
              buttonList: [
                ["undo", "redo"],
                ["bold", "underline", "italic"],
                ["fontColor", "hiliteColor"],
                ["align", "list"],
                ["link", "image"],
                ["fullScreen", "codeView"],
              ],
            }}
          />
        </div>

        {/* Submit Bar */}
        <div className="sticky bottom-0 bg-white/80 backdrop-blur border-t p-4 flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="px-10 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-emerald-500 text-white font-semibold shadow-lg hover:scale-105 transition disabled:opacity-50"
          >
            {isEdit
              ? loading ? "Updating..." : "Update Post"
              : loading ? "Creating..." : "Create Post"}
          </button>
        </div>

      </form>
    </div>
  </div>
);

}