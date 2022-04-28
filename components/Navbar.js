import Link from 'next/link'
import React, { useContext } from 'react'
import { AppContext } from '../utils/context'
import { useRouter } from 'next/router'

const Navbar = () => {

  const router = useRouter()
  const appContext = useContext(AppContext)
  const handleLogout = () => {
    localStorage.clear()
    appContext.setLoggedIn(false)
    appContext.setType('')
    appContext.setUserName('')
    router.push('/')
  }
  return (
    <div className="fixed dark:bg-gray-800 h-20 flex w-full px-40">
      <div className="flex basis-1/2 items-center justify-start">
        <Link href="/" passHref>
          <span className="text-white cursor-pointer text-3xl font-bold">Unigram</span>
        </Link>
      </div>
      <div className="flex basis-1/2 items-center justify-end">
        {
          appContext.loggedIn ? (
            <>
            {/* { appContext.type === 'STUDENT' && <Link passHref href="profile"><span className="text-white text-lg px-4 cursor-pointer">Profile</span></Link>} */}
            <button onClick={() => {handleLogout()}} className="text-white text-lg px-4 cursor-pointer">Logout</button>
            </>
          ) : (
            <>
              {/* <Link href="/" passHref>
                <span className="text-white text-lg px-4 cursor-pointer">Login</span>
              </Link>
              <Link href="/register" passHref>
                <span className="text-white text-lg px-4 cursor-pointer">Register</span>
              </Link> */}
            </>
          )
        }
      </div>
    </div>
  )
}

export default Navbar
