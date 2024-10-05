import toast from "react-hot-toast"
import { useConversations } from "../Zustand/useConversations"
import { useState } from "react"

const useSendMessages = () => {
  const [loading, setLoading] = useState(false)
  const { messages, setMessages, selectedConversation } = useConversations()

  const sendMessage = async (message) => {
    setLoading(true);
    try {
        const res = await fetch(`/api/message/send/${selectedConversation?._id}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({message})
        })
        const data = await res.json()
        
        if(data.error) return toast.error(data.message);
        
        setMessages([...messages, data])

    } catch (error) {
        console.log(error.message);
        toast.error(error.message);
    } finally {
        setLoading(false);
    }
  }


  return { sendMessage, loading }
}

export default useSendMessages