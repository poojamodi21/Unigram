import React, { useState, useEffect } from 'react'

const Notes = ({ classroom, subject, setActiveComponent }) => {

  const [notes, setNotes] = useState([])
  const [name, setName] = useState("")

  async function handleOnSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(({ name }) => name === 'file');

    const formData = new FormData();
    for (const file of fileInput.files) {
      formData.append('file', file);
    }

    formData.append('upload_preset', 'unigram-uploads');

    const response = await fetch(process.env.CLOUD_URI, {
      method: 'POST',
      body: formData
    }).then(response => response.json());

    if (response.secure_url) {
      const res = await fetch('/api/teacher/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          classroom,
          subject,
          name,
          url: response.secure_url
        })
      })
      const data = await res.json()
      if (data.error) {
        alert(data.error)
      } else {
        setNotes(data)
      }
    };
  }

  useEffect(() => {
    const getNotes = async () => {
      const response = await fetch(`/api/teacher/notes/?classroom=${classroom}&subject=${subject}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })

      const data = await response.json()
      setNotes(data)
    }

    getNotes()
  }, [classroom, subject])

  return (
    <div >
      <div onClick={() => setActiveComponent("")} className="cursor-pointer w-max flex">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <div className="text-white">
          {classroom}&nbsp;{subject}
        </div>
      </div>

      <div className="grid grid-cols-12 mx-20 static">
        <form method='POST' onSubmit={handleOnSubmit} className="col-span-12 mt-10 bg-indigo-100 rounded p-5">
          <div className="grid grid-cols-12 gap-3 place-content-center">
            <div className="col-span-4">

              <label className="w-full flex items-center px-4 py-2 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-gray-900">
                <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span className="ml-2 text-base leading-normal">Select Notes</span>
                <input
                  type={"file"}
                  name="file"
                  accept={".pdf"}
                  className="hidden"
                />
              </label>
            </div>
            <input
              className="p-2 col-span-5 dark:text-gray-800 border-b-2 outline-none focus:bg-gray-300"
              placeholder="Notes title"
              type="text"
              name="title"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <div className="col-span-3">
              <button
                className="w-full dark:bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
              >
                Add Notes
              </button>
            </div>
          </div>
        </form>
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

export default Notes
