import React, { useState } from 'react'
import { Link } from 'next/link'

const AddJobs = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [ctc, setCtc] = useState("")
  const [company, setCompany] = useState("")
  const [location, setLocation] = useState("")
  const [link, setLink] = useState("")

  const addJobs = async () => {
    const response = await fetch("/api/admin/addJobs", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        description,
        ctc,
        company,
        location,
        link,
      })
    })
    const data = await response.json()
    if (data.error) {
      alert(data.error)
    } else {
      alert("Job Added")
    }
  }
  return (
    <div>
      <div className="mt-20 w-3/4 m-auto bg-indigo-100 rounded p-5">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-6">
            
            <input
              className="p-2 w-full mb-6 dark:text-gray-800 border-b-2 outline-none focus:bg-gray-300"
              placeholder="Job Title"
              type="text"
              name="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="col-span-6">
            <input
              className="p-2 w-full mb-6 dark:text-gray-800 border-b-2 outline-none focus:bg-gray-300"
              type="text"
              placeholder="Company"
              name="company"
              value={company}
              onChange={e => setCompany(e.target.value)}
            />
          </div>
          <div className="col-span-4">
            <input
              className="p-2 w-full mb-6 dark:text-gray-800 border-b-2 outline-none focus:bg-gray-300"
              type="text"
              placeholder="CTC"
              name="ctc"
              value={ctc}
              onChange={e => setCtc(e.target.value)}
            />
          </div>
          <div className="col-span-4">
            <input
              className="p-2 w-full mb-6 dark:text-gray-800 border-b-2 outline-none focus:bg-gray-300"
              type="text"
              placeholder="Location"
              name="location"
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
          </div>
          <div className="col-span-4">
            <input
              className="p-2 w-full mb-6 dark:text-gray-800 border-b-2 outline-none focus:bg-gray-300"
              type="text"
              placeholder="Link"
              name="link"
              value={link}
              onChange={e => setLink(e.target.value)}
            />
          </div>
          <div className="col-span-8">
            <textarea
              className="w-full p-2 mb-6 dark:text-gray-800 border-b-2 outline-none focus:bg-gray-300"
              type="text"
              placeholder="Description"
              name="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <div className="col-span-4 flex flex-col justify-end">
            <button
              className="w-full dark:bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 mb-8 rounded"
              onClick={() => addJobs()}
            >
              Add Job
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddJobs
