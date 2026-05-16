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
    <div className="w-full">
      {/* Form */}
      <form onSubmit={handleSubmit(submitPost)} className="space-y-10">

        {/* Thumbnail Upload Area */}
        <div className="space-y-4">
          <label className="text-sm font-bold text-slate-700 ml-1 block">Featured Thumbnail</label>
          <div className="flex flex-col md:flex-row items-center gap-8 bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100 border-dashed hover:border-violet-200 transition-colors group">
            <div className="relative group/img overflow-hidden rounded-2xl w-full md:w-56 h-36 bg-slate-100 border border-slate-100">
               {thumbnailPreview ? (
                <img
                  src={thumbnailPreview}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                />
               ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                   <span className="text-4xl">🖼️</span>
                   <span className="text-[10px] font-black uppercase tracking-widest mt-2">No Image</span>
                </div>
               )}
            </div>
            <div className="flex-1 space-y-4 text-center md:text-left">
              <p className="text-xs font-medium text-slate-500 max-w-[200px]">Recommended: 1200x630px. High quality JPG or PNG.</p>
              <label className="inline-block px-6 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-bold cursor-pointer hover:bg-slate-50 transition-all shadow-sm">
                Choose Image
                <input
                  type="file"
                  accept="image/*"
                  {...register("thumbnail")}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Article Title</label>
            <input
              type="text"
              placeholder="Give your story a compelling title..."
              {...register("title", { required: true })}
              className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 focus:outline-none transition-all duration-200 bg-slate-50/50 text-xl font-bold placeholder:font-medium"
            />
            {errors.title && <p className="text-rose-500 text-xs font-bold ml-1 tracking-tight">A title is required</p>}
          </div>

          {/* Category & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Category</label>
              <select
                {...register("category")}
                className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 focus:outline-none transition-all duration-200 bg-slate-50/50 font-bold text-slate-700 appearance-none"
              >
                {blogCategories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Publication Status</label>
              <select
                {...register("status")}
                className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 focus:outline-none transition-all duration-200 bg-slate-50/50 font-bold text-slate-700 appearance-none"
              >
                <option value="draft">Save as Draft</option>
                <option value="publish">Publish Live</option>
              </select>
            </div>
          </div>

          {/* Editor */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1 mb-2 block">Story Content</label>
            <div className="rounded-3xl border border-slate-200 overflow-hidden">
              <SunEditor
                setContents={defaultValue?.blogcontent}
                {...register("blogcontent")}
                onChange={handleEditor}
                setOptions={{
                  minHeight: "400px",
                  buttonList: [
                    ["undo", "redo"],
                    ["formatBlock", "font", "fontSize"],
                    ["bold", "underline", "italic", "strike", "subscript", "superscript"],
                    ["fontColor", "hiliteColor", "textStyle"],
                    ["removeFormat"],
                    ["align", "horizontalRule", "list", "lineHeight"],
                    ["link", "image", "video"],
                    ["fullScreen", "showBlocks", "codeView"],
                  ],
                }}
              />
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex justify-center pt-8 border-t border-slate-50">
          <button
            type="submit"
            disabled={loading}
            className={`px-12 py-4 rounded-2xl text-white font-bold transition-all duration-300 shadow-xl shadow-violet-200/50 
              ${loading
                ? "bg-violet-400 cursor-not-allowed"
                : "bg-violet-600 hover:bg-violet-700 active:scale-95"}
            `}
          >
            {isEdit
              ? loading ? "Saving Changes..." : "Update Publication"
              : loading ? "Creating..." : "Launch Publication"}
          </button>
        </div>

      </form>
    </div>
  );
}

