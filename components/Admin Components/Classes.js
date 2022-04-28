import React, { useState, useEffect } from 'react'

const Classes = () => {

  const [newClass, setNewClass] = useState("")
  const [subject, setSubject] = useState("")
  const [teacher, setTeacher] = useState("")
  const [teachers, setTeachers] = useState([])
  const [allClasses, setAllClasses] = useState([])
  const [currentClass, setCurrentClass] = useState({})

  const addClass = async () => {
    const response = await fetch("/api/admin/classes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        newClass,
      })
    })

    const data = await response.json()
    if (data.error) {
      alert(data.error)
    } else {
      setAllClasses(data)
      setNewClass("")
    }
  }

  const addSubject = async () => {
    const response = await fetch("/api/admin/classes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        teacher,
        subject,
        _id: currentClass._id
      })
    })

    const data = await response.json()
    if (data.error) {
      alert(data.error)
    } else {
      setSubject("")
      setTeacher("")
      setCurrentClass(data)
    }
  }

  useEffect(() => {
    const getClasses = async () => {
      const response = await fetch("/api/admin/classes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })

      const data = await response.json()
      setAllClasses(data)
    }

    getClasses()

    const getTeachers = async () => {
      const response = await fetch("/api/admin/addTeacher",{
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })

      const data = await response.json()
      setTeachers(data)
    }

    getTeachers()
  }, [])

  return (
    <div className="grid grid-cols-12 gap-3 p-4">
      {
        currentClass.name && (
          <div className="w-full h-full absolute bg-gray-900">
            <div onClick={() => { setCurrentClass({}) }} className="cursor-pointer flex">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <div className="text-white">
                {currentClass.name}
              </div>
            </div>
            <div className="grid grid-cols-12 gap-3">
              <div className="bg-indigo-100 col-span-11 mt-2 p-2 rounded static">
                <div className='grid grid-cols-12 gap-2'>
                  <input
                    className="p-2 col-span-5 my-3 dark:text-gray-800 border-b-2 outline-none focus:bg-gray-300"
                    placeholder="New Subject"
                    type="text"
                    name="title"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                  />
                  <select
                    onChange={e => setTeacher(e.target.value)} 
                    className="p-2 col-span-5 my-3 dark:text-gray-800 border-b-2 outline-none focus:bg-gray-300" id="grid-state">
                      {
                        teachers.map(items=>(
                          <option key={items._id}>{items.userName}</option>
                        ))
                      }
                  </select>
                  <button
                    className="col-span-2 dark:bg-gray-800 my-3 hover:bg-gray-900 text-white font-bold py-2 px-4 mb-8 rounded"
                    onClick={() => addSubject()}
                  >
                    Add Subject
                  </button>
                </div>
              </div>
              <div className="bg-indigo-100 scroller col-span-11 mt-2 p-2 max-h-[450px] overflow-x-auto rounded static grid grid-cols-12">
                <table className="col-span-12 text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Subject
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Teacher
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      currentClass.subjects.map(item => (
                        <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                            {item.subjectName}
                          </th>
                          <td className="px-6 py-4">
                            {item.teacherName}
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )
      }
      {
        allClasses.map((x) => (
          <div onClick={() => setCurrentClass(x)} key={x._id} className="col-span-4">
            <div className="w-full mt-10 bg-indigo-100 hover:bg-indigo-300 cursor-pointer rounded p-5">
              <div className="text-gray-800">
                {x.name}
              </div>
            </div>
          </div>
        ))
      }
      <div className="col-span-4">
        <div className="w-full mt-10 bg-indigo-200 rounded p-3">
          <div className="text-gray-800 flex justify-between items-center">
            <input
              className="w-3/4 p-2 dark:text-gray-800 border-b-2 outline-none focus:bg-gray-300"
              type="text"
              name="userName"
              placeholder='Add New Class'
              value={newClass}
              onChange={e => setNewClass(e.target.value)}
            />
            <div onClick={() => addClass()} className='cursor-pointer'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Classes
