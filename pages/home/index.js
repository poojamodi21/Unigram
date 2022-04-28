import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar'
import { AppContext } from '../../utils/context'
import Sidenav from '../../components/Sidenav'
import AdminDashboard from '../../components/AdminDashboard'

const Index = () => {
  const router = useRouter()
  const appContext = useContext(AppContext)

  const [activeComponent, setActiveComponent] = useState("CLASSROOMS")

  useEffect(() => {
    if (!appContext.loggedIn) {
      router.push('/')
    }
  }, [])
  return (
    <div>
      <Navbar />
      <Sidenav activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      <AdminDashboard activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
    </div>
  )
}

export default Index
