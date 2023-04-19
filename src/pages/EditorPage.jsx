import { useState } from 'react'
import Client from '../components/Client';

const EditorPage = () => {

  const [client, setClient] = useState([
    {
      SocketId: 1,
      userName: "Rohan"
    },
    {
      SocketId: 2,
      userName: "Sunny"
    }
  ])

  return (
    <div>
      <div>
        <div>
          CodeQue
        </div>
        <div>
          {
            client.map((client) =>(
              <Client
                key={client.SocketId}
                userName={client.userName}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default EditorPage