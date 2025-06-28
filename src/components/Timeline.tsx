import React, { useEffect, useState } from 'react'
import Post from './Post'
import apiClient from '@/lib/apiClient';
import {  PostTypes } from '@/types';
const Timeline = () => {
  const [postText ,setPostText] =useState('');
  const [latestPosts,setlatestPosts] =useState<PostTypes[]>([])
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try {
      const newPost  = await apiClient.post("posts/post",{
        content:postText
      })
      setlatestPosts(prevPost=>[newPost.data, ...prevPost])
    setPostText('')
    }catch(e) {
      console.log(e)
      alert('ログインしてください')
    }
   }
   useEffect(()=>{
    const feachLatestPosts =async()=>{
      try {
        const responce = await apiClient.get('posts/get_latest_post');
        setlatestPosts(responce.data);
      }catch(e) {
        console.log(e);
      }
    }
    feachLatestPosts()
   },[])
  return (
    <div className="min-h-screen bg-gray-100">
  <main className="container mx-auto py-4">
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full h-24 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="What's on your mind?"
          value={postText}
          onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>{setPostText(e.target.value)}}
        ></textarea>
        <button
          type="submit"
          className="mt-2 bg-gray-700 hover:bg-green-700 duration-200 text-white font-semibold py-2 px-4 rounded"
        >
          投稿
        </button>
      </form>
    </div>
  </main>
  {latestPosts.map((post:PostTypes)=>(
    <Post key={post.id} post={post}/>
  ))}

</div>
  )
}

export default Timeline