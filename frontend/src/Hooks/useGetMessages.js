import { useEffect, useState } from "react";
import { useConversations } from "../Zustand/useConversations";
import toast from "react-hot-toast";


const useGetMessages = () => {
 const [loading, setLoading] = useState(false);
 const { selectedConversation, messages, setMessages } = useConversations();

 if(!selectedConversation) return null;
 useEffect(()=>{
    const getMessages = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/message/${selectedConversation._id}`);
            const data = await res.json();
            
            if(data.error){
                return;
            }
            
            setMessages(data);
        } catch (error) {
            console.log(error.messages);
            toast.error(error.messages);
        } finally {
            setLoading(false);
        }
    }

     getMessages();
 },[setMessages,selectedConversation._id])


 

 return { loading, messages};
}

export default useGetMessages