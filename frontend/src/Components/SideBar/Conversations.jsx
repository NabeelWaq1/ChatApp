import { BiLoader } from "react-icons/bi";
import useGetConversations from "../../Hooks/useGetConversations.js"
import Conversation from "./Conversation.jsx"
import { getRandomEmoji } from '../../Utils/emojis.js'


const Conversations = () => {
  const { conversations, loading } = useGetConversations();
  return (
    <div className="flex flex-col py-2 overflow-y-auto mb-12 scrollbar">
        {loading ? <BiLoader className="mx-auto size-10 animate-spin my-28" /> : 
        conversations.map((conversation,idx)=>(
          <Conversation key={conversation._id}  conversation={conversation} emoji={getRandomEmoji()} lastIdx={idx === conversations.length - 1} />
        ))
        }
    </div>
  )
}

export default Conversations