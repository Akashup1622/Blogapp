import React, { use } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getAllPosts } from '../lib/database';
import   Homeblogcard  from '../Components/Dashboard/Homeblogcard';

const Blogcategories = () => {

    const {Blogcategories}=useParams()
    console.log(Blogcategories)
    const [posts,setPosts]=React.useState([])


    useEffect(() => {
        const fetchPosts=async()=>{
            const posts=await getAllPosts()
            console.log(posts)
            const filterdata=posts.rows.filter((obj)=>obj.category===Blogcategories)
            setPosts(filterdata)
        }
          fetchPosts()  
    },[])


  return (
    <>
    <h2>

        post related to {Blogcategories}
        {
            posts?.map((blog,index)=>{
                return(
                    <Homeblogcard post={blog}/>
                )
            })
        
        }
    
    </h2>
    
    </>
  )
}

export default Blogcategories
