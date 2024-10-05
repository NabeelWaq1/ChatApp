import { useAuthContext } from "../../Context/AuthContext.jsx";
import { extractTime } from "../../Utils/extractTime.js";
import { useConversations } from "../../Zustand/useConversations.js"


const Message = ({message}) => {
  const {selectedConversation} = useConversations();
  const { authUser } = useAuthContext();
  const isMe = message.senderId === authUser._id;
  const chatClassName = isMe ? 'chat chat-end' : 'chat chat-start' ;
  const profilePic = isMe ? authUser.profilePic : selectedConversation.profilePic;
  const bubbleBg = isMe ? 'bg-blue-500' : '';
  const shakeClass = message.shouldShake === true ? 'shake' : '';
  return (
    <div className={chatClassName}>
        <div className="chat-image avatar">
            <div className="w-10 h-10 rounded-full">
                <img src={profilePic} alt="avatar" />
            </div>
        </div>
        <div className={`chat-bubble text-white ${bubbleBg} ${shakeClass}`}>{message.message}</div>
        <div className="chat-footer text-white opacity-50 text-xs flex gap-1 items-center">{extractTime(message.createdAt)}</div>
    </div>
  )
}

export default Message