import React, { useState } from 'react'
import { Link } from 'next/link'

const AddTeacher = () => {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const addTeacher = async () => {
    const response = await fetch("/api/admin/addTeacher", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userName,
        password
      })
    })
    const data = await response.json()
    if (data.error) {
      alert(data.error)
    } else {
      alert("Teacher Added")
    }
  }
  return (
    <div>
      <div className="w-full mt-20 max-w-xs m-auto bg-indigo-100 rounded p-5">
        <div>
          <div>
            <label className="block mb-2 dark:text-gray-800" htmlFor="username">Username</label>
            <input
              className="w-full p-2 mb-6 dark:text-gray-800 border-b-2 bodark:rder-gray-800 outline-none focus:bg-gray-300"
              type="text"
              name="userName"
              value={userName}
              onChange={e => setUserName(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 dark:text-gray-800" htmlFor="password">Password</label>
            <input
              className="w-full p-2 mb-6 dark:text-gray-800 border-b-2 bodark:rder-gray-800 outline-none focus:bg-gray-300"
              type="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              className="w-full dark:bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 mb-6 rounded"
              onClick={() => addTeacher()}
            >
              Add Teacher
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddTeacher
