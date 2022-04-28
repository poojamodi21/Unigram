import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { AppContext } from '../utils/context'

const Welcome = () => {

  const router = useRouter()
  const appContext = useContext(AppContext)
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const signIn = async () => {
    const response = await fetch("/api/login", {
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
      localStorage.setItem("jwt",data.token)
      localStorage.setItem("type",data.type)
      localStorage.setItem("userName",data.userName)
      appContext.setLoggedIn(true)
      appContext.setType(data.type)
      appContext.setUserName(data.userName)
      await router.push("/home")
    }
  }

  useEffect(()=>{
    appContext.loggedIn ? router.push('/home') : router.push('/')
  }, [appContext.loggedIn])

  return (
    <div className="flex h-screen dark:bg-gray-800">
      <div className="w-full max-w-xs m-auto bg-indigo-100 rounded p-5">
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
              onClick={() => signIn()}
            >
              LOGIN
            </button>
          </div>
        </div>
        {/* <div className="flex justify-center">
          <Link href="/register" passHref>
            <a className="dark:text-gray-800 hover:text-gray-900 text-sm float-right">Already have an account? Click here.</a>
          </Link>
        </div> */}
      </div>
    </div>
  )
}

export default Welcome
