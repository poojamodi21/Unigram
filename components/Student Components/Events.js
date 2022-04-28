import React, { useState, useEffect } from 'react'

const Events = () => {

  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/admin/addSchedule', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }
      })
      const data = await res.json()
      if (data.error) {
        console.log(data.error)
      } else {
        setEvents(data)
      }
    }
    fetchData()
  }, [])

  return (
    <div className='w-full p-12 grid grid-cols-12 gap-3'>
      {events.map((event, index) => (
        <a className='col-span-4' rel='noreferrer' key={index} href={event.url} target="_blank">
          <div className='bg-indigo-100 rounded p-5'>
            <div className='flex items-center'>{event.name}</div>
          </div>
        </a>
      ))}
    </div>
  )
}

export default Events
