import React, { useEffect, useState } from 'react'
import { useAppContext } from '../utils/context'

const Sidenav = ({ setActiveComponent, activeComponent }) => {

  const appContext = useAppContext()

  const [subjects, setSubjects] = useState([])
  const [toggle, setToggle] = useState("")
  const [toggleSubject, setToggleSubject] = useState(false)

  useEffect(() => {

    const fetchData = async () => {
      const res = await fetch('/api/student/subjects', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }
      })
      const data = await res.json()
      setSubjects(data.subjects)
    }

    const getTeachers = async () => {
      const response = await fetch("/api/teacher/subjects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }
      })
      const data = await response.json()
      setSubjects(data)
    }

    if (appContext.type === "TEACHER") {
      getTeachers()
    } else if (appContext.type === "STUDENT") {
      fetchData()
    }
  }, [])

  const studentFeatures = () => (
    <>
      <li>
        <a onClick={() => setActiveComponent("POSTS")} className="flex items-center cursor-pointer p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
          <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"></path></svg>
          <span className="flex-1 ml-3 whitespace-nowrap">Timeline</span>
        </a>
      </li>
      <li>
        <a onClick={() => setActiveComponent("JOBS")} className="flex items-center cursor-pointer p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
          <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"></path></svg>
          <span className="flex-1 ml-3 whitespace-nowrap">Jobs</span>
        </a>
      </li>
      <li>
        <a onClick={() => setActiveComponent("EVENTS")} className="flex items-center cursor-pointer p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
          <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"></path></svg>
          <span className="flex-1 ml-3 whitespace-nowrap">Events</span>
        </a>
      </li>
      <li>
        <a onClick={() => setToggleSubject(!toggleSubject)} className="flex items-center cursor-pointer p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
          <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"></path></svg>
          <span className="flex-1 ml-3 whitespace-nowrap">Subjects</span>
        </a>
        <ul className={(toggleSubject) ? "py-2 space-y-2 bg-gray-900 rounded-b-md" : "hidden"}>
          {subjects.map((subject, index) => (
            <li key={index}>
              <a onClick={() => setActiveComponent(`SUBJECT:${subject.subjectName}`)} className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">{subject.subjectName}</a>
            </li>
          ))}
        </ul>
      </li>
    </>
  )

  const teacherFeatures = () => (
    <>
      {
        subjects.map(subject => (
          <li key={subject._id} onClick={() => { toggle ? setToggle("") : setToggle(subject._id) }}>
            <div
              className="flex justify-start items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <p className="flex-1 ml-3 whitespace-nowrap cursor-pointer text-gray-400">{subject.classroom}&nbsp;<span className="font-semibold text-white">{subject.subject}</span></p>
            </div>
            <ul className={(toggle === subject._id) ? "py-2 space-y-2 bg-gray-900 rounded-b-md" : "hidden"}>
              <li>
                <a onClick={() => setActiveComponent(`Notes:${subject.classroom}:${subject.subject}`)} className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Notes</a>
              </li>

            </ul>
          </li>
        ))
      }
    </>
  )

  const adminFeatures = () => (
    <>
      <li>
        <a onClick={() => setActiveComponent("AddTeacher")} className="flex cursor-pointer items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          <span className="ml-3">Add Teacher</span>
        </a>
      </li>
      <li>
        <a onClick={() => setActiveComponent("AddStudents")} className="flex cursor-pointer items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          <span className="flex-1 ml-3 whitespace-nowrap">Add Students</span>
        </a>
      </li>
      <li>
        <a onClick={() => setActiveComponent("AddJobs")} className="flex cursor-pointer items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
          </svg>
          <span className="flex-1 ml-3 whitespace-nowrap">Add Jobs</span>
        </a>
      </li>
      <li>
        <a onClick={() => setActiveComponent("AddClass")} className="flex cursor-pointer items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
          <span className="flex-1 ml-3 whitespace-nowrap">Class</span>
        </a>
      </li>
      <li>
        <a onClick={() => setActiveComponent("SCHEDULE")} className="flex cursor-pointer items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
          <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"></path></svg>
          <span className="flex-1 ml-3 whitespace-nowrap">Schedule</span>
        </a>
      </li>
    </>
  )
  return (
    <div className='h-screen w-3/12 fixed left-0 top-20 dark:bg-gray-800'>

      <aside className="w-full" aria-label="Sidebar">
        <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
          <ul className="space-y-2">
            {
              (appContext.type === "ADMIN") && adminFeatures()
            }
            {
              (appContext.type === "TEACHER") && teacherFeatures()
            }
            {
              (appContext.type === "STUDENT") && studentFeatures()
            }

          </ul>
        </div>
      </aside>
    </div>
  )
}

export default Sidenav
