import apiClient from '@/lib/apiClient';
import { PostTypes, Profile } from '@/types';
import { GetServerSideProps } from 'next'
import React from 'react'

type Props = {
  profile: Profile
  posts:PostTypes[]
}
export const getServerSideProps :GetServerSideProps = async(context) => {
  const {userId} = context.query;
  try {
    const profileResponce = await apiClient.get(`/users/profile/${userId}`);
    const postsResponce = await apiClient.get(`/posts/${userId}`);
    return {
      props: {
        profile:profileResponce.data,
        posts:postsResponce.data
      }
    };
  } catch(e) {
    console.log(e);
    return {
      notFound:true
    }
  }
}



function UserProfile({profile,posts}: Props) {
  return (
    <div className="container mx-auto px-4 py-8">
  <div className="w-full max-w-xl mx-auto">
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <div className="flex items-center">
        <img className="w-20 h-20 rounded-full mr-4" alt="User Avatar"  src={profile.profileImageUrl} />
        <div>
          <h2 className="text-2xl font-semibold mb-1">{profile.user.username}</h2>
          <p className="text-gray-600">{profile.bio}</p>
        </div>
      </div>
    </div>
    {posts.map((post:PostTypes)=>(
          <div className="bg-white shadow-md rounded p-4 mb-4" key={post.id}>
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <img className="w-10 h-10 rounded-full mr-2" alt="User Avatar" src={profile.profileImageUrl}/>
              <div>
                <h2 className="font-semibold text-md">{post.author.username}</h2>
                <p className="text-gray-500 text-sm">{new Date(post.createAt).toLocaleString()}</p>
              </div>
            </div>
            <p className="text-gray-700">{post.content}</p>
          </div>
        </div>
    ))}
  </div>
</div>
  )
}

export default UserProfile