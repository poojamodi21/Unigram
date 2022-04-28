import React, { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import { AppContext } from '../../utils/context'

const Posts = () => {

  const [caption, setCaption] = useState("")
  const [comment, setComment] = useState("")
  const [allPost, setAllPost] = useState([])

  const appContext = useContext(AppContext)

  async function handleOnSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(({ name }) => name === 'file');

    const formData = new FormData();
    for (const file of fileInput.files) {
      formData.append('file', file);
    }

    formData.append('upload_preset', 'unigram-uploads');

    const response = await fetch(process.env.CLOUD_URI, {
      method: 'POST',
      body: formData
    }).then(response => response.json());

    if (response.secure_url) {
      const res = await fetch('/api/student/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        },
        body: JSON.stringify({
          caption,
          url: response.secure_url
        })
      })
      const data = await res.json()
      if (data.error) {
        alert(data.error)
      } else {
        setAllPost(data)
        setCaption("")
      }
    };
  }

  const addComment = async (postId) => {
    const response = await fetch("/api/student/comments", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify({
        comment,
        postId,
      })
    })

    const data = await response.json()
    if (data.error) {
      alert(data.error)
    } else {
      setAllPost(data)
    }
  }

  const addLike = async (postId) => {
    const response = await fetch("/api/student/likes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify({
        postId,
      })
    })

    const data = await response.json()
    if (data.error) {
      alert(data.error)
    } else {
      setAllPost(data)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/student/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }
      })
      const data = await res.json()
      setAllPost(data)
    }
    fetchData()
  }, [])

  return (
    <div >
      <div className="w-2/3 mx-4 max-h-screen pb-40 static scroller pr-4 overflow-auto">
        <form method='POST' onSubmit={handleOnSubmit} className="mt-4 bg-indigo-100 rounded p-5">
          <div className="grid grid-cols-12 gap-3 place-content-center">

            <textarea
              className="p-2 col-span-8 dark:text-gray-800 border-b-2 outline-none focus:bg-gray-300"
              placeholder="Whats on your mind?"
              type="text"
              name="title"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <div className="col-span-4">
              <label className="w-full flex items-center px-4 py-2 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-gray-900">
                <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span className="ml-2 text-base leading-normal">Add Image</span>
                <input
                  type={"file"}
                  name="file"
                  accept={".jpg,.jpeg,.png"}
                  className="hidden"
                />
              </label>
              <button
                className="w-full mt-2 static bottom-0 dark:bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
              >
                Post
              </button>
            </div>
          </div>
        </form>
        {
          allPost.map((post, index) => {
            return (
              <div key={post._id} className="bg-gray-800 p-2 w-full mt-4 rounded grid grid-cols-12">
                <div className="col-span-8 text-white">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-2 text-base leading-normal">{post.student}</span>
                  </div>
                  <div className="mt-2 ml-8 text-sm">{post.caption}</div>
                  <div className="w-full h-96 relative">
                    <Image
                      src={post.url}
                      alt="Post"
                      layout='fill'
                      objectFit='contain'
                    />
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="bg-gray-900 rounded w-full h-full relative">
                    <div className="absolute max-w-full max-h-full scroller-hide text-white w-full overflow-x-auto top-0 right-0 p-2">
                      {
                        post.comments.map((comment, index) => (
                          <p key={index} className="p-2"><span className="font-bold">{comment.student}</span>&nbsp;:&nbsp;<span className="font-light">{comment.comment}</span></p>
                        ))
                      }
                    </div>

                    <div className="flex items-center bg-gray-900 w-full absolute bottom-0 justify-between">
                      <input
                        className="p-2  dark:text-white bg-gray-900 outline-none"
                        placeholder="Add a comment"
                        type="text"
                        name="title"
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <svg xmlns="http://www.w3.org/2000/svg" onClick={() => addComment(post._id)} className="h-6 w-6 pt-2 cursor-pointer rotate-90 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      {
                        (post.likes.filter(value => value.student === appContext.userName).length > 0) ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 pr-2 cursor-pointer text-white" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" onClick={() => addLike(post._id)} className="h-6 w-6 pr-2 cursor-pointer text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        )
                      }
                    </div>
                  </div>

                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Posts
