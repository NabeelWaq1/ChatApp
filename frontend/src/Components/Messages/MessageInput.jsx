import { BiLoader, BiSend } from "react-icons/bi"
import useSendMessages from "../../Hooks/useSendMessages.js"
import toast from "react-hot-toast";
import { useState } from "react";


const MessageInput = () => {
  const [message, setMessage] = useState('')
  const { loading, sendMessage } = useSendMessages();

  const handleSendMessage = async (e) => {
   e.preventDefault();
   if(!message) return toast.error('Please enter a message');
   await sendMessage(message);
   setMessage('');
  }

  return (
    <form onSubmit={handleSendMessage} className="px-4 my-3">
        <div className="w-full relative">
            <input
              className="border border-gray-600 bg-gray-700 text-white rounded-lg w-full p-2 text-sm focus:outline-none"
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit" onClick={handleSendMessage} className="absolute inset-y-0 pe-3 end-0 flex items-center">
                {loading ? <BiLoader size={28} className="animate-spin duration-500" /> : <BiSend className="text-white" />}
            </button>
        </div>
    </form>
  )
}

export default MessageInput