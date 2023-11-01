import Forms from '@/components/Forms'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const CreatePrompt = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: "",
    tag: ""
  })

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true)

    try {
      const response = await fetch('api/prompt/new', {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          prompt: post.prompt,
          tag: post.tag
        })
      })

      if (response.ok) {
        router.push('/')
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Forms
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt