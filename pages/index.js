import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../components/Navbar'
import Welcome from '../components/Welcome'
import { AppContext } from '../utils/context'

export default function Home() {

  const router = useRouter()

  const appContext = useContext(AppContext)
  useEffect(()=>{
    const user  = localStorage.getItem('jwt')
    if(user){
      appContext.setLoggedIn(true)
      appContext.setType(localStorage.getItem('type'))
      appContext.setUserName(localStorage.getItem('userName'))
      router.push('/home')
    }
  })
  return (
    <div>
      <Head>
        <title>Unigram</title>
        <meta name="Unigram" content="Socialize with your college friends." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Welcome />
    </div>
  )
}
