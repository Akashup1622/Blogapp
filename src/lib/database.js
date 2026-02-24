import { Query, ID } from "appwrite";

import { storage } from "./appwrite";
const dbid = import.meta.env.VITE_DATABASE_ID;
const userColl = import.meta.env.VITE_COLLECTION_USER_ID;
const bucketid=import.meta.env.VITE_BUCKET_ID
const postColl = import.meta.env.VITE_COLLECTION_POST;
// const commentColl=import.meta.env.VITE_COMMENT_COLLECTION_ID
// const likeColl=import.meta.env.VITE_LIKE_COLLECTION_ID
import { tablesDB } from "./appwrite";
export const blogCategories = [
  "Technology",
  "Travel",
  "Food & Recipes",
  "Lifestyle",
  "Health & Fitness",
  "Education & Learning",
  "Business & Entrepreneurship",
  "Digital Marketing",
  "Finance & Investment",
  "Personal Development",
  "Fashion & Beauty",
  "Entertainment & Movies",
  "News & Current Affairs",
  "Photography",
  "Coding & Web Development",
];

export const getUserData = async ( UserID) => {
  try {
    console.log(UserID)
    let result = await tablesDB.listRows({
      databaseId: dbid,
      tableId: userColl,
      queries: [Query.equal("UserId", UserID )],
    })

    return result.rows[0]; // ✅ mostly single user
  } catch (error) {
    console.log("Error fetching user:", error);
    throw error;
  } 
};

// create post
export const createPost = async (data, id) => {
  try {
    console.log(data);

    // image upload bucket -> get url then post url in table
    const imagefile = await storage.createFile({
      bucketId: bucketid,
      fileId: ID.unique(),
      file: data.thumbnail?.[0],
    });
    console.log(imagefile);
    const url = storage.getFileView({
      bucketId: bucketid,
      fileId: imagefile.$id,
    });
    // create record
    const rowdata = await tablesDB.createRow({
      databaseId: dbid,
      tableId: postColl,
      rowId: ID.unique(),
      data: {
        title: data.title,
        userid: id,
        blogcontent: data.blogcontent,
        category: data.category,
        status: data.status,
        thumbnail: url,
      },
    });
    console.log("postdata", rowdata);
    return rowdata;
  } catch (error) {
    console.log(error, "error in creating post");
  }
};

export const getUserAllPost = async (userid) => {
  try {
    let result = await tablesDB.listRows({
      databaseId: dbid,
      tableId: postColl,
      queries: [Query.equal("userid", userid)],
    });
    // console.log(result);
    return result.rows;
  } catch (error) {
    console.log("error occured while fetching all posts", error);
  }
};
// get post by id
export const getPostById=async(id)=>{
  try {
const result=await tablesDB.getRow({
  databaseId:dbid,
  tableId:postColl,
  rowId:id
});
return result;
  }
  catch(error){
   console.log("error in fetching post by id",error);
  }
}

// update post by id
export const updatePostById=async(id,post)=>{
   try{

      let url=""
      const selectedFile=post.thumbnail?.[0]
         if(selectedFile instanceof File){
         const res= await storage.createFile({
            bucketId:bucketid,
            fileId:ID.unique(),
            file:post.thumbnail[0]
         });
        
        url=storage.getFileView({
            bucketId:bucketid,
            fileId:res.$id
         })
        }
        else{
          url=post.thumbnail
        }
     const res= await tablesDB.updateRow({
        databaseId:dbid,
        tableId:postColl,
        rowId:id,
        data:{
             
               thumbnail: url,
               title: post.title,
               blogcontent: post.blogcontent,
               category: post.category,
               status: post.status,
               
               
        }
   })
     return res
}
   catch(error){
        console.log("error occured while updating post",error)
   }
}

// delete post by id
export const deletePostById=async(id)=>{
    try{
        const res= await tablesDB.deleteRow({
        databaseId:dbid,
        tableId:postColl,
        rowId:id
        })
        return res
    }
    catch(error){
        console.log("error occured while deleting post",error)
    }
}

// update user data
export const updateUserData=async(UserId,userdata)=>{
    try{

      let url=""
      const selectedFile=userdata.profilePic?.[0]
         if(selectedFile instanceof File){
         const res= await storage.createFile({
            bucketId:bucketid,
            fileId:UserId.unique(),
            file:userdata.profilePic[0]
         });
        
        url=storage.getFileView({
            bucketId:bucketid,
            fileId:res.$id
         })
        }
        else{
          url=userdata.profilePic
        }
     const res= await tablesDB.updateRow({
        databaseId:dbid,
        tableId:userColl,
        rowId:UserId,
        data:{
             
               FirstName: userdata.FirstName,
               LastName: userdata.LastName,
               
               bio: userdata.bio,
               profilePic: url
        }
   })
     return res
}
    catch(error){ 
      console.log("error in updating user data",error)
    }
  }


  // getallpost

export const getAllPosts=async()=>{
  try {
    let result = await tablesDB.listRows({
   databaseId: dbid,
      tableId: postColl,
    });
     console.log(result);
    return result
  } catch (error) {
    console.log("error occured while fetching all posts", error);
  }
}



// post comment

export const postComment=async(data)=>{
  // userid,postid,comment

  try{

    const res= await tablesDB.createRow({
      databaseId: dbid,
      tableId: commentColl,
      rowId: ID.unique(),
       data:{
        userid:UserId,
        postid: postId,
        comment: data.comment


      }

  })

  // update post collection
  const response= await tablesDB.updateRow({
    databaseId:dbid,
    tableId: postColl,
    rowId:postId,
      data: {
      comment:[...cmnt,res.$id]
    }
    
  })
      return response
  }

  catch(error){
    console.log("error occured while comment:", error)
  }
}


 