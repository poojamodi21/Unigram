import React, {useEffect, useState} from 'react'
import Navbar from '../../components/Navbar'
import Image from 'next/image'

const Profile = () => {

  const [images, setImages] = useState([])

  useEffect(()=>{
    const fetchData = async () => {
      const res = await fetch('/api/student/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }
      })
      const data = await res.json()
      if (data.error) {
        alert(data.error)
      } else {
        setImages(data)
      }
    }

    fetchData()
  },[])

  return (
    <div className='bg-gray-900 overflow-hidden h-screen w-screen'>
      <Navbar />

      <div className='w-full mt-28 px-52 items-center place-content-center  mx-auto grid grid-cols-12'>
        <div className='col-span-2 cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className='col-span-10 mt-10 grid grid-cols-12'>
          <div className='col-span-4 col-start-4 text-white'>followers</div>
          <div className='col-span-4 text-white'>following</div>

          <textarea
            className="col-span-8 col-start-4 p-2 mt-10 mb-6 dark:bg-gray-800 border-b-2 outline-none focus:text-gray-300"
            type="text"
            placeholder="Description"
            name="description"
          />
        </div>
      </div>

      <div className='grid grid-cols-12'>
        <div className='col-span-8 col-start-4 grid grid-cols-12'>
          {
            images.map((image, index) => (
              <div key={index} className='col-span-4'>
                <Image
                  src={image.url}
                  alt="Post"
                  width={300}
                  height={300}
                />
              </div>
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default Profile
