import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getAllPosts } from '../lib/database';
import   Homeblogcard  from '../Components/Dashboard/Homeblogcard';
     

const Blogcategories = () => {
  const { category } = useParams(); // ✅ FIXED
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getAllPosts();

        console.log("URL Category:", category);
        console.log("API Response:", res);

        const allPosts = res?.rows || res?.documents || [];

        const filterdata = allPosts.filter(
          (obj) =>
            obj.category?.toLowerCase().trim() ===
            category?.toLowerCase().trim()
        );

        console.log("Filtered Posts:", filterdata);
        setPosts(filterdata);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, [category]);

  return (
    <>
      <h2>Posts related to {Blogcategories}</h2>

      <div className="grid grid-cols-3 gap-4">
        {posts.length > 0 ? (
          posts.map((blog) => (
            <Homeblogcard key={blog.$id} post={blog} />
          ))
        ) : (
          <p>No posts found for this category</p>
        )}
      </div>
    </>
  );
};

export default Blogcategories
