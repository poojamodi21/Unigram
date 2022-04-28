import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../components/Navbar'
import Link from 'next/link'

const Register = () => {
  const router = useRouter()
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const createUser = async () => {
    const response = await fetch("/api/register", {
      method: "post",
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
      await router.push("/")
    }
  }
  return (
    <>
      <Navbar />
      <div className="flex h-screen bg-blue-500">
        <div className="w-full max-w-xs m-auto bg-indigo-100 rounded p-5">
          <div>
            <div>
              <label className="block mb-2 text-blue-500" htmlFor="username">Username</label>
              <input
                className="w-full p-2 mb-6 text-blue-500 border-b-2 border-blue-500 outline-none focus:bg-gray-300"
                type="text"
                name="userName"
                value={userName}
                onChange={e => setUserName(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2 text-blue-500" htmlFor="password">Password</label>
              <input
                className="w-full p-2 mb-6 text-blue-500 border-b-2 border-blue-500 outline-none focus:bg-gray-300"
                type="password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button
                className="w-full bg-blue-500 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded"
                onClick={() => createUser()}
              >
                Register
              </button>
            </div>
          </div>
          {/* <div className="flex justify-center">
            <Link href="/" passHref>
              <a className="text-blue-500 hover:text-pink-700 text-sm float-right" href="#">Dont have an account? Click here.</a>
            </Link>
          </div> */}
        </div>
      </div>
    </>
  )
}

export default Register
