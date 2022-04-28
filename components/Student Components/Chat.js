import React, { useEffect, useState } from 'react'

const Chat = () => {
  const [selected, setSelected] = useState("")
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState("")
  const [users, setUsers] = useState([])

  const addMessage = async () => {
    const res = await fetch("/api/student/chat", {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify({
        selected,
        message,
      })
    })
    const data = await res.json()
    if (data.error) {
      console.log(data.error)
    } else {
      setMessages(data.messages)
      setMessage("")
    }
  }

  const fetchChats = async (selectedUser) => {
    const res = await fetch(`/api/student/chat/?selectedUser=${selectedUser}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`
      }
    })
    const data = await res.json()
    if (data.error) {
      console.log(data.error)
    } else {
      setMessages(data.messages)
    }
  }

  if(selected){
    setTimeout(() => {
      fetchChats(selected)
    }, 5000)
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/student/students', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }
      })
      const data = await res.json()
      setUsers(data)
    }
    fetchData()
  }, [])

  return (
    <div>
      <aside className="w-full" aria-label="Sidebar">
        <div className="overflow-y-auto scroller py-4 px-3 bg-gray-50 rounded dark:bg-gray-900">
          <ul className="space-y-2">
            {
              (selected != "") && (
                <div className="max-w-full h-[720px] scroller-hide text-white w-full overflow-x-auto top-0 right-0 p-2">
                  <div onClick={() => setSelected("")} className="cursor-pointer fixed bg-gray-900 w-full flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    <div className="text-white">
                      Go Back
                    </div>
                  </div>
                  <div className='mt-10'>
                    {
                      messages.map((message, index) => (
                        <p key={index} className="p-2"><span className="font-bold">{message.user}</span>&nbsp;:&nbsp;<span className="font-light">{message.message}</span></p>
                      ))
                    }
                  </div>

                  <div className='fixed bottom-0 flex items-center justify-between'>
                    <input
                      className="p-2  dark:text-white bg-gray-900 outline-none"
                      placeholder={"Type a message"}
                      value={message}
                      type="text"
                      name="title"
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => addMessage()} className="h-6 w-6 pt-2 cursor-pointer rotate-90 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>

                  </div>
                </div>
              )
            }
            {(selected === "") &&
              users.map((user, index) => (
                <li key={index}>
                  <a onClick={() => {
                    setSelected(user.userName);
                    fetchChats(user.userName);
                  }}
                    className="flex cursor-pointer items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"></path></svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">{user.userName}</span>
                  </a>
                </li>
              ))
            }
          </ul>
        </div>
      </aside>
    </div>
  )
}

export default Chat
