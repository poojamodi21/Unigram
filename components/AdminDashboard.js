import React, { useState, useEffect } from 'react'
import { Link } from 'next/link'
import AddTeacher from './Admin Components/AddTeacher'
import AddJobs from './Admin Components/AddJobs'
import AddStudents from './Admin Components/AddStudents'
import Classes from './Admin Components/Classes'
import Notes from './Teacher Components/Notes'
import { useAppContext } from '../utils/context'
import Posts from './Student Components/Posts'
import Jobs from './Student Components/Jobs'
import Subject from './Student Components/Subject'
import Chat from './Student Components/Chat'
import AddSchedule from './Admin Components/AddSchedule'
import Events from './Student Components/Events'

const AdminDashboard = ({ setActiveComponent, activeComponent }) => {


  const appContext = useAppContext()
  const [userAction, setUserAction] = useState([])
  const [subjects, setSubjects] = useState([])
  const [studentSubject, setStudentSubject] = useState("")

  useEffect(() => {
    if (appContext.type === "TEACHER") {
      const arr = activeComponent.split(":")
      setUserAction(arr)
    }
  }, [activeComponent])

  useEffect(() => {
    if (appContext.type === "STUDENT"&& activeComponent.substring(0, 7) === "SUBJECT") {
      setStudentSubject(activeComponent.substring(8, activeComponent.length))
      console.log('this is student subject from admin'+studentSubject)
    }
  }, [activeComponent])

  useEffect(() => {
    if (appContext.type === "STUDENT" && activeComponent.substring(0, 7) != "SUBJECT") {
      setActiveComponent("POSTS")
    }
  }, [])

  return (
    <div className='h-screen w-9/12 fixed right-0 top-20 dark:bg-gray-900'>
      {
        appContext.type === "ADMIN" && (
          <>
            {
              (activeComponent === "AddTeacher") && (<AddTeacher />)
            }
            {
              (activeComponent === "AddJobs") && (<AddJobs />)
            }
            {
              (activeComponent === "AddStudents") && (<AddStudents />)
            }
            {
              (activeComponent === "AddClass") && (<Classes />)
            }
            {
              (activeComponent === "SCHEDULE") && (<AddSchedule />)
            }
          </>
        )
      }
      {
        appContext.type === "TEACHER" && (
          <>
            {
              (userAction[0] === "Notes") && (<Notes setActiveComponent={setActiveComponent} classroom={userAction[1]} subject={userAction[2]} />)
            }
          </>
        )
      }
      {
        appContext.type === "STUDENT" && (
          <>
            {
              (activeComponent === "POSTS") && (<Posts />)
            }
            {
              (activeComponent === "JOBS") && (<Jobs />)
            }
            {
              (activeComponent === "EVENTS") && (<Events />)
            }
            {
              (activeComponent.substring(0, 7) === "SUBJECT") && (<Subject setActiveComponent={setActiveComponent} studentSubject={studentSubject} />)
            }
          </>
        )
      }
      <div className='fixed w-3/12 right-0 top-20 pl-10 z-50'>
        {
          appContext.type === "STUDENT" && (activeComponent === "POSTS") && (<Chat />)
        }
      </div>

    </div>
  )
}

export default AdminDashboard
