import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

import Profile from "@/components/Profile"
import { useRouter } from 'next/router';

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter()

  const [posts, setPosts] = useState([])

  const fetchPosts = async () => {
    const response = await fetch(`/api/users/${session?.user?.id}/posts`);
    const data = await response.json();

    setPosts(data);
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetchPosts();
    }
  }, []);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete = async (post) => {

  }

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile