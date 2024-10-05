import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";
import { useState } from "react";


const useLogout = () => {
    const {setAuthUser} = useAuthContext();
    const [loading, setLoading] = useState(false);

      const logout = async () => {
        if(loading) return;
        setLoading(true);
        try {
            const res = await fetch('/api/auth/logout', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            const data = await res.json();
            if (!data.success) return toast.error(data.message)
            localStorage.removeItem('chat-user');
            setAuthUser(null);
            toast.success('Logged Out Successfully');
        } catch (error) {
            console.log(error.message);
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
      }

      return { logout, loading };

}

export default useLogout