import { useEffect, useState } from "react"
import toast from "react-hot-toast"


const useGetConversations = () => {
      const [loading, setLoading] = useState(false)
      const [conversations, setConversations] = useState([])

      useEffect(()=>{
        const getConversations = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/users');
                const data = await res.json();
                if(!data.success) return toast.error(data.message);
                setConversations(data.users);
            } catch (error) {
                console.log(error.message);
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }

        getConversations();
      },[])
      
      return {loading, conversations}
}

export default useGetConversations