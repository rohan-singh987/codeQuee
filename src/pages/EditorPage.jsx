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

  const [client, setClient] = useState([])


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

      // Listing for joined event
      socketRef.current.on(ACTIONS.JOINED, ({clients, userName, socketId}) => {
          toast.success(`${userName} has joined the room`);
          console.log(`${userName} joined`);
          setClient(clients)
        }
      )

      // Listening for disconnected
      socketRef.current.on(ACTIONS.DISCONNECTED, ({socketId, userName}) => {
            toast.error(`${userName} left the room.`)
            setClient((prev) => {
              return prev.filter( (client) => client.socketId !== socketId)
            })
        }
      )



    }
    init();

    // Clearing Listeners to prevent memory leak
    return() => {
      socketRef.current.disconnect()
      socketRef.current.off(ACTIONS.JOINED).disconnect()
      socketRef.current.off(ACTIONS.DISCONNECTED).disconnect()
    }
  }, [])


  const copyRoomID = async() => {
    try{
        await navigator.clipboard.writeText(roomId);
        toast.success("Room ID copied")
    }
    catch(err)
    {
      console.log(err);
      toast.error("Cant copy Room ID")
    }
  }

  const leaveRoom = () => {
    reactNavigator('/')
  }



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
          <button onClick={copyRoomID} >Copy RoomId</button>
          <button onClick={leaveRoom} >Leave</button>
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