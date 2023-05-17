import { useState, useRef, useEffect } from 'react'
import toast from 'react-hot-toast';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import ACTIONS from '../Actions';
import Client from '../components/Client';
import Editorr from '../components/Editorr';
import { initSocket } from '../socket';

const EditorPage = () => {

  const location = useLocation();
  const reactNavigator = useNavigate();
  const {roomId} = useParams()

  // console.log(roomId);

  const socketRef = useRef(null);

  useEffect(() => {
    const init = async() => {
      socketRef.current = await initSocket()
      socketRef.current.on('connect_error', (err) => handleErrors(err));
      socketRef.current.on('connect_failed', (err) => handleErrors(err));

      function handleErrors(e) {
        console.log('socket error', e);
        toast.error('Socket connection failed, try again later.');
        reactNavigator('/');
    }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        userName: location.state?.userName
      })
    }
    init();
  }, [])


  


  const [client, setClient] = useState([
    {
      SocketId: 1,
      userName: "Rohan"
    },
    {
      SocketId: 3,
      userName: "Nikita"
    },
    {
      SocketId: 2,
      userName: "Sunny"
    },

  ])

  if(!location.state)
  {
    <Navigate to='/' />
  }

  return (
    <div className='flex  bg-gray-00 ' >
      <div className='flex flex-col h-screen bg-gray-400 p-5 w-1/6'>
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
        <Editorr />
      </div>
    </div>
  )
}

export default EditorPage