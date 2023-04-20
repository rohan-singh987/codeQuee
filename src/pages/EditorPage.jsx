import { useState } from 'react'
import Client from '../components/Client';
import Editor from '../components/Editor';

const EditorPage = () => {

  const [client, setClient] = useState([
    {
      SocketId: 1,
      userName: "Rohan"
    },
    {
      SocketId: 1,
      userName: "Rohan"
    },
    {
      SocketId: 2,
      userName: "Sunny"
    },

  ])

  return (
    <div className='flex  bg-gray-600 ' >
      <div className='flex flex-col h-screen bg-gray-200 p-5 w-1/6'>
          <div className='font-bold text-3xl mb-2  justify-items-center'>
            CodeQue
          </div>
        <div className='flex flex-col justify-between flex-1	 '>
          <div className='flex flex-wrap  '>
            {
              client.map((client) => (
                <Client
                  key={client.SocketId}
                  userName={client.userName}
                />
              ))
            }
          </div>
        <div className='flex flex-col' >
          <button>Copy RoomId</button>
          <button>Leave</button>
        </div>
        </div>
      </div>
      <div>
        <Editor />
      </div>
    </div>
  )
}

export default EditorPage