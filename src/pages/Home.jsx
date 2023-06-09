import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';



const Home = () => {

    const navigate = useNavigate();

    const [roomId, setRoomId] = useState("");
    const [userName, setUserName] = useState("");


    const createRoom = (e) =>{
        e.preventDefault()
        setRoomId(v4())

        toast.success('Created a new room')
    };

    const joinRoom = () => {
        if(!roomId || !userName)
        {
            toast.error("RoomId and UserName is required")
        }

        // Redirect
        navigate(`/editor/${roomId}`, {
            state: {
                userName
            }
        })
    };

    const handleEnter = (e) => {
         if(e.code === 'Enter')
         {
             joinRoom();
         }
    };

    return (
        <div className='flex flex-col h-screen justify-center items-center p-3 sm:px-1 bg-gradient-to-tr from-[#FFDCB6] via-[#B799FF] to-[#A5C0DD]  ' >
            <div className='bg-gradient-to-r from-[#BDCDD6] via-[#D6E4E5] to-[#B9EDDD] drop-shadow-2xl border-double border-4 border-sky-500 p-6 sm:p-20 rounded-lg '>
            <div className='items-center flex justify-center font-bold text-4xl '>
                CodeQue
            </div>
            <div className='flex flex-col' >
                <input type="text"
                    placeholder='RoomId'
                    className=' my-2 w-60 sm:w-96 p-2 rounded-lg'
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    onKeyUp={handleEnter}
                    />
                <input type="text"
                    placeholder='UserName'
                    className='my-2 w-60 sm:w-96 p-2 rounded-lg'
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    onKeyUp={handleEnter}
                />
                <button className=' flex justify-items-end ml-auto rounded-full bg-white m-2 px-5 py-2 hover:bg-red-900 hover:text-white'
                    onClick={joinRoom}
                >
                    Join
                </button>
                <span className="">
                    create&nbsp;
                    <a
                        onClick={createRoom}
                        href=""
                        className="hover:text-red-900 font-bold text-[#000] text-md underline "
                    >
                        new room
                    </a>
                </span>
            </div>
            </div>
        </div>
    )
}

export default Home