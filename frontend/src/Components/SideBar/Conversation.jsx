import { useEffect } from "react";
import { useConversations } from "../../Zustand/useConversations.js"
import { useSocketContext } from "../../Context/socketContext.jsx";


const Conversation = ({conversation,emoji,lastIdx}) => {
    const { selectedConversation, setSelectedConversation } = useConversations();
    const isSelected = selectedConversation?._id === conversation._id;
    const { onlineUsers } = useSocketContext()
    const isOnline = onlineUsers.includes(conversation._id);

    useEffect(()=>{
      return () => {setSelectedConversation(null)}
    },[setSelectedConversation])
    return (
    <>
    <div className={`flex gap-2 items-center hover:bg-sky-500 cursor-pointer p-2 py-1 rounded w-full ${isSelected? 'bg-blue-500' : ''}`} onClick={()=> setSelectedConversation(conversation)}>


    <div className={`avatar ${isOnline && 'online'}`}>
        <div className="w-12 h-12 rounded-full">
            <img src={conversation.profilePic ? conversation.profilePic : '/avatar.png'} alt={conversation.fullname} className="w-full object-cover h-full" />
        </div>
    </div>

    <div className="flex flex-col flex-1">
            <div className="flex justify-between items-center gap-3">
                <p className="font-bold text-gray-200">{conversation.username}</p>
                <div className="text-xl">{emoji}</div>
            </div>
        </div>
        
    </div>
    {!lastIdx && <div className="divider py-0 h-1 my-0"></div>}
    </>
  )
}

export default Conversation