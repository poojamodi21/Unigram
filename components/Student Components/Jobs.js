import React, { useEffect, useState } from 'react'

const Jobs = () => {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/student/jobs', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }
      })
      const data = await res.json()
      setJobs(data)
    }
    fetchData()
  }, [])

  return (
    <div >
      <div className="w-2/3 mx-4 max-h-screen pb-40 static scroller pr-4 overflow-auto">
        {
          jobs.map((job, index) => {
            return (
              <div key={job._id} className="bg-gray-800 p-2 w-full text-white mt-4 rounded grid grid-cols-12">
                <div className="col-span-6">
                  <h1 className='font-bold text-xl'>{job.title}</h1>
                </div>
                <div className="col-span-6">
                  <h1 className='font-bold text-xl'>({job.company})</h1>
                </div>
                <div className="col-span-12 pt-10">
                  <span>{job.description}</span>
                </div>
                <div className="col-span-4 pt-5">
                  <span>{job.location}</span>
                </div>
                <div className="col-span-4 pt-5">
                  <span>{job.ctc}</span>
                </div>
                <div className="col-span-4 pt-5">
                  <a target="_blank" rel="noreferrer" href={job.description}><span className='underline cursor-pointer'>Apply here</span></a>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Jobs
