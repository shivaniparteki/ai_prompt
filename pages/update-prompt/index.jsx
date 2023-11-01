import Forms from '@/components/Forms'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const EditPrompt = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const promptId = searchParams.get("id")

  console.log("promptId");
  console.log(promptId);

  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: "",
    tag: ""
  })

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`)
      const data = await response.body

      setPost({
        prompt: data?.prompt,
        tag: data?.tag
      })
    }

    if (promptId) {
      getPromptDetails()
    }
  }, [promptId])

  // const createPrompt = async (e) => {
  //   e.preventDefault();
  //   setSubmitting(true)

  //   try {
  //     const response = await fetch('api/prompt/new', {
  //       method: "POST",
  //       body: JSON.stringify({
  //         userId: session?.user.id,
  //         prompt: post.prompt,
  //         tag: post.tag
  //       })
  //     })

  //     if (response.ok) {
  //       router.push('/')
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setSubmitting(false)
  //   }
  // }

  return (
    <Forms
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={() => { }}
    />
  )
}

export default EditPrompt