import React, { useEffect, useState } from 'react'

const Subject = ({ studentSubject, setActiveComponent }) => {
  const [notes, setNotes] = useState([])
  useEffect(() => {
    console.log('this is student subject' + studentSubject)
    const fetchData = async () => {
      console.log('this is subject' + studentSubject)
      const res = await fetch(`/api/student/notes/?subject=${studentSubject}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }
      })
      const data = await res.json()
      setNotes(data)
      console.log(notes)
    }
    fetchData()
  }, [studentSubject])
  return (
    <div >
      <div onClick={() => setActiveComponent("")} className="cursor-pointer w-max flex">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <div className="text-white">
          {studentSubject}
        </div>
      </div>

      <div className="bg-gray-900 scroller mx-20 mt-10 p-2 max-h-[450px] overflow-x-auto rounded static grid grid-cols-12 gap-3">
        {notes.map((note, index) => (
          <a target="_blank" rel='noreferrer' href={note.url} className="col-span-4 cursor-pointer" key={note._id}>
            <div className="w-full h-20 rounded bg-gray-800 text-white text-bold">
              <div className="flex items-center justify-center">
                {note.name}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default Subject
